using System;
using System.Collections.Generic;

namespace DataAccessLibrary.EntityModels
{
    public partial class DayOfWeek
    {
        public DayOfWeek()
        {
            Rate = new HashSet<Rate>();
        }

        public int DayOfWeekId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Rate> Rate { get; set; }
    }
}
