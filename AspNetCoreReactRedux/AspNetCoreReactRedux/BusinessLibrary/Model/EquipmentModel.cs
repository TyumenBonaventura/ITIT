using DataAccessLibrary.EntityModels;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessLibrary.Model

{
    public class EquipmentModel
    {

        public int EquipmentId { get; set; }
        public string Name { get; set; }
        //    [Key]
        //    [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int EquipmentTypeId { get; set; }

        //    [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public double? Size { get; set; }

        //    [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Amount { get; set; }

        //    [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int GenderId { get; set; }
        public int AgeCategoryId { get; set; }
        public string Photo { get; set; }
    //    public bool? Hidden { get; set; }

        public virtual AgeCategory AgeCategory { get; set; }
        public virtual EquipmentType EquipmentType { get; set; }
        public virtual Gender Gender { get; set; }
        public virtual ICollection<ReservationEquipment> ReservationEquipment { get; set; }
    }
}
