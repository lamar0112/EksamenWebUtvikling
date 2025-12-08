using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FootballAPI.Context;
using FootballAPI.Models;

namespace FootballAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VenueController(FotballContext context) : ControllerBase
{
    // GET alle venues
    [HttpGet]
    public async Task<ActionResult<List<Venue>>> Get()
    {
        
        try
        {
            List<Venue> venues = await context.Venues.ToListAsync();
            return Ok(venues);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    // GET venue med id
    [HttpGet("{id}")]
    public async Task<ActionResult<Venue>> Get(int id)
    {
        try
        {
            Venue? venue = await context.Venues.FindAsync(id);

            if (venue != null)
            {
                return Ok(venue);
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

    // POST (opprette ny venue)
    [HttpPost]
    public async Task<ActionResult> Post(Venue newVenue)
    {
        try
        {
            context.Venues.Add(newVenue);
            await context.SaveChangesAsync();
            return Created(); // 201 Created
        }
        catch
        {
            return StatusCode(500);
        }
    }

    // PUT (oppdatere venue)
    [HttpPut]
    public async Task<IActionResult> Put(Venue editedVenue)
    {
        try
        {
            context.Entry(editedVenue).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return NoContent(); // 204
        }
        catch
        {
            return StatusCode(500);
        }
    }

    // DELETE (slette venue)
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            Venue? venue = await context.Venues.FindAsync(id);

            if (venue == null)
            {
                return NotFound();
            }

            context.Venues.Remove(venue);
            await context.SaveChangesAsync();
            return NoContent(); // 204
        }
        catch
        {
            return StatusCode(500);
        }
    }
}
