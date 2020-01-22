using BusinessLibrary.Model;
using BusinessLibrary.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace AspNetCoreReactRedux.Controllers
{
    [Route("api/[controller]")]
    public class ReservationEquipmentController : Controller
    {
        private readonly IReservationEquipmentService _reservationequipmentService;
        public ReservationEquipmentController(IReservationEquipmentService reservationequipmentService)
        {
            _reservationequipmentService = reservationequipmentService;
        }

        [HttpGet]
        [Route("ReservationEquipment")]
        public async Task<IActionResult> ReservationEquipment() 
        {
            return Ok(await _reservationequipmentService.GetReservationEquipments());
        }

        [HttpPost]
        [Route("SaveReservationEquipment")]
        public async Task<IActionResult> SaveReservationEquipment([FromBody] ReservationEquipmentModel model)
        {
            return Ok(await _reservationequipmentService.SaveReservationEquipment(model));
        }

        [HttpDelete]
        [Route("DeleteReservationEquipment/{reservationequipmentId}")]
        public async Task<IActionResult> DeleteReservationEquipment(int reservationequipmentId)
        {
            return Ok(await _reservationequipmentService.DeleteReservationEquipment(reservationequipmentId));
        }

        [HttpGet]
        [Route("Reservation")]
        public async Task<IActionResult> Reservation() 
        {
            return Ok(await _reservationequipmentService.GetReservations());
        }

        [HttpGet]
        [Route("Equipment")]
        public async Task<IActionResult> ReservationEquipmentStatus()
        {
            return Ok(await _reservationequipmentService.GetEquipments());
        }

    }
}
