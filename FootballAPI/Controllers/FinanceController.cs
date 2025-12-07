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
          
         // endpoint for å søke lån og øke summen selskapet allerede har i finance raden.
          [HttpPost("loan")]

          // Model biding er nå aktivert for loan endpoint, og gjør json(javascript object notation) data til et objekt. 
          public async Task <IActionResult> Loan (LoanRequest request)
    {
        // metode som validerer om input, sørge for at summen er større en null og positive tall
        // sikrer at økonomien ikke oppdateres av hva som helst
         if (request == null || request.LoanAmount <= 0)
          {
            return BadRequest ("Låne summen må være større en 0");
          }  

          // innhenter finance raden fra databasen/ sportsworld sin økonomi
          var finance = await dbContext.Finances.FirstOrDefaultAsync();
          if (finance == null)
        {
            return NotFound ("Fant ikke finace raden");
        }
         // VIKTIG!!
         // dette er selve logikken, brukeren kan nå legge til et nytt beløp og beløpet blir regristert
        finance.MoneyLeft += request.LoanAmount;

        // nye total summen blir permanent/lagret i databasen 
        await dbContext.SaveChangesAsync();
        // først retunerer det oppdatert finance objekt også forteller frontend at nå kan beløpet vises til brukeren umiddelbart 
        return Ok (finance);
    }

         

    // - Eget endpoint for lån
    // - Evt. eget endpoint for kjøp (oppdatere MoneyLeft, MoneySpent, NumberOfPurchases)
}