using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FootballAPI.Context;
using FootballAPI.Models;

namespace FootballAPI.Controllers;

// START: controller for Venue (CRUD)
[ApiController]
[Route("api/[controller]")]
public class VenueController : ControllerBase
{
    // START: felt for database-kontekst
    private readonly FotballContext _context;
    // SLUTT: felt for database-kontekst

    // START: konstruktør som får inn kontekst fra rammeverket
    public VenueController(FotballContext context)
    {
        _context = context;
    }
    // SLUTT: konstruktør som får inn kontekst fra rammeverket

    // START: GET alle venues
    // api/venue
    [HttpGet]
    public async Task<ActionResult<List<Venue>>> Get()
    {
        try
        {
            List<Venue> venues = await _context.Venues.ToListAsync();
            return Ok(venues);
        }
        catch
        {
            return StatusCode(500);
        }
    }
    // SLUTT: GET alle venues

    // START: GET venue med id
    // api/venue/3 for eksempel
    [HttpGet("{id}")]
    public async Task<ActionResult<Venue>> Get(int id)
    {
        try
        {
            Venue? venue = await _context.Venues.FindAsync(id);

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
    // SLUTT: GET venue med id

    // START: POST (opprette ny venue)
    // api/venue
    [HttpPost]
    public async Task<ActionResult> Post(Venue newVenue)
    {
        try
        {
            _context.Venues.Add(newVenue);
            await _context.SaveChangesAsync();
            return Created(); // 201 Created
        }
        catch
        {
            return StatusCode(500);
        }
    }
    // SLUTT: POST (opprette ny venue)

    // START: PUT (oppdatere venue)
    // api/venue
    [HttpPut]
    public async Task<IActionResult> Put(Venue editedVenue)
    {
        try
        {
            _context.Entry(editedVenue).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent(); // 204
        }
        catch
        {
            return StatusCode(500);
        }
    }
    // SLUTT: PUT (oppdatere venue)

    // START: DELETE (slette venue)
    // api/venue/3 for eksempel
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            Venue? venue = await _context.Venues.FindAsync(id);

            if (venue == null)
            {
                return NotFound();
            }

            _context.Venues.Remove(venue);
            await _context.SaveChangesAsync();
            return NoContent(); // 204
        }
        catch
        {
            return StatusCode(500);
        }
    }
    // SLUTT: DELETE (slette venue)
}
// SLUTT: controller for Venue
