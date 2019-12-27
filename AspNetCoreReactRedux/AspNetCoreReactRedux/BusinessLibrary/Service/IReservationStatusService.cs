using BusinessLibrary.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public interface IReservationStatusService
    {
        Task<List<ReservationStatusModel>> GetReservationStatuss();
        Task<bool> SaveReservationStatus(ReservationStatusModel reservationstatus);
        Task<bool> DeleteReservationStatus(int reservationstatusId);
    }
}
