using BusinessLibrary.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public interface IUserService
    {
        Task<List<UserModel>> GetUsers();
        Task<bool> SaveUser(UserModel user);
        Task<bool> DeleteUser(int userId);

        Task<List<RoleModel>> GetRoles();
    }
}
