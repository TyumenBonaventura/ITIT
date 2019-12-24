using BusinessLibrary.Model;
using BusinessLibrary.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace AspNetCoreReactRedux.Controllers
{
    [Route("api/[controller]")]
    public class EquipmentTypeController : Controller
    {
        private readonly IEquipmentTypeService _equipmenttypeService;
        public EquipmentTypeController(IEquipmentTypeService equipmenttypeService)
        {
            _equipmenttypeService = equipmenttypeService;
        }

        [HttpGet]
        [Route("EquipmentType")]
        public async Task<IActionResult> EquipmentType()
        {
            return Ok(await _equipmenttypeService.GetEquipmentTypes());
        }

        [HttpPost]
        [Route("SaveEquipmentType")]
        public async Task<IActionResult> SaveEquipmentType([FromBody] EquipmentTypeModel model)
        {
            return Ok(await _equipmenttypeService.SaveEquipmentType(model));
        }

        [HttpDelete]
        [Route("DeleteEquipmentType/{equipmenttypeId}")]
        public async Task<IActionResult> DeleteEquipmentType(int equipmenttypeId)
        {
            return Ok(await _equipmenttypeService.DeleteEquipmentType(equipmenttypeId));
        }

    }
}
