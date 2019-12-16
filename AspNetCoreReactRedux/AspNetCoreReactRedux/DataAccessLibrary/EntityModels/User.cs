using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
     //   [Key]
     //   [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int RoleId { get; set; }
     //   [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Photo { get; set; }
     //   [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Login { get; set; }
    //    [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string PasswordHash { get; set; }

        public virtual Role Role { get; set; }
        public virtual ICollection<Reservation> Reservation { get; set; }
    }
}
