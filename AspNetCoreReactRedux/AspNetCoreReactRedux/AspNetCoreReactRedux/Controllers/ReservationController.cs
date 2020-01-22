using BusinessLibrary.Model;
using BusinessLibrary.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace AspNetCoreReactRedux.Controllers
{
    [Route("api/[controller]")]
    public class ReservationController : Controller
    {
        private readonly IReservationService _reservationService;
        public ReservationController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet]
        [Route("Reservation")]
        public async Task<IActionResult> Reservation() 
        {
            return Ok(await _reservationService.GetReservations());
        }

        [HttpPost]
        [Route("SaveReservation")]
        public async Task<IActionResult> SaveReservation([FromBody] ReservationModel model)
        {
            return Ok(await _reservationService.SaveReservation(model));
        }

        [HttpDelete]
        [Route("DeleteReservation/{reservationId}")]
        public async Task<IActionResult> DeleteReservation(int reservationId)
        {
            return Ok(await _reservationService.DeleteReservation(reservationId));
        }

        [HttpGet]
        [Route("User")]
        public new async Task<IActionResult> User() 
        {
            return Ok(await _reservationService.GetUsers());
        }

        [HttpGet]
        [Route("ReservationStatus")]
        public async Task<IActionResult> ReservationStatus()
        {
            return Ok(await _reservationService.GetReservationStatuss());
        }

        [HttpGet]
        [Route("DocType")]
        public async Task<IActionResult> DocType()
        {
            return Ok(await _reservationService.GetDocTypes());
        }

    }
}
