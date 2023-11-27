using TripPlannerBackend.DAL.Entity;

namespace TripPlannerBackend.DAL.Initializer
{
    public class DBInitializer
    {
        public static void Initialize(TripPlannerDbContext context)
        {
            context.Database.EnsureCreated();

            if(!context.TripTypes.Any())
            {
                context.Database.EnsureCreated();

                var triptypes = new TripType[]
                {
                    new TripType(){Name="Wintervakantie"},
                    new TripType(){Name="Citytrip"},
                    new TripType(){Name="Natuurvakantie"},
                    new TripType(){Name="Strandvakantie"}
                };

                foreach (TripType t in triptypes)
                {
                    context.TripTypes.Add(t);
                }
                context.SaveChanges();
            }

            if (!context.ActivityTypes.Any())
            {
                context.Database.EnsureCreated();

                var activitytypes = new ActivityType[]
                {
                    new ActivityType(){Name="Verplaatsing"},
                    new ActivityType(){Name="Museumbezoek"},
                    new ActivityType(){Name="Cultuur activiteit"},
                    new ActivityType(){Name="Sport activiteit"},
                    new ActivityType(){Name="Natuur onderdompeling"},
                };

                foreach (ActivityType t in activitytypes)
                {
                    context.ActivityTypes.Add(t);
                }
                context.SaveChanges();
            }

            // Seed the Trips table with some dummy data
            if (!context.Trips.Any())
            {
                var trips = new Trip[]
                {
                new Trip {
                    Name = "Skieën in Duitsland", UserId = "auth0|655b48b2c90bf30f6a12291a", TripTypeId= 1,DepartDate = DateTime.Parse("2023-01-20"), ReturnDate = DateTime.Parse("2023-01-29"), IsPublic = false, Activities = new List<Activity>()
                {
                    new Activity(){Name="Snowboard initiatie", ActivityTypeId = 4, Price = 500, StartTime = DateTime.Parse("2023-01-21"), EndTime = DateTime.Parse("2023-01-21")},
                    new Activity(){ Name = "Heenvlucht", ActivityTypeId = 1, TransportType = "Vliegtuig" },
                    new Activity(){ Name = "Overnachting in een iglo", ActivityTypeId = 5, Price = 200, City = "Winterberg" },
        
                }
                },
                new Trip {
                    Name = "Trip België",UserId = "auth0|655f9d5c022a9fc3be9f4315", TripTypeId= 2,DepartDate = DateTime.Parse("2023-03-20"), ReturnDate = DateTime.Parse("2023-03-26"), IsPublic = true, Activities = new List<Activity>()
                {
                    new Activity(){Name ="Bezoek Rubenshuis", ActivityTypeId = 2, City = "Antwerpen", Price = 20, },
                    new Activity(){ Name = "Dagje Gent", ActivityTypeId = 3, City = "Gent", TransportType = "Trein", Comment = "Bezoek aan het Gravesteen is aangeraden door een vriend." },
          
                }
                },
                new Trip {
                    Name = "Trip Frankrijk", UserId = "auth0|655b48b2c90bf30f6a12291a", TripTypeId= 3,DepartDate = DateTime.Parse("2024-02-01"), ReturnDate = DateTime.Parse("2024-02-10"), IsPublic = true, Activities = new List<Activity>()
                {
                    new Activity(){Name="Boswandeling", ActivityTypeId = 5},
                    new Activity(){ Name = "Kajakken op de rivier", ActivityTypeId = 4, TransportType = "Kajak", Price = 25, Distance = 30,  },
        
                }
                },
               };

                foreach (Trip t in trips)
                {
                    context.Trips.Add(t);
                }

                context.SaveChanges();
            }

            if (!context.Countries.Any())
            {
                context.Database.EnsureCreated();

                var countries = new Country[]
                {
                    new Country(){Name="België"},
                    new Country(){Name="USA"},
                    new Country(){Name="UK"},
                    new Country(){Name="Frankrijk"},
                    new Country(){Name="Duitsland"},
                };

                foreach (Country t in countries)
                {
                    context.Countries.Add(t);
                }
                context.SaveChanges();
            }

            if (!context.TripCountries.Any())
            {
                context.Database.EnsureCreated();

                var tripcountries = new TripCountry[]
                {
                    new TripCountry(){CityName = "Antwerpen", TripId = 2, CountryId = 1},
                    
                    new TripCountry(){CityName = "Winterberg", TripId = 1, CountryId = 5},
       
                    new TripCountry(){CityName = "Fontainebleau", TripId = 3, CountryId = 4},

                };

                foreach (TripCountry t in tripcountries)
                {
                    context.TripCountries.Add(t);
                }
                context.SaveChanges();
            }

            
        }
    }
}

