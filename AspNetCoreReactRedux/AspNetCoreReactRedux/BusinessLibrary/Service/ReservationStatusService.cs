using BusinessLibrary.Model;
using DataAccessLibrary.EntityModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public class ReservationStatusService : IReservationStatusService
    {
        public async Task<List<ReservationStatusModel>> GetReservationStatuss()
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                return await (from a in db.ReservationStatus.AsNoTracking()
                              select new ReservationStatusModel
                              {
                                  ReservationStatusId = a.ReservationStatusId,
                                  Name = a.Name,
                                  Comment = a.Comment,

                              }).ToListAsync();
            }
        }

        public async Task<bool> SaveReservationStatus(ReservationStatusModel reservationstatusModel)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.ReservationStatus reservationstatus = db.ReservationStatus.Where
                         (x => x.ReservationStatusId == reservationstatusModel.ReservationStatusId).FirstOrDefault();
                if (reservationstatus == null)
                {
                    reservationstatus = new ReservationStatus()
                    {
                        Name = reservationstatusModel.Name,
                        Comment = reservationstatusModel.Comment,

                    };
                    db.ReservationStatus.Add(reservationstatus);

                }
                else
                {
                    reservationstatus.Name = reservationstatusModel.Name;
                    reservationstatus.Comment = reservationstatusModel.Comment;

                }

                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<bool> DeleteReservationStatus(int reservationstatusId)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.ReservationStatus reservationstatus = db.ReservationStatus.Where(x => x.ReservationStatusId == reservationstatusId).FirstOrDefault();
                if (reservationstatus != null)
                {
                    db.ReservationStatus.Remove(reservationstatus);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }
    }
}