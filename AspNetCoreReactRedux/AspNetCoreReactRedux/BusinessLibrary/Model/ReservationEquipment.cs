using DataAccessLibrary.EntityModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessLibrary.Model

{
    public class ReservationEquipmentModel
    {
        public int ReservationEquipmentId { get; set; }
        public int ReservationId { get; set; }
        public int EquipmentId { get; set; }
        public int Amount { get; set; }
        public virtual Reservation Reservation { get; set; }
        public virtual Equipment Equipment { get; set; }
    }
}
