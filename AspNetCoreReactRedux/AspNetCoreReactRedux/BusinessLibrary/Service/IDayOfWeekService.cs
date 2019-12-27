using BusinessLibrary.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public interface IDayOfWeekService
    {
        Task<List<DayOfWeekModel>> GetDayOfWeeks();
        Task<bool> SaveDayOfWeek(DayOfWeekModel dayofweek);
        Task<bool> DeleteDayOfWeek(int dayofweekId);
    }
}
