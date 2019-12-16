using System;
using System.Collections.Generic;

namespace DataAccessLibrary.EntityModels
{
    public partial class Equipment
    {
        public Equipment()
        {
            ReservationEquipment = new HashSet<ReservationEquipment>();
        }

        public int EquipmentId { get; set; }
        public string Name { get; set; }
        public int EquipmentTypeId { get; set; }
        public double? Size { get; set; }
        public int Amount { get; set; }
        public int GenderId { get; set; }
        public int AgeCategoryId { get; set; }
        public string Photo { get; set; }
        public bool? Hidden { get; set; }

        public virtual AgeCategory AgeCategory { get; set; }
        public virtual EquipmentType EquipmentType { get; set; }
        public virtual Gender Gender { get; set; }
        public virtual ICollection<ReservationEquipment> ReservationEquipment { get; set; }
    }
}
