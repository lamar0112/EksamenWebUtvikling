using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FootballAPI.Context;
using FootballAPI.Models;

namespace FootballAPI.Controllers;

// localhost:x/api/"navnet til controlleren"
[ApiController]
[Route("api/[controller]")]
public class FinanceController : ControllerBase
{

private readonly FotballContext dbContext;


public FinanceController(FotballContext dbContext)
    {
        this.dbContext = dbContext;
    }
        // - GET finance (økonomisk status)
        [HttpGet]
        public IActionResult GetFinance()
    {
        try
        {
            var getFinance= dbContext.Finances.ToList();
         return Ok(getFinance);
        }
        catch
        {
            return StatusCode(500);
        }
         
    }
    // - PUT/POST for å oppdatere finance

    [HttpPost]
    public async Task<ActionResult> Post (Finance finance)
    {
        try
        {
            dbContext.Finances.Add(finance);
        await dbContext.SaveChangesAsync();
        return Created(); 
        }
        catch
        {
            return StatusCode (500);
        }
         
    }
    
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
            return StatusCode (500);
        }
    }


    // - Eget endpoint for lån
    // - Evt. eget endpoint for kjøp (oppdatere MoneyLeft, MoneySpent, NumberOfPurchases)
}
