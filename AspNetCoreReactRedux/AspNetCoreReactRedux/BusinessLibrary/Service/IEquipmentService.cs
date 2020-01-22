using BusinessLibrary.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public interface IEquipmentService
    {
        Task<List<EquipmentModel>> GetEquipments();
        Task<bool> SaveEquipment(EquipmentModel equipment);
        Task<bool> DeleteEquipment(int equipmentId);

        Task<List<AgeCategoryModel>> GetAgeCategorys();
        Task<List<EquipmentTypeModel>> GetEquipmentTypes();
        Task<List<GenderModel>> GetGenders();
    //    Task<List<ReservationEquipmentModel>> GetReservationEquipments();

    }
}
