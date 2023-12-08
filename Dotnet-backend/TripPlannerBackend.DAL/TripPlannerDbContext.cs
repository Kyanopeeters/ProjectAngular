using Microsoft.EntityFrameworkCore;
using TripPlannerBackend.DAL.Entity;

namespace TripPlannerBackend.DAL
{
    public class TripPlannerDbContext : DbContext
    {
        public TripPlannerDbContext()
        {

        }

        public TripPlannerDbContext(DbContextOptions<TripPlannerDbContext> options) : base(options)
        {
        }
        public DbSet<Activity> Activities => Set<Activity>();
        public DbSet<ActivityType> ActivityTypes => Set<ActivityType>();
        public DbSet<Country> Countries => Set<Country>();
        public DbSet<Trip> Trips => Set<Trip>();
        public DbSet<TripType> TripTypes => Set<TripType>();
        public DbSet<TripCountry> TripCountries => Set<TripCountry>();





        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Trip>()
               .HasMany(e => e.Activities)
               .WithOne(e => e.Trip)
               .HasForeignKey(e => e.TripId)
               .IsRequired();

            modelBuilder.Entity<TripType>()
                .HasMany(e => e.Trips)
                .WithOne(e => e.TripType)
                .HasForeignKey(e => e.TripTypeId)
                .IsRequired();

            modelBuilder.Entity<ActivityType>()
                .HasMany(e => e.Activities)
                .WithOne(e => e.ActivityType)
                .HasForeignKey(e => e.ActivityTypeId)
                .IsRequired();

            modelBuilder.Entity<TripCountry>()
             .HasKey(tl => tl.Id);

            modelBuilder.Entity<TripCountry>()
                .HasIndex(tl => tl.Id)  
                .IsUnique();

            modelBuilder.Entity<TripCountry>()
                .HasOne(tl => tl.Trip)
                .WithMany(t => t.TripCountries)
                .HasForeignKey(tl => tl.TripId)
                .IsRequired();

            modelBuilder.Entity<TripCountry>()
                .HasOne(tl => tl.Country)
                .WithMany(t => t.TripCountries)
                .HasForeignKey(tl => tl.CountryId)
                .IsRequired();

            modelBuilder.Entity<Trip>().ToTable("Trip");
            modelBuilder.Entity<Activity>().ToTable("Activity");
            modelBuilder.Entity<ActivityType>().ToTable("ActivityType");
            modelBuilder.Entity<Country>().ToTable("Country");
            modelBuilder.Entity<Trip>().ToTable("Trip");
            modelBuilder.Entity<TripType>().ToTable("TripType");



        }
    }
}