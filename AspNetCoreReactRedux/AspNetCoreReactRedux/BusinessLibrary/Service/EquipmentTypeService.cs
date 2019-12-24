using BusinessLibrary.Model;
using DataAccessLibrary.EntityModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public class EquipmentTypeService : IEquipmentTypeService
    {
        public async Task<List<EquipmentTypeModel>> GetEquipmentTypes()
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                return await (from a in db.EquipmentType.AsNoTracking()
                              select new EquipmentTypeModel
                              {
                                  EquipmentTypeId = a.EquipmentTypeId,
                                  Name = a.Name,
                                  
                              }).ToListAsync();
            }
        }

        public async Task<bool> SaveEquipmentType(EquipmentTypeModel equipmenttypeModel)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.EquipmentType equipmenttype = db.EquipmentType.Where
                         (x => x.EquipmentTypeId == equipmenttypeModel.EquipmentTypeId).FirstOrDefault();
                if (equipmenttype == null)
                {
                    equipmenttype = new EquipmentType()
                    {
                        Name = equipmenttypeModel.Name,
                        
                    };
                    db.EquipmentType.Add(equipmenttype);

                }
                else
                {
                    equipmenttype.Name = equipmenttypeModel.Name;
                    
                }

                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<bool> DeleteEquipmentType(int equipmenttypeId)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.EquipmentType equipmenttype = db.EquipmentType.Where(x => x.EquipmentTypeId == equipmenttypeId).FirstOrDefault();
                if (equipmenttype != null)
                {
                    db.EquipmentType.Remove(equipmenttype);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }
    }
}