using BusinessLibrary.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public interface IDocTypeService
    {
        Task<List<DocTypeModel>> GetDocTypes();
        Task<bool> SaveDocType(DocTypeModel doctype);
        Task<bool> DeleteDocType(int doctypeId);
    }
}
