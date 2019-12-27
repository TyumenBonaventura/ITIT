using BusinessLibrary.Model;
using DataAccessLibrary.EntityModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public class UserService : IUserService
    {
        public async Task<List<UserModel>> GetUsers()
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                return await (from a in db.User.AsNoTracking()
                              select new UserModel
                              {
                                  UserId = a.UserId,
                                  Fio = a.Fio,
                                  RoleId = a.RoleId,
                                  Photo = a.Photo,
                                  Login = a.Login,
                                  PasswordHash = a.PasswordHash

                              }).ToListAsync();
            }
        }

        public async Task<bool> SaveUser(UserModel userModel)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.User user = db.User.Where
                         (x => x.UserId == userModel.UserId).FirstOrDefault();
                if (user == null)
                {
                    user = new User()
                    {
                        Fio = userModel.Fio,
                        RoleId = userModel.RoleId,
                        Photo = userModel.Photo,
                        Login = userModel.Login,
                        PasswordHash = userModel.PasswordHash
                    };
                    db.User.Add(user);

                }
                else
                {
                    user.Fio = userModel.Fio;
                    user.RoleId = userModel.RoleId;
                    user.Photo = userModel.Photo;
                    user.Login = userModel.Login;
                    user.PasswordHash = userModel.PasswordHash;   
                }

                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<bool> DeleteUser(int userId)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.User user = db.User.Where(x => x.UserId == userId).FirstOrDefault();
                if (user != null)
                {
                    db.User.Remove(user);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }

     
        public async Task<List<RoleModel>> GetRoles()
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                return await (from a in db.Role.AsNoTracking()
                              select new RoleModel
                              {
                                  RoleId = a.RoleId,
                                  Name = a.Name

                              }).ToListAsync();
            }
        }
    }
}