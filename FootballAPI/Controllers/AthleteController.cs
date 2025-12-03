 using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FootballAPI.Context;
using FootballAPI.Models;
using System.Diagnostics.Contracts;

namespace FootballAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AthleteController(FotballContext footballContext) : ControllerBase
{
    // TODO:
    // - GET alle athletes
    [HttpGet]
    public async Task<ActionResult<List<Athlete>>> Get()
    {
        try
        {
            List<Athlete> athletes = await footballContext.Athletes.ToListAsync();
            return Ok(athletes);
        }
        catch
        {
            return StatusCode(500);
        }
    }
    // - GET athlete med id
   [HttpGet("{id}")]
    public async Task<ActionResult<Athlete>> Get(int id)
    {
        try
        {
            Athlete? athlete = await footballContext.Athletes.FindAsync(id);

            if (athlete != null)
            {
                return Ok(athlete);
            }
            else
            {
                return NotFound();
            }
        }
        catch
        {
            return StatusCode(500);
        }
    }


    // - GET unpurchased athletes

    [HttpGet("unpurchased")]
    public async Task<ActionResult<List<Athlete>>> GetUnpurchased()
    {
        try
        {
            List<Athlete> unpurchasedAthletes = await footballContext.Athletes
                .Where(a => a.PurchaseStatus == false)
                .ToListAsync();

            return Ok(unpurchasedAthletes);
        }
        catch
        {
            return StatusCode(500);
        }
    }


    // - POST (opprette ny athlete)
   [HttpPost]
public async Task<ActionResult> Post(Athlete newAthlete)
{
    try
    {
        footballContext.Athletes.Add(newAthlete);
        await footballContext.SaveChangesAsync();
        return Created(); 
    }
    catch
    {
        return StatusCode(500);
    }
}


    
    // - PUT (oppdatere athlete)
    [HttpPut]
    public async Task<IActionResult> Put(Athlete editedAthlete)
    {
        try
        {
            footballContext.Entry(editedAthlete).State = EntityState.Modified;
            await footballContext.SaveChangesAsync();
            return NoContent(); 
        }
        catch
        {
            return StatusCode(500);
        }
    }

    
    // - DELETE (slette athlete)
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            Athlete? athlete = await footballContext.Athletes.FindAsync(id);

            if (athlete == null)
            {
                return NotFound();
            }

            footballContext.Athletes.Remove(athlete);
            await footballContext.SaveChangesAsync();

            return NoContent();
        }
        catch
        {
            return StatusCode(500);
        }
    }

    }
