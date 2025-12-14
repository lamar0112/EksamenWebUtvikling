using Microsoft.AspNetCore.Mvc;

namespace FootballAPI.Controllers;

// START: Controller for bildeopplasting til wwwroot/images
[ApiController]
[Route("api/[controller]")]
public class ImageUploadController : ControllerBase
{
    private readonly IWebHostEnvironment _webHostEnvironment;

    // Konstruktør som gir tilgang til wwwroot-mappen
    public ImageUploadController(IWebHostEnvironment webHostEnvironment)
    {
        _webHostEnvironment = webHostEnvironment;
    }

    // Tar imot én fil med navnet "file" fra frontend
    [HttpPost]
    public async Task<IActionResult> Post(IFormFile file)
    {
        try
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            string webRootPath = _webHostEnvironment.WebRootPath;
            string imagesFolder = Path.Combine(webRootPath, "images");

            // Lager images-mappen hvis den ikke finnes
            if (!Directory.Exists(imagesFolder))
            {
                Directory.CreateDirectory(imagesFolder);
            }

            string filePath = Path.Combine(imagesFolder, file.FileName);

            // Lagrer fila til disk
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Returnerer filnavnet slik at frontend kan lagre det på Athlete/Venue
            return Ok(new { fileName = file.FileName });
        }
        catch
        {
            return StatusCode(500);
        }
    }
}
// SLUTT: Controller for bildeopplasting
