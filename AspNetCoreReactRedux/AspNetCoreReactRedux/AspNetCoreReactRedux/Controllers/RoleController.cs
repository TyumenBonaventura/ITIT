using BusinessLibrary.Model;
using BusinessLibrary.Service;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace AspNetCoreReactRedux.Controllers
{
    [Route("api/[controller]")]
    public class RoleController : Controller
    {
        private readonly IRoleService _roleService;
        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpGet]
        [Route("Role")]
        public async Task<IActionResult> Role()
        {
            return Ok(await _roleService.GetRoles());
        }

        [HttpPost]
        [Route("SaveRole")]
        public async Task<IActionResult> SaveRole([FromBody] RoleModel model)
        {
            return Ok(await _roleService.SaveRole(model));
        }

        [HttpDelete]
        [Route("DeleteRole/{roleId}")]
        public async Task<IActionResult> DeleteRole(int roleId)
        {
            return Ok(await _roleService.DeleteRole(roleId));
        }

    }
}
