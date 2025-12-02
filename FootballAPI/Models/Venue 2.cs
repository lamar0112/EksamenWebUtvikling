using FootballAPI.Interfaces;

namespace FootballAPI.Models;

public class Venue : IVenue
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public int Capacity { get; set; }
    public string Image { get; set; } = "";
}
