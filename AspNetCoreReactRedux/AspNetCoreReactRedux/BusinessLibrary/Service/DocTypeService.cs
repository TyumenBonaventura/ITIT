using BusinessLibrary.Model;
using DataAccessLibrary.EntityModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public class DocTypeService : IDocTypeService
    {
        public async Task<List<DocTypeModel>> GetDocTypes()
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                return await (from a in db.DocType.AsNoTracking()
                              select new DocTypeModel
                              {
                                  DocTypeId = a.DocTypeId,
                                  Name = a.Name,
                                  
                              }).ToListAsync();
            }
        }

        public async Task<bool> SaveDocType(DocTypeModel doctypeModel)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.DocType doctype = db.DocType.Where
                         (x => x.DocTypeId == doctypeModel.DocTypeId).FirstOrDefault();
                if (doctype == null)
                {
                    doctype = new DocType()
                    {
                        Name = doctypeModel.Name,
                        
                    };
                    db.DocType.Add(doctype);

                }
                else
                {
                    doctype.Name = doctypeModel.Name;
                    
                }

                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<bool> DeleteDocType(int doctypeId)
        {
            using (sports_equipment_hireContext db = new sports_equipment_hireContext())
            {
                DataAccessLibrary.EntityModels.DocType doctype = db.DocType.Where(x => x.DocTypeId == doctypeId).FirstOrDefault();
                if (doctype != null)
                {
                    db.DocType.Remove(doctype);
                }
                return await db.SaveChangesAsync() >= 1;
            }
        }

    }
}