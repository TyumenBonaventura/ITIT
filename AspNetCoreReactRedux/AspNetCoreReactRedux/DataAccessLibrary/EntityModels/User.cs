using System;
using System.Collections.Generic;

namespace DataAccessLibrary.EntityModels
{
    public partial class User
    {
        public User()
        {
            Reservation = new HashSet<Reservation>();
        }

        public int UserId { get; set; }
        public string Fio { get; set; }
        public int RoleId { get; set; }
        public string Photo { get; set; }
        public string Login { get; set; }
        public string PasswordHash { get; set; }

        public virtual Role Role { get; set; }
        public virtual ICollection<Reservation> Reservation { get; set; }
    }
}
