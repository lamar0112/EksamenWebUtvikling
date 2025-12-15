using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FootballAPI.Context;
using FootballAPI.Models;

namespace FootballAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FinanceController : ControllerBase
{
    private readonly FotballContext _context;

    public FinanceController(FotballContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetFinance()
    {
        try
        {
            Finance? finance = await _context.Finances.FirstOrDefaultAsync();

            if (finance == null)
            {
                return NotFound("Finance row not found.");
            }

            return Ok(finance);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post(Finance finance)
    {
        try
        {
            _context.Finances.Add(finance);
            await _context.SaveChangesAsync();
            return Created("", finance);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpPut]
    public async Task<IActionResult> Put(Finance finance)
    {
        try
        {
            _context.Entry(finance).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch
        {
            return StatusCode(500);
        }
    }

    // START: Lån (bruker skriver beløp, vi legger til i MoneyLeft)
    [HttpPost("loan")]
    public async Task<IActionResult> Loan([FromBody] LoanRequest request)
    {
        if (request == null || request.LoanAmount <= 0)
        {
            return BadRequest("Loan amount must be greater than 0.");
        }

        Finance? finance = await _context.Finances.FirstOrDefaultAsync();

        if (finance == null)
        {
            return NotFound("Finance row missing.");
        }

        finance.MoneyLeft += request.LoanAmount;
        await _context.SaveChangesAsync();

        return Ok(finance);
    }
    // SLUTT: Lån

    // START: Kjøp av spiller (oppdaterer både Athlete og Finance)
    [HttpPost("buy")]
    public async Task<IActionResult> BuyPlayer([FromBody] BuyRequest request)
    {
        if (request == null || request.AthleteId <= 0)
        {
            return BadRequest("Invalid athlete id.");
        }

        Athlete? athlete = await _context.Athletes.FindAsync(request.AthleteId);
        Finance? finance = await _context.Finances.FirstOrDefaultAsync();

        if (athlete == null)
        {
            return NotFound("Athlete not found.");
        }

        if (finance == null)
        {
            return NotFound("Finance not found.");
        }

        // Hindrer dobbeltkjøp
        if (athlete.PurchaseStatus)
        {
            return BadRequest("Athlete is already purchased.");
        }

        if (athlete.Price > finance.MoneyLeft)
        {
            return BadRequest("Not enough money.");
        }

        athlete.PurchaseStatus = true;

        finance.MoneyLeft -= athlete.Price;
        finance.MoneySpent += athlete.Price;
        finance.NumberOfPurchases++;

        await _context.SaveChangesAsync();

        return Ok(new FinanceBuyDto
        {
            MoneyLeft = finance.MoneyLeft,
            MoneySpent = finance.MoneySpent,
            NumberOfPurchases = finance.NumberOfPurchases
        });
    }
    // SLUTT: Kjøp av spiller

    // START: Selg spiller (uten å slette fra databasen)
    // Vi setter PurchaseStatus tilbake til false slik at spilleren ikke lenger vises som "kjøpt".
    // Pengene legges tilbake i MoneyLeft. MoneySpent lar vi stå (total brukt historisk).
    [HttpPost("sell")]
    public async Task<IActionResult> SellPlayer([FromBody] SellRequest request)
    {
        if (request == null || request.AthleteId <= 0)
        {
            return BadRequest("Invalid athlete id.");
        }

        Athlete? athlete = await _context.Athletes.FindAsync(request.AthleteId);
        Finance? finance = await _context.Finances.FirstOrDefaultAsync();

        if (athlete == null)
        {
            return NotFound("Athlete not found.");
        }

        if (finance == null)
        {
            return NotFound("Finance not found.");
        }

        if (!athlete.PurchaseStatus)
        {
            return BadRequest("Athlete is not purchased.");
        }

        // En enkel "sell price": bruker samme pris som kjøpspris (pensum-vennlig)
        finance.MoneyLeft += athlete.Price;

        athlete.PurchaseStatus = false;

        // Antall kjøp i "laget" går ned når vi selger
        if (finance.NumberOfPurchases > 0)
        {
            finance.NumberOfPurchases--;
        }

        await _context.SaveChangesAsync();

        return Ok(new FinanceBuyDto
        {
            MoneyLeft = finance.MoneyLeft,
            MoneySpent = finance.MoneySpent,
            NumberOfPurchases = finance.NumberOfPurchases
        });
    }
    // SLUTT: Selg spiller

    // Små DTO-er brukt i API-kall (ikke database-tabeller)
    public class BuyRequest
    {
        public int AthleteId { get; set; }
    }

    public class SellRequest
    {
        public int AthleteId { get; set; }
    }

    public class FinanceBuyDto
    {
        public decimal MoneyLeft { get; set; }
        public decimal MoneySpent { get; set; }
        public int NumberOfPurchases { get; set; }
    }
    [HttpGet("{id}")]
public async Task<IActionResult> GetById(int id)
{
    try
    {
        var finance = await _context.Finances.FindAsync(id);
        return finance == null ? NotFound() : Ok(finance);
    }
    catch
    {
        return StatusCode(500);
    }
}

}
