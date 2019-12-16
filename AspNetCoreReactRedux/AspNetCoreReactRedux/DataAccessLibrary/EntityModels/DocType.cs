using System;
using System.Collections.Generic;

namespace DataAccessLibrary.EntityModels
{
    public partial class DocType
    {
        public DocType()
        {
            Reservation = new HashSet<Reservation>();
        }

        public int DocTypeId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Reservation> Reservation { get; set; }
    }
}
