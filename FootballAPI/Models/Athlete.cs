    using FootballAPI.Interfaces;

    namespace FootballAPI.Models;

    public class Athlete : IAthlete
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Gender { get; set; } = "";
        public decimal Price { get; set; }
        public string Image { get; set; } = "";
        public bool PurchaseStatus { get; set; } = false;
    }
