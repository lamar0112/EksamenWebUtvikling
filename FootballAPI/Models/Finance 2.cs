using FootballAPI.Interfaces;

namespace FootballAPI.Models;

public class Finance : IFinance
{
    public int Id { get; set; }
    public decimal MoneyLeft { get; set; }
    public int NumberOfPurchases { get; set; }
    public decimal MoneySpent { get; set; }
}
