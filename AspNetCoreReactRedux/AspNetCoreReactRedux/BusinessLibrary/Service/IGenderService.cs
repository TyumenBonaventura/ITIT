using BusinessLibrary.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public interface IGenderService
    {
        Task<List<GenderModel>> GetGenders();
        Task<bool> SaveGender(GenderModel doctype);
        Task<bool> DeleteGender(int doctypeId);
    }
}
