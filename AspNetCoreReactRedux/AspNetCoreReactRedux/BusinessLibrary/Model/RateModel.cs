using DataAccessLibrary.EntityModels;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessLibrary.Model

{
    public class RateModel
    {

        public int RateId { get; set; }
        public int DayOfWeekId { get; set; }
        public decimal Price { get; set; }
        public int EquipmentTypeId { get; set; }

        public virtual DayOfWeek DayOfWeek { get; set; }
        public virtual EquipmentType EquipmentType { get; set; }
    }
}
