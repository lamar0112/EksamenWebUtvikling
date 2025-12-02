using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FootballAPI.Context;
using FootballAPI.Models;

namespace FootballAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AthleteController(FotballContext context) : ControllerBase
{
    // TODO:
    // - GET alle athletes
    // - GET athlete med id
    // - GET unpurchased athletes
    // - POST (opprette ny athlete)
    // - PUT (oppdatere athlete)
    // - DELETE (slette athlete)
}
