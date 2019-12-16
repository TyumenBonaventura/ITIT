using System;
using System.Collections.Generic;

namespace DataAccessLibrary.EntityModels
{
    public partial class AgeCategory
    {
        public AgeCategory()
        {
            Equipment = new HashSet<Equipment>();
        }

        public int AgeCategoryId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Equipment> Equipment { get; set; }
    }
}
