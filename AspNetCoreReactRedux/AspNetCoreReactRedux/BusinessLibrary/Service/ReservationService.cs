using BusinessLibrary.Model;
using DataAccessLibrary.EntityModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public class ReservationService : IReservationService
    {
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

        public async Task<bool> SaveReservation(ReservationModel reservationModel)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.Reservation reservation = db.Reservation.Where
                         (x => x.ReservationId == reservationModel.ReservationId).FirstOrDefault();
                if (reservation == null)
                {
                    reservation = new Reservation()
                    {
                        ReservationId = reservationModel.ReservationId,
                        UserId = reservationModel.UserId,
                        ReservationStatusId = reservationModel.ReservationStatusId,
                        DocTypeId = reservationModel.DocTypeId,
                        DocNum = reservationModel.DocNum,
                        DateIssue = reservationModel.DateIssue,
                        DateReturn = reservationModel.DateReturn,
                        Cost = reservationModel.Cost,
                        Comment = reservationModel.Comment
                    };
                    db.Reservation.Add(reservation);

                }
                else
                {
                    reservation.ReservationId = reservationModel.ReservationId;
                    reservation.UserId = reservationModel.UserId;
                    reservation.ReservationStatusId = reservationModel.ReservationStatusId;
                    reservation.DocTypeId = reservationModel.DocTypeId;
                    reservation.DocNum = reservationModel.DocNum;
                    reservation.DateIssue = reservationModel.DateIssue;
                    reservation.DateReturn = reservationModel.DateReturn;
                    reservation.Cost = reservationModel.Cost;
                    reservation.Comment = reservationModel.Comment;
                }

                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<bool> DeleteReservation(int reservationId)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.Reservation reservation = db.Reservation.Where(x => x.ReservationId == reservationId).FirstOrDefault();
                if (reservation != null)
                {
                    db.Reservation.Remove(reservation);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }

     
        public async Task<List<UserModel>> GetUsers()
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                return await (from a in db.User.AsNoTracking()
                              select new UserModel
                              {
                                  UserId = a.UserId,
                                  Fio = a.Fio

                              }).ToListAsync();
            }
        }

        public async Task<List<ReservationStatusModel>> GetReservationStatuss()
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                return await (from a in db.ReservationStatus.AsNoTracking()
                              select new ReservationStatusModel
                              {
                                  ReservationStatusId = a.ReservationStatusId,
                                  Name = a.Name

                              }).ToListAsync();
            }
        }

        public async Task<List<DocTypeModel>> GetDocTypes()
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                return await (from a in db.DocType.AsNoTracking()
                              select new DocTypeModel
                              {
                                  DocTypeId = a.DocTypeId,
                                  Name = a.Name

                              }).ToListAsync();
            }
        }
    }
}