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
                    new TripType(){Name="TripType 1"},
                    new TripType(){Name="TripType 2"},
                    new TripType(){Name="TripType 3"},
                };

                foreach (TripType t in triptypes)
                {
                    context.TripTypes.Add(t);
                }
                context.SaveChanges();
            }

            /*if (!context.ActiviteitTypes.Any())
            {
                context.Database.EnsureCreated();

                var activiteittypes = new ActiviteitType[]
                {
                    new ActiviteitType(){Id = 1, Naam ="ActiviteitType 1"},
                    new ActiviteitType(){Id = 2, Naam ="ActiviteitType 2"},
                    new ActiviteitType(){Id = 3, Naam ="ActiviteitType 3"},
                };

                foreach (ActiviteitType t in activiteittypes)
                {
                    context.ActiviteitTypes.Add(t);
                }
                context.SaveChanges();
            }*/

            if (!context.ActivityTypes.Any())
            {
                context.Database.EnsureCreated();

                var activitytypes = new ActivityType[]
                {
                    new ActivityType(){Name="ActiviteitType 1"},
                    new ActivityType(){Name="ActiviteitType 2"},
                    new ActivityType(){Name="ActiviteitType 3"},
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
                    Name = "Trip 1", UserId = "auth0|655b48b2c90bf30f6a12291a", TripTypeId= 1,DepartDate = DateTime.Parse("2018-01-20"), ReturnDate = DateTime.Parse("2018-01-20"), IsPublic = true, Activities = new List<Activity>()
                {
                    new Activity(){Name="Activity 1", ActivityTypeId = 1},
                    new Activity(){ Name = "Activity 2", ActivityTypeId = 1 },
                    new Activity(){ Name = "Activity 3", ActivityTypeId = 1 },
                    new Activity () { Name = "Activity 4", ActivityTypeId = 1 }
                }
                },
                new Trip {
                    Name = "Trip België",UserId = "google-oauth2|102632323615991971585", TripTypeId= 2,DepartDate = DateTime.Parse("2018-01-20"), ReturnDate = DateTime.Parse("2018-01-20"), IsPublic = true, Activities = new List<Activity>()
                {
                    new Activity(){Name ="Activity 1", ActivityTypeId = 1},
                    new Activity(){ Name = "Activity 2", ActivityTypeId = 1 },
                    new Activity(){ Name = "Activity 3", ActivityTypeId = 1 },
                    new Activity () { Name = "Activity 4", ActivityTypeId = 1 }
                }
                },
                new Trip {
                    Name = "Trip Frankrijk", UserId = "auth0|655b48b2c90bf30f6a12291a", TripTypeId= 3,DepartDate = DateTime.Parse("2018-01-20"), ReturnDate = DateTime.Parse("2018-01-20"), IsPublic = true, Activities = new List<Activity>()
                {
                    new Activity(){Name="Activity 1", ActivityTypeId = 1},
                    new Activity(){ Name = "Activity 2", ActivityTypeId = 1 },
                    new Activity(){ Name = "Activity 3", ActivityTypeId = 1 },
                    new Activity () { Name = "Activity 4", ActivityTypeId = 1 }
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
                    new TripCountry(){CityName = "Antwerpen", TripId = 1, CountryId = 1},
                    new TripCountry(){CityName = "Los Angeles", TripId = 1, CountryId = 2},
                    new TripCountry(){CityName = "London", TripId = 1, CountryId = 3},
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

