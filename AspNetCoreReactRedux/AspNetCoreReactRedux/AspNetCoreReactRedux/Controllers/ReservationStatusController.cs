using BusinessLibrary.Model;
using BusinessLibrary.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace AspNetCoreReactRedux.Controllers
{
    [Route("api/[controller]")]
    public class ReservationStatusController : Controller
    {
        private readonly IReservationStatusService _reservationstatusService;
        public ReservationStatusController(IReservationStatusService reservationstatusService)
        {
            _reservationstatusService = reservationstatusService;
        }

        [HttpGet]
        [Route("ReservationStatus")]
        public async Task<IActionResult> ReservationStatus()
        {
            return Ok(await _reservationstatusService.GetReservationStatuss());
        }

        [HttpPost]
        [Route("SaveReservationStatus")]
        public async Task<IActionResult> SaveReservationStatus([FromBody] ReservationStatusModel model)
        {
            return Ok(await _reservationstatusService.SaveReservationStatus(model));
        }

        [HttpDelete]
        [Route("DeleteReservationStatus/{reservationstatusId}")]
        public async Task<IActionResult> DeleteReservationStatus(int reservationstatusId)
        {
            return Ok(await _reservationstatusService.DeleteReservationStatus(reservationstatusId));
        }

    }
}
