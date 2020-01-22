using BusinessLibrary.Model;
using BusinessLibrary.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace AspNetCoreReactRedux.Controllers
{
    [Route("api/[controller]")]
    public class EquipmentController : Controller
    {
        private readonly IEquipmentService _equipmentService;
        public EquipmentController(IEquipmentService equipmentService)
        {
            _equipmentService = equipmentService;
        }

        [HttpGet]
        [Route("Equipment")]
        public async Task<IActionResult> Equipment() 
        {
            return Ok(await _equipmentService.GetEquipments());
        }

        [HttpPost]
        [Route("SaveEquipment")]
        public async Task<IActionResult> SaveEquipment([FromBody] EquipmentModel model)
        {
            return Ok(await _equipmentService.SaveEquipment(model));
        }

        [HttpDelete]
        [Route("DeleteEquipment/{equipmentId}")]
        public async Task<IActionResult> DeleteEquipment(int equipmentId)
        {
            return Ok(await _equipmentService.DeleteEquipment(equipmentId));
        }

        [HttpGet]
        [Route("AgeCategory")]
        public async Task<IActionResult> AgeCategory() 
        {
            return Ok(await _equipmentService.GetAgeCategorys());
        }

        [HttpGet]
        [Route("EquipmentType")]
        public async Task<IActionResult> EquipmentType()
        {
            return Ok(await _equipmentService.GetEquipmentTypes());
        }

        [HttpGet]
        [Route("Gender")]
        public async Task<IActionResult> Gender()
        {
            return Ok(await _equipmentService.GetGenders());
        }

    /*    [HttpGet]
        [Route("ReservationEquipment")]
        public async Task<IActionResult> ReservationEquipment()
        {
            return Ok(await _equipmentService.GetReservationEquipments());
        }*/

    }
}
