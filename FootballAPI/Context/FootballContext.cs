using Microsoft.EntityFrameworkCore;
using FootballAPI.Models;

namespace FootballAPI.Context;

public class FotballContext(DbContextOptions<FotballContext> options)
    : DbContext(options)
{
    // DbSets representerer tabellene i databasen
    public DbSet<Finance> Finances { get; set; }
    public DbSet<Athlete> Athletes { get; set; }
    public DbSet<Venue> Venues { get; set; }
}
