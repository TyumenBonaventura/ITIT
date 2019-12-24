using BusinessLibrary.Model;
using DataAccessLibrary.EntityModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public class GenderService : IGenderService
    {
        public async Task<List<GenderModel>> GetGenders()
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                return await (from a in db.Gender.AsNoTracking()
                              select new GenderModel
                              {
                                  GenderId = a.GenderId,
                                  Name = a.Name,
                                  
                              }).ToListAsync();
            }
        }

        public async Task<bool> SaveGender(GenderModel genderModel)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.Gender gender = db.Gender.Where
                         (x => x.GenderId == genderModel.GenderId).FirstOrDefault();
                if (gender == null)
                {
                    gender = new Gender()
                    {
                        Name = genderModel.Name,
                        
                    };
                    db.Gender.Add(gender);

                }
                else
                {
                    gender.Name = genderModel.Name;
                    
                }

                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<bool> DeleteGender(int genderId)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.Gender gender = db.Gender.Where(x => x.GenderId == genderId).FirstOrDefault();
                if (gender != null)
                {
                    db.Gender.Remove(gender);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }

    }
}