using BusinessLibrary.Model;
using BusinessLibrary.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace AspNetCoreReactRedux.Controllers
{
    [Route("api/[controller]")]
    public class RateController : Controller
    {
        private readonly IRateService _rateService;
        public RateController(IRateService rateService)
        {
            _rateService = rateService;
        }

        [HttpGet]
        [Route("Rate")]
        public new async Task<IActionResult> Rate() 
        {
            return Ok(await _rateService.GetRates());
        }

        [HttpPost]
        [Route("SaveRate")]
        public async Task<IActionResult> SaveRate([FromBody] RateModel model)
        {
            return Ok(await _rateService.SaveRate(model));
        }

        [HttpDelete]
        [Route("DeleteRate/{rateId}")]
        public async Task<IActionResult> DeleteRate(int rateId)
        {
            return Ok(await _rateService.DeleteRate(rateId));
        }

        [HttpGet]
        [Route("EquipmentType")]
        public async Task<IActionResult> EquipmentType() 
        {
            return Ok(await _rateService.GetEquipmentTypes());
        }

        [HttpGet]
        [Route("DayOfWeek")]
        public async Task<IActionResult> DayOfWeek()
        {
            return Ok(await _rateService.GetDayOfWeeks());
        }

    }
}
