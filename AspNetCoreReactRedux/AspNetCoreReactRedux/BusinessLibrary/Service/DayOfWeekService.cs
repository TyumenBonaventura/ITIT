using BusinessLibrary.Model;
using DataAccessLibrary.EntityModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public class DayOfWeekService : IDayOfWeekService
    {
        public async Task<List<DayOfWeekModel>> GetDayOfWeeks()
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                return await (from a in db.DayOfWeek.AsNoTracking()
                              select new DayOfWeekModel
                              {
                                  DayOfWeekId = a.DayOfWeekId,
                                  Name = a.Name,
                                  
                              }).ToListAsync();
            }
        }

        public async Task<bool> SaveDayOfWeek(DayOfWeekModel dayofweekModel)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.DayOfWeek dayofweek = db.DayOfWeek.Where
                         (x => x.DayOfWeekId == dayofweekModel.DayOfWeekId).FirstOrDefault();
                if (dayofweek == null)
                {
                    dayofweek = new DayOfWeek()
                    {
                        Name = dayofweekModel.Name,
                        
                    };
                    db.DayOfWeek.Add(dayofweek);

                }
                else
                {
                    dayofweek.Name = dayofweekModel.Name;
                    
                }

                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<bool> DeleteDayOfWeek(int dayofweekId)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.DayOfWeek dayofweek = db.DayOfWeek.Where(x => x.DayOfWeekId == dayofweekId).FirstOrDefault();
                if (dayofweek != null)
                {
                    db.DayOfWeek.Remove(dayofweek);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }
    }
}