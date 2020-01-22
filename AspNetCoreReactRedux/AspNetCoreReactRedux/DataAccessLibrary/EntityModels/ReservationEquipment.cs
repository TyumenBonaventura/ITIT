using System;
using System.Collections.Generic;

namespace DataAccessLibrary.EntityModels
{
    public partial class ReservationEquipment
    {
        public int ReservationEquipmentId { get; set; }
        public int ReservationId { get; set; }
        public int EquipmentId { get; set; }
        public int Amount { get; set; }

        public virtual Equipment Equipment { get; set; }
        public virtual Reservation Reservation { get; set; }
    }
}
