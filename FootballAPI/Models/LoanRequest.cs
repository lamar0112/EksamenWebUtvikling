// Hvorfor loanrequest ikke trenger en interace fil og hvorfor det er en model fil?
// loanrequest er (DTO) data transfer object, den brukes for å ta imot data fra brukeren ikke fra databasen.
// dto skal være, små, enkel, uten interface og ikke tilkoblet databasen 
// finance trenger interface siden det er en domenemodell, en rad i databasen, tabller inneholder interface, model og controller.
// siden loanrequest ikke representerer en database så behøver den ikke interface
// grunnen til det er model fil er fordi alt som brukes som en modell i et API DTO OSV, er vanligvis i models
// dette er en asp.net core model binding
// dette er ikke en database, kun del av et api





using FootballAPI.Interfaces;

namespace FootballAPI.Models;

public class LoanRequest
{
    public decimal LoanAmount {get; set;}
}