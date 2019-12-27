using BusinessLibrary.Model;
using BusinessLibrary.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace AspNetCoreReactRedux.Controllers
{
    [Route("api/[controller]")]
    public class DayOfWeekController : Controller
    {
        private readonly IDayOfWeekService _dayofweekService;
        public DayOfWeekController(IDayOfWeekService dayofweekService)
        {
            _dayofweekService = dayofweekService;
        }

        [HttpGet]
        [Route("DayOfWeek")]
        public async Task<IActionResult> DayOfWeek()
        {
            return Ok(await _dayofweekService.GetDayOfWeeks());
        }

        [HttpPost]
        [Route("SaveDayOfWeek")]
        public async Task<IActionResult> SaveDayOfWeek([FromBody] DayOfWeekModel model)
        {
            return Ok(await _dayofweekService.SaveDayOfWeek(model));
        }

        [HttpDelete]
        [Route("DeleteDayOfWeek/{dayofweekId}")]
        public async Task<IActionResult> DeleteDayOfWeek(int dayofweekId)
        {
            return Ok(await _dayofweekService.DeleteDayOfWeek(dayofweekId));
        }

    }
}
