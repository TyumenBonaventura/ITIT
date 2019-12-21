using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DataAccessLibrary.EntityModels
{
    public partial class sports_equipment_hireContext : DbContext
    {
        public sports_equipment_hireContext()
        {
        }

        public sports_equipment_hireContext(DbContextOptions<sports_equipment_hireContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AgeCategory> AgeCategory { get; set; }
        public virtual DbSet<DayOfWeek> DayOfWeek { get; set; }
        public virtual DbSet<DocType> DocType { get; set; }
        public virtual DbSet<Equipment> Equipment { get; set; }
        public virtual DbSet<EquipmentType> EquipmentType { get; set; }
        public virtual DbSet<Gender> Gender { get; set; }
        public virtual DbSet<Rate> Rate { get; set; }
        public virtual DbSet<Reservation> Reservation { get; set; }
        public virtual DbSet<ReservationEquipment> ReservationEquipment { get; set; }
        public virtual DbSet<ReservationStatus> ReservationStatus { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=tcp:sports-equipment-hire-dbserver.database.windows.net,1433;Initial Catalog=sports_equipment_hire_db;Persist Security Info=False;User ID=adm1n;Password=IT!t2019;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }
        /*Data Source=DESKTOP-CRGN3IK;Initial Catalog=sports_equipment_hire;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False*/
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<AgeCategory>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<DayOfWeek>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<DocType>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Equipment>(entity =>
            {
                entity.Property(e => e.AgeCategoryId).HasColumnName("AgeCategory_Id");

                entity.Property(e => e.EquipmentTypeId).HasColumnName("EquipmentType_Id");

                entity.Property(e => e.GenderId).HasColumnName("Gender_Id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(75);

                entity.Property(e => e.Photo).HasMaxLength(150);

                entity.HasOne(d => d.AgeCategory)
                    .WithMany(p => p.Equipment)
                    .HasForeignKey(d => d.AgeCategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Equipment_Age_Category");

                entity.HasOne(d => d.EquipmentType)
                    .WithMany(p => p.Equipment)
                    .HasForeignKey(d => d.EquipmentTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Equipment_Equipment_Type");

                entity.HasOne(d => d.Gender)
                    .WithMany(p => p.Equipment)
                    .HasForeignKey(d => d.GenderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Equipment_Gender");
            });

            modelBuilder.Entity<EquipmentType>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Gender>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Rate>(entity =>
            {
                entity.Property(e => e.DayOfWeekId).HasColumnName("DayOfWeek_Id");

                entity.Property(e => e.EquipmentTypeId).HasColumnName("EquipmentType_Id");

                entity.Property(e => e.Price).HasColumnType("money");

                entity.HasOne(d => d.DayOfWeek)
                    .WithMany(p => p.Rate)
                    .HasForeignKey(d => d.DayOfWeekId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rate_Day_Of_Week");

                entity.HasOne(d => d.EquipmentType)
                    .WithMany(p => p.Rate)
                    .HasForeignKey(d => d.EquipmentTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rate_Equipment_Type");
            });

            modelBuilder.Entity<Reservation>(entity =>
            {
                entity.Property(e => e.Comment).HasMaxLength(140);

                entity.Property(e => e.Cost).HasColumnType("money");

                entity.Property(e => e.DateIssue).HasColumnType("date");

                entity.Property(e => e.DateReturn).HasColumnType("date");

                entity.Property(e => e.DocNum)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.DocTypeId).HasColumnName("DocType_Id");

                entity.Property(e => e.ReservationStatusId).HasColumnName("ReservationStatus_Id");

                entity.Property(e => e.UserId).HasColumnName("User_Id");

                entity.HasOne(d => d.DocType)
                    .WithMany(p => p.Reservation)
                    .HasForeignKey(d => d.DocTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Reservation_Doc_Type");

                entity.HasOne(d => d.ReservationStatus)
                    .WithMany(p => p.Reservation)
                    .HasForeignKey(d => d.ReservationStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Reservation_Reservation_Status");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Reservation)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Reservation_User");
            });

            modelBuilder.Entity<ReservationEquipment>(entity =>
            {
                entity.HasKey(e => new { e.ReservationId, e.EquipmentId })
                    .HasName("PK_Reservation_Equipment");

                entity.Property(e => e.ReservationId).HasColumnName("Reservation_Id");

                entity.Property(e => e.EquipmentId).HasColumnName("Equipment_Id");

                entity.HasOne(d => d.Equipment)
                    .WithMany(p => p.ReservationEquipment)
                    .HasForeignKey(d => d.EquipmentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Reservation_Equipment_Equipment");

                entity.HasOne(d => d.Reservation)
                    .WithMany(p => p.ReservationEquipment)
                    .HasForeignKey(d => d.ReservationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Reservation_Equipment_Reservation");
            });

            modelBuilder.Entity<ReservationStatus>(entity =>
            {
                entity.Property(e => e.Comment).HasMaxLength(140);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Fio)
                    .IsRequired()
                    .HasColumnName("FIO")
                    .HasMaxLength(100);

                entity.Property(e => e.Login).HasMaxLength(50);

                entity.Property(e => e.PasswordHash).HasMaxLength(100);

                entity.Property(e => e.Photo).HasMaxLength(100);

                entity.Property(e => e.RoleId).HasColumnName("Role_Id");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Role");
            });
        }
    }
}
