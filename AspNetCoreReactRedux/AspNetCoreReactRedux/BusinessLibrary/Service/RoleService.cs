using BusinessLibrary.Model;
using DataAccessLibrary.EntityModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public class RoleService : IRoleService
    {
        public async Task<List<RoleModel>> GetRoles()
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                return await (from a in db.Role.AsNoTracking()
                              select new RoleModel
                              {
                                  RoleId = a.RoleId,
                                  Name = a.Name,
                                  
                              }).ToListAsync();
            }
        }

        public async Task<bool> SaveRole(RoleModel roleModel)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.Role role = db.Role.Where
                         (x => x.RoleId == roleModel.RoleId).FirstOrDefault();
                if (role == null)
                {
                    role = new Role()
                    {
                        Name = roleModel.Name,
                        
                    };
                    db.Role.Add(role);

                }
                else
                {
                    role.Name = roleModel.Name;
                    
                }

                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<bool> DeleteRole(int roleId)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.Role role = db.Role.Where(x => x.RoleId == roleId).FirstOrDefault();
                if (role != null)
                {
                    db.Role.Remove(role);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }

    /*    Task<List<DocTypeModel>> IRoleService.GetRoles()
        {
            throw new System.NotImplementedException();
        }*/
    }
}