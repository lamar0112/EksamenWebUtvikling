namespace FootballAPI.Models;

// DTO brukt for å ta imot lånebeløp fra frontend (ikke en database-modell)
public class LoanRequest
{
    public decimal LoanAmount { get; set; }
}
