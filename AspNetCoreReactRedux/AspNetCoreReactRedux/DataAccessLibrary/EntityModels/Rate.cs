using System;
using System.Collections.Generic;

namespace DataAccessLibrary.EntityModels
{
    public partial class Rate
    {
        public int RateId { get; set; }
        public int DayOfWeekId { get; set; }
        public decimal Price { get; set; }
        public int EquipmentTypeId { get; set; }

        public virtual DayOfWeek DayOfWeek { get; set; }
        public virtual EquipmentType EquipmentType { get; set; }
    }
}
