using System;
using System.Collections.Generic;

namespace DataAccessLibrary.EntityModels
{
    public partial class Gender
    {
        public Gender()
        {
            Equipment = new HashSet<Equipment>();
        }

        public int GenderId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Equipment> Equipment { get; set; }
    }
}
