using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FootballAPI.Context;
using FootballAPI.Models;

namespace FootballAPI.Controllers;

// START: Controller for Venue (CRUD)
[ApiController]
[Route("api/[controller]")]
public class VenueController : ControllerBase
{
    private readonly FotballContext _context;

    // Konstruktør som får inn kontekst via dependency injection
    public VenueController(FotballContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Venue>>> Get()
    {
        try
        {
            var venues = await _context.Venues.ToListAsync();
            return Ok(venues);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Venue>> Get(int id)
    {
        try
        {
            var venue = await _context.Venues.FindAsync(id);
            return venue == null ? NotFound() : Ok(venue);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpPost]
    public async Task<ActionResult> Post(Venue newVenue)
    {
        try
        {
            _context.Venues.Add(newVenue);
            await _context.SaveChangesAsync();
            return Created("", newVenue);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpPut]
    public async Task<IActionResult> Put(Venue editedVenue)
    {
        if (editedVenue == null || editedVenue.Id <= 0)
        {
            return BadRequest("Invalid venue data.");
        }

        try
        {
            _context.Entry(editedVenue).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var venue = await _context.Venues.FindAsync(id);
            if (venue == null) return NotFound();

            _context.Venues.Remove(venue);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch
        {
            return StatusCode(500);
        }
    }
    // START: Søk på navn (GetByName)
[HttpGet("search")]
public async Task<ActionResult<List<Venue>>> SearchByName([FromQuery] string name)
{
    try
    {
        if (string.IsNullOrWhiteSpace(name))
            return BadRequest("Name is required.");

        var result = await _context.Venues
            .Where(v => v.Name.ToLower().Contains(name.ToLower()))
            .ToListAsync();

        return Ok(result);
    }
    catch
    {
        return StatusCode(500);
    }
}
// SLUTT: Søk på navn (GetByName)

}
// SLUTT: Controller for Venue (CRUD)
