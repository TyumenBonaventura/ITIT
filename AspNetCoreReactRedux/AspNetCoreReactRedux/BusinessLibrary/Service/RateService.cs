using BusinessLibrary.Model;
using DataAccessLibrary.EntityModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public class RateService : IRateService
    {
        public async Task<List<RateModel>> GetRates()
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                return await (from a in db.Rate.AsNoTracking()
                              select new RateModel
                              {
                                  RateId = a.RateId,
                                  DayOfWeekId = a.DayOfWeekId,
                                  Price = a.Price,
                                  EquipmentTypeId = a.EquipmentTypeId,


                              }).ToListAsync();
            }
        }

        public async Task<bool> SaveRate(RateModel rateModel)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.Rate rate = db.Rate.Where
                         (x => x.RateId == rateModel.RateId).FirstOrDefault();
                if (rate == null)
                {
                    rate = new Rate()
                    {
                        RateId = rateModel.RateId,
                        DayOfWeekId = rateModel.DayOfWeekId,
                        Price = rateModel.Price,
                        EquipmentTypeId = rateModel.EquipmentTypeId
                    };
                    db.Rate.Add(rate);

                }
                else
                {
                    rate.RateId = rateModel.RateId;
                    rate.DayOfWeekId = rateModel.DayOfWeekId;
                    rate.Price = rateModel.Price;
                    rate.EquipmentTypeId = rateModel.EquipmentTypeId;
                }

                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<bool> DeleteRate(int rateId)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.Rate rate = db.Rate.Where(x => x.RateId == rateId).FirstOrDefault();
                if (rate != null)
                {
                    db.Rate.Remove(rate);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }

     
        public async Task<List<DayOfWeekModel>> GetDayOfWeeks()
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                return await (from a in db.DayOfWeek.AsNoTracking()
                              select new DayOfWeekModel
                              {
                                  DayOfWeekId = a.DayOfWeekId,
                                  Name = a.Name

                              }).ToListAsync();
            }
        }

        public async Task<List<EquipmentTypeModel>> GetEquipmentTypes()
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                return await (from a in db.EquipmentType.AsNoTracking()
                              select new EquipmentTypeModel
                              {
                                  EquipmentTypeId = a.EquipmentTypeId,
                                  Name = a.Name

                              }).ToListAsync();
            }
        }
    }
}