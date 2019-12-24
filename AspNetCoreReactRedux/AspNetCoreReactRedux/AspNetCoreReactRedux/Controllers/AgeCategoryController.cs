using BusinessLibrary.Model;
using BusinessLibrary.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace AspNetCoreReactRedux.Controllers
{
    [Route("api/[controller]")]
    public class AgeCategoryController : Controller
    {
        private readonly IAgeCategoryService _agecategoryService;
        public AgeCategoryController(IAgeCategoryService agecategoryService)
        {
            _agecategoryService = agecategoryService;
        }

        [HttpGet]
        [Route("AgeCategory")]
        public async Task<IActionResult> AgeCategory()
        {
            return Ok(await _agecategoryService.GetAgeCategorys());
        }

        [HttpPost]
        [Route("SaveAgeCategory")]
        public async Task<IActionResult> SaveAgeCategory([FromBody] AgeCategoryModel model)
        {
            return Ok(await _agecategoryService.SaveAgeCategory(model));
        }

        [HttpDelete]
        [Route("DeleteAgeCategory/{agecategoryId}")]
        public async Task<IActionResult> DeleteAgeCategory(int agecategoryId)
        {
            return Ok(await _agecategoryService.DeleteAgeCategory(agecategoryId));
        }

    }
}
