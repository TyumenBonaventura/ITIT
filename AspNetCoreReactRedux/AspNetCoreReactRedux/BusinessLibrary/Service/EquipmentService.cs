using BusinessLibrary.Model;
using DataAccessLibrary.EntityModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public class EquipmentService : IEquipmentService
    {
        public async Task<List<EquipmentModel>> GetEquipments()
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                return await (from a in db.Equipment.AsNoTracking()
                              select new EquipmentModel
                              {
                                  EquipmentId = a.EquipmentId,
                                  Name = a.Name,
                                  EquipmentTypeId = a.EquipmentTypeId,
                                  Size = a.Size,
                                  Amount = a.Amount,
                                  GenderId = a.GenderId,
                                  AgeCategoryId = a.AgeCategoryId,
                                  Photo = a.Photo,

                              }).ToListAsync();
            }
        }

        public async Task<bool> SaveEquipment(EquipmentModel equipmentModel)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.Equipment equipment = db.Equipment.Where
                         (x => x.EquipmentId == equipmentModel.EquipmentId).FirstOrDefault();
                if (equipment == null)
                {
                    equipment = new Equipment()
                    {
                        Name = equipmentModel.Name,
                        EquipmentTypeId = equipmentModel.EquipmentTypeId,
                        Size = equipmentModel.Size,
                        Amount = equipmentModel.Amount,
                        GenderId = equipmentModel.GenderId,
                        AgeCategoryId = equipmentModel.AgeCategoryId,
                        Photo = equipmentModel.Photo
                    };
                    db.Equipment.Add(equipment);

                }
                else
                {
                    equipment.Name = equipmentModel.Name;
                    equipment.EquipmentTypeId = equipmentModel.EquipmentTypeId;
                    equipment.Size = equipmentModel.Size;
                    equipment.Amount = equipmentModel.Amount;
                    equipment.GenderId = equipmentModel.GenderId;
                    equipment.AgeCategoryId = equipmentModel.AgeCategoryId;
                    equipment.Photo = equipmentModel.Photo;
                }

                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<bool> DeleteEquipment(int equipmentId)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.Equipment equipment = db.Equipment.Where(x => x.EquipmentId == equipmentId).FirstOrDefault();
                if (equipment != null)
                {
                    db.Equipment.Remove(equipment);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }

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
    }
}