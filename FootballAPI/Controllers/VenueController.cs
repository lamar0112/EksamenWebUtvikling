using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FootballAPI.Context;
using FootballAPI.Models;

namespace FootballAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VenueController(FotballContext context) : ControllerBase
{
    // TODO:
    // - GET alle venues
    [HttpGet]
    public async Task<ActionResults<>>
    // - GET venue med id
    // - POST (opprette ny venue)
    // - PUT (oppdatere venue)
    // - DELETE (slette venue)
}
