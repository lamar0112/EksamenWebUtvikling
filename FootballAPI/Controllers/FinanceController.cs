using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FootballAPI.Context;
using FootballAPI.Models;

namespace FootballAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FinanceController : ControllerBase
{
    private readonly FotballContext dbContext;

    public FinanceController(FotballContext dbContext)
    {
        this.dbContext = dbContext;
    }

    // -----------------------------
    // GET: api/finance
    // Always returns ONE finance row
    // -----------------------------
    [HttpGet]
    public IActionResult GetFinance()
    {
        try
        {
            var finance = dbContext.Finances.FirstOrDefault();
            if (finance == null)
                return NotFound("Finance row not found");

            return Ok(finance);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    // -----------------------------
    // POST: api/finance
    // Creates the finance row (ONLY ONCE)
    // -----------------------------
    [HttpPost]
    public async Task<IActionResult> Post(Finance finance)
    {
        try
        {
            dbContext.Finances.Add(finance);
            await dbContext.SaveChangesAsync();
            return Created();
        }
        catch
        {
            return StatusCode(500);
        }
    }

    // -----------------------------
    // PUT: api/finance
    // Updates the existing row
    // -----------------------------
    [HttpPut]
    public async Task<IActionResult> Put(Finance finance)
    {
        try
        {
            dbContext.Entry(finance).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();

            return NoContent();
        }
        catch
        {
            return StatusCode(500);
        }
    }

    // -----------------------------
    // POST: api/finance/loan
    // Adds money to MoneyLeft
    // -----------------------------
    [HttpPost("loan")]
    public async Task<IActionResult> Loan(LoanRequest request)
    {
        if (request == null || request.LoanAmount <= 0)
            return BadRequest("Loan amount must be greater than 0.");

        var finance = await dbContext.Finances.FirstOrDefaultAsync();
        if (finance == null)
            return NotFound("Finance row missing.");

        finance.MoneyLeft += request.LoanAmount;

        await dbContext.SaveChangesAsync();

        return Ok(finance);
    }

    // -----------------------------
    // POST: api/finance/buy
    // Buy a player and update finance
    // -----------------------------
    [HttpPost("buy")]
    public async Task<IActionResult> BuyPlayer(BuyRequest request)
    {
        var athlete = await dbContext.Athletes.FindAsync(request.AthleteId);
        var finance = await dbContext.Finances.FirstOrDefaultAsync();

        if (athlete == null)
            return NotFound("Athlete not found");
        if (finance == null)
            return NotFound("Finance not found");

        if (athlete.Price > finance.MoneyLeft)
            return BadRequest("Not enough money");

        // Update athlete status
        athlete.PurchaseStatus = true;

        // Update finance
        finance.MoneyLeft -= athlete.Price;
        finance.MoneySpent += athlete.Price;
        finance.NumberOfPurchases++;

        await dbContext.SaveChangesAsync();

        // return clean DTO
        return Ok(new FinanceBuyDto
        {
            MoneyLeft = finance.MoneyLeft,
            MoneySpent = finance.MoneySpent,
            NumberOfPurchases = finance.NumberOfPurchases
        });
    }

    // -------- DTO CLASSES ---------

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
}
