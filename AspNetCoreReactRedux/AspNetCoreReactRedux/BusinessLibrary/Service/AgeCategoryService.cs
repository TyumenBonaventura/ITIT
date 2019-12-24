using BusinessLibrary.Model;
using DataAccessLibrary.EntityModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public class AgeCategoryService : IAgeCategoryService
    {
        public async Task<List<AgeCategoryModel>> GetAgeCategorys()
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                return await (from a in db.AgeCategory.AsNoTracking()
                              select new AgeCategoryModel
                              {
                                  AgeCategoryId = a.AgeCategoryId,
                                  Name = a.Name,
                                  
                              }).ToListAsync();
            }
        }

        public async Task<bool> SaveAgeCategory(AgeCategoryModel agecategoryModel)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.AgeCategory agecategory = db.AgeCategory.Where
                         (x => x.AgeCategoryId == agecategoryModel.AgeCategoryId).FirstOrDefault();
                if (agecategory == null)
                {
                    agecategory = new AgeCategory()
                    {
                        Name = agecategoryModel.Name,
                        
                    };
                    db.AgeCategory.Add(agecategory);

                }
                else
                {
                    agecategory.Name = agecategoryModel.Name;
                    
                }

                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<bool> DeleteAgeCategory(int agecategoryId)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.AgeCategory agecategory = db.AgeCategory.Where(x => x.AgeCategoryId == agecategoryId).FirstOrDefault();
                if (agecategory != null)
                {
                    db.AgeCategory.Remove(agecategory);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }
    }
}