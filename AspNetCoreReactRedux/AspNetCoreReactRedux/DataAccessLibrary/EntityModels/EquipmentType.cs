using System;
using System.Collections.Generic;

namespace DataAccessLibrary.EntityModels
{
    public partial class EquipmentType
    {
        public EquipmentType()
        {
            Equipment = new HashSet<Equipment>();
            Rate = new HashSet<Rate>();
        }

        public int EquipmentTypeId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Equipment> Equipment { get; set; }
        public virtual ICollection<Rate> Rate { get; set; }
    }
}
