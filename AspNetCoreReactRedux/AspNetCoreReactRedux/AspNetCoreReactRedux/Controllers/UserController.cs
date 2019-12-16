using BusinessLibrary.Model;
using BusinessLibrary.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace AspNetCoreReactRedux.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("User")]
        public new async Task<IActionResult> User() 
        {
            return Ok(await _userService.GetUsers());
        }

        [HttpPost]
        [Route("SaveUser")]
        public async Task<IActionResult> SaveUser([FromBody] UserModel model)
        {
            return Ok(await _userService.SaveUser(model));
        }

        [HttpDelete]
        [Route("DeleteUser/{userId}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            return Ok(await _userService.DeleteUser(userId));
        }

        [HttpGet]
        [Route("Role")]
        public async Task<IActionResult> Role() 
        {
            return Ok(await _userService.GetRoles());
        }

    }
}
