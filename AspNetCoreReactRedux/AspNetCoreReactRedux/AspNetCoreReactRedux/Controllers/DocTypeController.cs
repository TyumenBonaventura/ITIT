using BusinessLibrary.Model;
using BusinessLibrary.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace AspNetCoreReactRedux.Controllers
{
    [Route("api/[controller]")]
    public class DocTypeController : Controller
    {
        private readonly IDocTypeService _doctypeService;
        public DocTypeController(IDocTypeService doctypeService)
        {
            _doctypeService = doctypeService;
        }

        [HttpGet]
        [Route("DocType")]
        public async Task<IActionResult> DocType()
        {
            return Ok(await _doctypeService.GetDocTypes());
        }

        [HttpPost]
        [Route("SaveDocType")]
        public async Task<IActionResult> SaveDocType([FromBody] DocTypeModel model)
        {
            return Ok(await _doctypeService.SaveDocType(model));
        }

        [HttpDelete]
        [Route("DeleteDocType/{doctypeId}")]
        public async Task<IActionResult> DeleteDocType(int doctypeId)
        {
            return Ok(await _doctypeService.DeleteDocType(doctypeId));
        }

    }
}
