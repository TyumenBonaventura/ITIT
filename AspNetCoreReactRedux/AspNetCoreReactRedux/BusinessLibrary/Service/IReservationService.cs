using BusinessLibrary.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public interface IReservationService
    {
        Task<List<ReservationModel>> GetReservations();
        Task<bool> SaveReservation(ReservationModel reservation);
        Task<bool> DeleteReservation(int reservationId);

        Task<List<UserModel>> GetUsers();
        Task<List<ReservationStatusModel>> GetReservationStatuss();
        Task<List<DocTypeModel>> GetDocTypes();
    }
}
