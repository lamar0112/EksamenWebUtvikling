using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FootballAPI.Context;
using FootballAPI.Models;

namespace FootballAPI.Controllers;

// START: controller for Finance (økonomi, lån og kjøp)
[ApiController]
[Route("api/[controller]")]
public class FinanceController : ControllerBase
{
    // START: felt for database-kontekst
    private readonly FotballContext _context;
    // SLUTT: felt for database-kontekst

    // START: konstruktør
    public FinanceController(FotballContext context)
    {
        _context = context;
    }
    // SLUTT: konstruktør

    // START: GET: api/finance
    // Henter alltid den ene raden med økonomi.
    [HttpGet]
    public IActionResult GetFinance()
    {
        try
        {
            Finance? finance = _context.Finances.FirstOrDefault();

            if (finance == null)
            {
                return NotFound("Finance row not found");
            }

            return Ok(finance);
        }
        catch
        {
            return StatusCode(500);
        }
    }
    // SLUTT: GET: api/finance

    // START: POST: api/finance
    // Oppretter finance-raden (trengs normalt bare en gang).
    [HttpPost]
    public async Task<IActionResult> Post(Finance finance)
    {
        try
        {
            _context.Finances.Add(finance);
            await _context.SaveChangesAsync();
            return Created();
        }
        catch
        {
            return StatusCode(500);
        }
    }
    // SLUTT: POST: api/finance

    // START: PUT: api/finance
    // Oppdaterer eksisterende finance-rad.
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
    // SLUTT: PUT: api/finance

    // START: POST: api/finance/loan
    // Legger til penger i MoneyLeft (tar opp lån).
    [HttpPost("loan")]
    public async Task<IActionResult> Loan(LoanRequest request)
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
    // SLUTT: POST: api/finance/loan

    // START: POST: api/finance/buy
    // Kjøper en spiller og oppdaterer økonomien.
    [HttpPost("buy")]
    public async Task<IActionResult> BuyPlayer(BuyRequest request)
    {
        Athlete? athlete = await _context.Athletes.FindAsync(request.AthleteId);
        Finance? finance = await _context.Finances.FirstOrDefaultAsync();

        if (athlete == null)
        {
            return NotFound("Athlete not found");
        }

        if (finance == null)
        {
            return NotFound("Finance not found");
        }

        if (athlete.Price > finance.MoneyLeft)
        {
            return BadRequest("Not enough money");
        }

        // Oppdaterer status for spilleren
        athlete.PurchaseStatus = true;

        // Oppdaterer finance
        finance.MoneyLeft -= athlete.Price;
        finance.MoneySpent += athlete.Price;
        finance.NumberOfPurchases++;

        await _context.SaveChangesAsync();

        // Returnerer et lite DTO-objekt med kun det vi trenger
        return Ok(new FinanceBuyDto
        {
            MoneyLeft = finance.MoneyLeft,
            MoneySpent = finance.MoneySpent,
            NumberOfPurchases = finance.NumberOfPurchases
        });
    }
    // SLUTT: POST: api/finance/buy

    // START: DTO-klasser
    // Dette er små hjelpeklasser (Data Transfer Objects) for å ta imot og sende
    // data i API-kall. De er ikke koblet direkte til databasen.
    public class LoanRequest
    {
        public decimal LoanAmount { get; set; }
    }

    public class BuyRequest
    {
        public int AthleteId { get; set; }
    }

    public class FinanceBuyDto
    {
        public decimal MoneyLeft { get; set; }
        public decimal MoneySpent { get; set; }
        public int NumberOfPurchases { get; set; }
    }
    // SLUTT: DTO-klasser
}
// SLUTT: controller for Finance
