using BusinessLibrary.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public interface IRateService
    {
        Task<List<RateModel>> GetRates();
        Task<bool> SaveRate(RateModel Rate);
        Task<bool> DeleteRate(int RateId);

        Task<List<DayOfWeekModel>> GetDayOfWeeks();
        Task<List<EquipmentTypeModel>> GetEquipmentTypes();
    }
}
