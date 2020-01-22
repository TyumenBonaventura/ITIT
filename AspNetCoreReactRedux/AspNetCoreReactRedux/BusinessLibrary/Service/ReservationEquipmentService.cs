using BusinessLibrary.Model;
using DataAccessLibrary.EntityModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public class ReservationEquipmentService : IReservationEquipmentService
    {
        public async Task<List<ReservationEquipmentModel>> GetReservationEquipments()
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                return await (from a in db.ReservationEquipment.AsNoTracking()
                              select new ReservationEquipmentModel
                              {
                                  ReservationEquipmentId = a.ReservationEquipmentId,
                                  ReservationId = a.ReservationId,
                                  EquipmentId = a.EquipmentId,
                                  Amount = a.Amount,                         
        }).ToListAsync();
            }
        }

        public async Task<bool> SaveReservationEquipment(ReservationEquipmentModel reservationequipmentModel)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.ReservationEquipment reservationequipment = db.ReservationEquipment.Where
                         (x => x.ReservationEquipmentId == reservationequipmentModel.ReservationEquipmentId).FirstOrDefault();
                if (reservationequipment == null)
                {
                    reservationequipment = new ReservationEquipment()
                    {
                        ReservationEquipmentId = reservationequipmentModel.ReservationEquipmentId,
                        ReservationId = reservationequipmentModel.ReservationId,
                        EquipmentId = reservationequipmentModel.EquipmentId,
                        Amount = reservationequipmentModel.Amount,
                    };
                    db.ReservationEquipment.Add(reservationequipment);

                }
                else
                {
                    reservationequipment.ReservationEquipmentId = reservationequipmentModel.ReservationEquipmentId;
                    reservationequipment.ReservationId = reservationequipmentModel.ReservationId;
                    reservationequipment.EquipmentId = reservationequipmentModel.EquipmentId;
                    reservationequipment.Amount = reservationequipmentModel.Amount;
                }

                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<bool> DeleteReservationEquipment(int reservationequipmentId)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.ReservationEquipment reservationequipment = db.ReservationEquipment.Where(x => x.ReservationEquipmentId == reservationequipmentId).FirstOrDefault();
                if (reservationequipment != null)
                {
                    db.ReservationEquipment.Remove(reservationequipment);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }


        public async Task<List<ReservationModel>> GetReservations()
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                return await (from a in db.Reservation.AsNoTracking()
                              select new ReservationModel
                              {
                                  ReservationId = a.ReservationId,
                                  UserId = a.UserId,
                                  ReservationStatusId = a.ReservationStatusId,
                                  DocTypeId = a.DocTypeId,
                                  DocNum = a.DocNum,
                                  DateIssue = a.DateIssue,
                                  DateReturn = a.DateReturn,
                                  Cost = a.Cost,
                                  Comment = a.Comment
                              }).ToListAsync();
            }
        }

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
    }
}