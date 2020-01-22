using BusinessLibrary.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public interface IReservationEquipmentService
    {
        Task<List<ReservationEquipmentModel>> GetReservationEquipments();
        Task<bool> SaveReservationEquipment(ReservationEquipmentModel reservationequipment);
        Task<bool> DeleteReservationEquipment(int reservationequipmentId);

        Task<List<ReservationModel>> GetReservations();
        Task<List<EquipmentModel>> GetEquipments();
    }
}
