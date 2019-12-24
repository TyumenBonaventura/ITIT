using BusinessLibrary.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public interface IEquipmentTypeService
    {
        Task<List<EquipmentTypeModel>> GetEquipmentTypes();
        Task<bool> SaveEquipmentType(EquipmentTypeModel equipmenttype);
        Task<bool> DeleteEquipmentType(int equipmenttypeId);
    }
}
