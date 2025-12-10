using Microsoft.AspNetCore.Mvc;

namespace FootballAPI.Controllers;

// START: controller for bildeopplasting
[ApiController]
[Route("api/[controller]")]
public class ImageUploadController : ControllerBase
{
    // START: felt for webrot (wwwroot)
    // IWebHostEnvironment gir oss tilgang til WebRootPath (wwwroot-mappa).
    private readonly IWebHostEnvironment _webHostEnvironment;
    // SLUTT: felt for webrot (wwwroot)

    // START: konstruktør som får inn IWebHostEnvironment fra rammeverket
    public ImageUploadController(IWebHostEnvironment webHostEnvironment)
    {
        _webHostEnvironment = webHostEnvironment;
    }
    // SLUTT: konstruktør som får inn IWebHostEnvironment fra rammeverket

    // START: POST: api/imageupload
    // Tar imot én fil med navnet "file" (samme som i formData i frontend).
    [HttpPost]
    public async Task<IActionResult> Post(IFormFile file)
    {
        try
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded");
            }

            // finner fysisk sti til wwwroot/images
            string webRootPath = _webHostEnvironment.WebRootPath;
            string imagesFolder = Path.Combine(webRootPath, "images");

            // lager mappen hvis den ikke finnes fra før
            if (!Directory.Exists(imagesFolder))
            {
                Directory.CreateDirectory(imagesFolder);
            }

            string absolutePath = Path.Combine(imagesFolder, file.FileName);

            // lagrer fila til disk
            using (var fileStream = new FileStream(absolutePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            // 201 Created er nok her, vi trenger ikke sende ekstra data tilbake
            return Created(string.Empty, null);
        }
        catch
        {
            return StatusCode(500);
        }
    }
    // SLUTT: POST: api/imageupload
}
// SLUTT: controller for bildeopplasting
