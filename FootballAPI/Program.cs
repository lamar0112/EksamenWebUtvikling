using Microsoft.EntityFrameworkCore;
using FootballAPI.Context;

var builder = WebApplication.CreateBuilder(args);

// START: Tjenester (DbContext + Controllers)
builder.Services.AddDbContext<FotballContext>(options =>
    options.UseSqlite("Data Source=Database/SportsWorld.db")
);

builder.Services.AddControllers();
// SLUTT: Tjenester (DbContext + Controllers)

// START: CORS (gjør at React-frontend kan kalle API-et)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader()
    );
});
// SLUTT: CORS (gjør at React-frontend kan kalle API-et)

// START: OpenAPI (kun for lokal testing i development)
builder.Services.AddOpenApi();
// SLUTT: OpenAPI (kun for lokal testing i development)

var app = builder.Build();

// START: Statisk innhold (wwwroot: bilder + API-dokumentasjonsside)
app.UseStaticFiles();
// SLUTT: Statisk innhold (wwwroot: bilder + API-dokumentasjonsside)

app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
