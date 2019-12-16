using System;
using System.Collections.Generic;

namespace DataAccessLibrary.EntityModels
{
    public partial class ReservationStatus
    {
        public ReservationStatus()
        {
            Reservation = new HashSet<Reservation>();
        }

        public int ReservationStatusId { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }

        public virtual ICollection<Reservation> Reservation { get; set; }
    }
}
