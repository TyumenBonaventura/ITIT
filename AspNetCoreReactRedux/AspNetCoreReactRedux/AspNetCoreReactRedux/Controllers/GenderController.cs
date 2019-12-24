using BusinessLibrary.Model;
using BusinessLibrary.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace AspNetCoreReactRedux.Controllers
{
    [Route("api/[controller]")]
    public class GenderController : Controller
    {
        private readonly IGenderService _genderService;
        public GenderController(IGenderService genderService)
        {
            _genderService = genderService;
        }

        [HttpGet]
        [Route("Gender")]
        public async Task<IActionResult> Gender()
        {
            return Ok(await _genderService.GetGenders());
        }

        [HttpPost]
        [Route("SaveGender")]
        public async Task<IActionResult> SaveGender([FromBody] GenderModel model)
        {
            return Ok(await _genderService.SaveGender(model));
        }

        [HttpDelete]
        [Route("DeleteGender/{genderId}")]
        public async Task<IActionResult> DeleteGender(int genderId)
        {
            return Ok(await _genderService.DeleteGender(genderId));
        }

    }
}
