using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FootballAPI.Context;
using FootballAPI.Models;

namespace FootballAPI.Controllers;

// START: controller for Athlete (CRUD + unpurchased)
[ApiController]
[Route("api/[controller]")]
public class AthleteController : ControllerBase
{
    // START: felt for database-kontekst
    // Bruker dependency injection slik vi har sett i .NET-oppsettet.
    private readonly FotballContext _context;
    // SLUTT: felt for database-kontekst

    // START: konstruktør som får inn kontekst fra rammeverket
    public AthleteController(FotballContext context)
    {
        _context = context;
    }
    // SLUTT: konstruktør som får inn kontekst fra rammeverket

    // START: GET alle athletes
    // api/athlete
    [HttpGet]
    public async Task<ActionResult<List<Athlete>>> Get()
    {
        try
        {
            List<Athlete> athletes = await _context.Athletes.ToListAsync();
            return Ok(athletes);
        }
        catch
        {
            return StatusCode(500);
        }
    }
    // SLUTT: GET alle athletes

    // START: GET athlete med id
    // api/athlete/3 for eksempel
    [HttpGet("{id}")]
    public async Task<ActionResult<Athlete>> Get(int id)
    {
        try
        {
            Athlete? athlete = await _context.Athletes.FindAsync(id);

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
    // SLUTT: GET athlete med id

    // START: GET unpurchased athletes
    // api/athlete/unpurchased
    // Her bruker vi Where fra LINQ. Det er vanlig C#-bibliotek, ikke noe "magisk",
    // men det har ikke vært så mye fokus på det i forelesning, derfor kommentert.
    [HttpGet("unpurchased")]
    public async Task<ActionResult<List<Athlete>>> GetUnpurchased()
    {
        try
        {
            List<Athlete> unpurchasedAthletes = await _context.Athletes
                .Where(a => a.PurchaseStatus == false)
                .ToListAsync();

            return Ok(unpurchasedAthletes);
        }
        catch
        {
            return StatusCode(500);
        }
    }
    // SLUTT: GET unpurchased athletes

    // START: POST (opprette ny athlete)
    // api/athlete
    [HttpPost]
    public async Task<ActionResult> Post(Athlete newAthlete)
    {
        try
        {
            _context.Athletes.Add(newAthlete);
            await _context.SaveChangesAsync();
            return Created(); // 201 Created
        }
        catch
        {
            return StatusCode(500);
        }
    }
    // SLUTT: POST (opprette ny athlete)

    // START: PUT (oppdatere athlete)
    // api/athlete
    // Frontend sender hele objektet inn i body.
    [HttpPut]
    public async Task<IActionResult> Put(Athlete editedAthlete)
    {
        try
        {
            _context.Entry(editedAthlete).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent(); // 204
        }
        catch
        {
            return StatusCode(500);
        }
    }
    // SLUTT: PUT (oppdatere athlete)

    // START: DELETE (slette athlete)
    // api/athlete/3 for eksempel
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            Athlete? athlete = await _context.Athletes.FindAsync(id);

            if (athlete == null)
            {
                return NotFound();
            }

            _context.Athletes.Remove(athlete);
            await _context.SaveChangesAsync();

            return NoContent(); // 204
        }
        catch
        {
            return StatusCode(500);
        }
    }
    // SLUTT: DELETE (slette athlete)
}
// SLUTT: controller for Athlete
