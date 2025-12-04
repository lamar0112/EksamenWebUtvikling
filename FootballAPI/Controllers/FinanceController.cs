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
    


    // - Eget endpoint for lån
    // - Evt. eget endpoint for kjøp (oppdatere MoneyLeft, MoneySpent, NumberOfPurchases)
}
