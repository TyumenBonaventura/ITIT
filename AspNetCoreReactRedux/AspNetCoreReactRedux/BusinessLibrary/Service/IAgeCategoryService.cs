using BusinessLibrary.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public interface IAgeCategoryService
    {
        Task<List<AgeCategoryModel>> GetAgeCategorys();
        Task<bool> SaveAgeCategory(AgeCategoryModel agecategory);
        Task<bool> DeleteAgeCategory(int agecategoryId);
    }
}
