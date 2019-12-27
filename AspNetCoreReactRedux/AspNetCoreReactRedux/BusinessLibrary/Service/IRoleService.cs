using BusinessLibrary.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public interface IRoleService
    {
        Task<List<RoleModel>> GetRoles();
        Task<bool> SaveRole(RoleModel role);
        Task<bool> DeleteRole(int roleId);
    }
}
