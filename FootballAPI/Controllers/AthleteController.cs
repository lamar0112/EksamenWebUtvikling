using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FootballAPI.Context;
using FootballAPI.Models;

namespace FootballAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AthleteController : ControllerBase
{
    private readonly FotballContext _context;

    // Konstruktør som får inn kontekst fra rammeverket
    public AthleteController(FotballContext context)
    {
        _context = context;
    }

    // Henter alle spillere
    [HttpGet]
    public async Task<ActionResult<List<Athlete>>> Get()
    {
        try
        {
            var athletes = await _context.Athletes.ToListAsync();
            return Ok(athletes);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    // Henter en spiller basert på id
    [HttpGet("{id}")]
    public async Task<ActionResult<Athlete>> Get(int id)
    {
        try
        {
            var athlete = await _context.Athletes.FindAsync(id);
            return athlete == null ? NotFound() : Ok(athlete);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    // Henter spillere som ikke er kjøpt
    [HttpGet("unpurchased")]
    public async Task<ActionResult<List<Athlete>>> GetUnpurchased()
    {
        try
        {
            var unpurchasedAthletes = await _context.Athletes
                .Where(a => a.PurchaseStatus == false)
                .ToListAsync();
            return Ok(unpurchasedAthletes);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    // Oppretter en ny spiller
    [HttpPost]
    public async Task<ActionResult> Post(Athlete newAthlete)
    {
        try
        {
            _context.Athletes.Add(newAthlete);
            await _context.SaveChangesAsync();
            return Created("", newAthlete);  // 201 Created
        }
        catch
        {
            return StatusCode(500);
        }
    }

    // Oppdaterer en spiller
    [HttpPut]
    public async Task<IActionResult> Put(Athlete editedAthlete)
    {
        try
        {
            _context.Entry(editedAthlete).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();  // 204
        }
        catch
        {
            return StatusCode(500);
        }
    }

    // Sletter en spiller
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var athlete = await _context.Athletes.FindAsync(id);
            if (athlete == null) return NotFound();
            _context.Athletes.Remove(athlete);
            await _context.SaveChangesAsync();
            return NoContent();  // 204
        }
        catch
        {
            return StatusCode(500);
        }
    }
    // START: Søk på navn (GetByName)
[HttpGet("search")]
public async Task<ActionResult<List<Athlete>>> SearchByName([FromQuery] string name)
{
    try
    {
        if (string.IsNullOrWhiteSpace(name))
            return BadRequest("Name is required.");

        var result = await _context.Athletes
            .Where(a => a.Name.ToLower().Contains(name.ToLower()))
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

