using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FootballAPI.Context;
using FootballAPI.Models;

namespace FootballAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FinanceController(FotballContext context) : ControllerBase
{

    
    // TODO:
    // - GET finance (økonomisk status)
    [HttpGet]
    public async 
    // - PUT/POST for å oppdatere finance
    [HttpPost]
    // - Eget endpoint for lån
    // - Evt. eget endpoint for kjøp (oppdatere MoneyLeft, MoneySpent, NumberOfPurchases)
}
