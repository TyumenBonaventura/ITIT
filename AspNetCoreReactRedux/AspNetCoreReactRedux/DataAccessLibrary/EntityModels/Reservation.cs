using System;
using System.Collections.Generic;

namespace DataAccessLibrary.EntityModels
{
    public partial class Reservation
    {
        public Reservation()
        {
            ReservationEquipment = new HashSet<ReservationEquipment>();
        }

        public int ReservationId { get; set; }
        public int UserId { get; set; }
        public int ReservationStatusId { get; set; }
        public int DocTypeId { get; set; }
        public string DocNum { get; set; }
        public DateTime DateIssue { get; set; }
        public DateTime DateReturn { get; set; }
        public decimal Cost { get; set; }
        public string Comment { get; set; }

        public virtual DocType DocType { get; set; }
        public virtual ReservationStatus ReservationStatus { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<ReservationEquipment> ReservationEquipment { get; set; }
    }
}
