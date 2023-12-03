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
                    new Activity(){Name="Snowboard initiatie", ActivityTypeId = 4, Price = 500, StartTime = DateTime.Parse("2023-01-21 10:30:00"), EndTime = DateTime.Parse("2023-01-21 12:00:00")},
                    new Activity(){ Name = "Heenvlucht", ActivityTypeId = 1, TransportType = "Vliegtuig", StartTime = DateTime.Parse("2023-01-21 13:00:00"), EndTime = DateTime.Parse("2023-01-21 15:00:00") },
                    new Activity(){ Name = "Overnachting in een iglo", ActivityTypeId = 5, Price = 200, StartTime = DateTime.Parse("2023-01-21 20:00:00"), EndTime = DateTime.Parse("2023-01-22 08:00:00"), City = "Winterberg" },
        
                }
                },
                new Trip {
                    Name = "Trip België",UserId = "auth0|655f9d5c022a9fc3be9f4315", TripTypeId= 2,DepartDate = DateTime.Parse("2023-03-20"), ReturnDate = DateTime.Parse("2023-03-26"), IsPublic = true, Activities = new List<Activity>()
                {
                    new Activity(){Name ="Bezoek Rubenshuis", ActivityTypeId = 2, City = "Antwerpen", Price = 20, StartTime = DateTime.Parse("2023-03-20 10:30:00"), EndTime = DateTime.Parse("2023-03-20 12:00:00")},
                    new Activity(){ Name = "Dagje Gent", ActivityTypeId = 3, City = "Gent", TransportType = "Trein", Comment = "Bezoek aan het Gravesteen is aangeraden door een vriend.",StartTime = DateTime.Parse("2023-03-22 10:30:00"), EndTime = DateTime.Parse("2023-03-22 21:00:00") },
          
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
                    new Country(){Name="Afghanistan"},
                    new Country(){Name="Albanië"},
                    new Country(){Name="Algerije"},
                    new Country(){Name="Andorra"},
                    new Country(){Name="Angola"},
                    new Country(){Name="Antigua en Barbuda"},
                    new Country(){Name="Argentinië"},
                    new Country(){Name="Armenië"},
                    new Country(){Name="Australië"},
                    new Country(){Name="Azerbeidzjan"},
                    new Country(){Name="Bahama's"},
                    new Country(){Name="Bahrein"},
                    new Country(){Name="Bangladesh"},
                    new Country(){Name="Barbados"},
                    new Country(){Name="België"},
                    new Country(){Name="Belize"},
                    new Country(){Name="Benin"},
                    new Country(){Name="Bhutan"},
                    new Country(){Name="Bolivia"},
                    new Country(){Name="Bosnië en Herzegovina"},
                    new Country(){Name="Botswana"},
                    new Country(){Name="Brazilië"},
                    new Country(){Name="Brunei"},
                    new Country(){Name="Bulgarije"},
                    new Country(){Name="Burkina Faso"},
                    new Country(){Name="Burundi"},
                    new Country(){Name="Cambodja"},
                    new Country(){Name="Canada"},
                    new Country(){Name="Centraal-Afrikaanse Republiek"},
                    new Country(){Name="Chili"},
                    new Country(){Name="China"},
                    new Country(){Name="Colombia"},
                    new Country(){Name="Comoren"},
                    new Country(){Name="Republiek Congo"},
                    new Country(){Name="Democratisch Republiek Congo"},
                    new Country(){Name="Costa Rica"},
                    new Country(){Name="Cuba"},
                    new Country(){Name="Cyprus"},
                    new Country(){Name="Denemarken"},
                    new Country(){Name="Djibouti"},
                    new Country(){Name="Dominica"},
                    new Country(){Name="Dominicaanse Republiek"},
                    new Country(){Name="Duitsland"},
                    new Country(){Name="Ecuador"},
                    new Country(){Name="Egypte"},
                    new Country(){Name="El Salvador"},
                    new Country(){Name="Equatoriaal-Guinea"},
                    new Country(){Name="Eritrea"},
                    new Country(){Name="Estland"},
                    new Country(){Name="Eswatini"},
                    new Country(){Name="Ethiopië"},
                    new Country(){Name="Fiji"},
                    new Country(){Name="Filipijnen"},
                    new Country(){Name="Finland"},
                    new Country(){Name="Frankrijk"},
                    new Country(){Name="Gabon"},
                    new Country(){Name="Gambia"},
                    new Country(){Name="Georgië"},
                    new Country(){Name="Ghana"},
                    new Country(){Name="Grenada"},
                    new Country(){Name="Griekenland"},
                    new Country(){Name="Guatemala"},
                    new Country(){Name="Guinee"},
                    new Country(){Name="Guinee-Bissau"},
                    new Country(){Name="Guyana"},
                    new Country(){Name="Haïti"},
                    new Country(){Name="Honduras"},
                    new Country(){Name="Hongarije"},
                    new Country(){Name="Ierland"},
                    new Country(){Name="IJsland"},
                    new Country(){Name="India"},
                    new Country(){Name="Indonesië"},
                    new Country(){Name="Irak"},
                    new Country(){Name="Iran"},
                    new Country(){Name="Israël"},
                    new Country(){Name="Italië"},
                    new Country(){Name="Ivoorkust"},
                    new Country(){Name="Jamaica"},
                    new Country(){Name="Japan"},
                    new Country(){Name="Jemen"},
                    new Country(){Name="Jordanië"},
                    new Country(){Name="Kaapverdië"},
                    new Country(){Name="Kameroen"},
                    new Country(){Name="Kazachstan"},
                    new Country(){Name="Kenia"},
                    new Country(){Name="Kirgizië"},
                    new Country(){Name="Kiribati"},
                    new Country(){Name="Koeweit"},
                    new Country(){Name="Kroatië"},
                    new Country(){Name="Laos"},
                    new Country(){Name="Lesotho"},
                    new Country(){Name="Letland"},
                    new Country(){Name="Libanon"},
                    new Country(){Name="Liberia"},
                    new Country(){Name="Libië"},
                    new Country(){Name="Liechtenstein"},
                    new Country(){Name="Litouwen"},
                    new Country(){Name="Luxemburg"},
                    new Country(){Name="Madagaskar"},
                    new Country(){Name="Malawi"},
                    new Country(){Name="Maldiven"},
                    new Country(){Name="Maleisië"},
                    new Country(){Name="Mali"},
                    new Country(){Name="Malta"},
                    new Country(){Name="Marokko"},
                    new Country(){Name="Marshalleilanden"},
                    new Country(){Name="Mauritanië"},
                    new Country(){Name="Mauritius"},
                    new Country(){Name="Mexico"},
                    new Country(){Name="Micronesië"},
                    new Country(){Name="Moldavië"},
                    new Country(){Name="Monaco"},
                    new Country(){Name="Mongolië"},
                    new Country(){Name="Montenegro"},
                    new Country(){Name="Mozambique"},
                    new Country(){Name="Myanmar"},
                    new Country(){Name="Namibië"},
                    new Country(){Name="Nauru"},
                    new Country(){Name="Nederland"},
                    new Country(){Name="Nepal"},
                    new Country(){Name="Nicaragua"},
                    new Country(){Name="Nieuw-Zeeland"},
                    new Country(){Name="Niger"},
                    new Country(){Name="Nigeria"},
                    new Country(){Name="Noord-Korea"},
                    new Country(){Name="Noord-Macedonië"},
                    new Country(){Name="Noorwegen"},
                    new Country(){Name="Oeganda"},
                    new Country(){Name="Oekraïne"},
                    new Country(){Name="Oezbekistan"},
                    new Country(){Name="Oman"},
                    new Country(){Name="Oostenrijk"},
                    new Country(){Name="Oost-Timor"},
                    new Country(){Name="Pakistan"},
                    new Country(){Name="Palau"},
                    new Country(){Name="Palestina"},
                    new Country(){Name="Panama"},
                    new Country(){Name="Papoea-Nieuw-Guinea"},
                    new Country(){Name="Paraguay"},
                    new Country(){Name="Peru"},
                    new Country(){Name="Polen"},
                    new Country(){Name="Portugal"},
                    new Country(){Name="Qatar"},
                    new Country(){Name="Roemenië"},
                    new Country(){Name="Rusland"},
                    new Country(){Name="Rwanda"},
                    new Country(){Name="Saint Kitts and Nevis"},
                    new Country(){Name="Saint Lucia"},
                    new Country(){Name="Saint Vincent en de Grenadines"},
                    new Country(){Name="Salomoneilanden"},
                    new Country(){Name="Samoa"},
                    new Country(){Name="San Marino"},
                    new Country(){Name="Sao Tomé en Principe"},
                    new Country(){Name="Saoedi-Arabië"},
                    new Country(){Name="Senegal"},
                    new Country(){Name="Servië"},
                    new Country(){Name="Seychellen"},
                    new Country(){Name="Sierra Leone"},
                    new Country(){Name="Singapore"},
                    new Country(){Name="Slovenië"},
                    new Country(){Name="Slowakije"},
                    new Country(){Name="Soedan"},
                    new Country(){Name="Somalië"},
                    new Country(){Name="Spanje"},
                    new Country(){Name="Sri Lankan"},
                    new Country(){Name="Suriname"},
                    new Country(){Name="Syrië"},
                    new Country(){Name="Tadzjikistan"},
                    new Country(){Name="Tanzania"},
                    new Country(){Name="Thailand"},
                    new Country(){Name="Togo"},
                    new Country(){Name="Tonga"},
                    new Country(){Name="Trinidad en Tobago"},
                    new Country(){Name="Tsjaad"},
                    new Country(){Name="Tsjechië"},
                    new Country(){Name="Tunesië"},
                    new Country(){Name="Turkije"},
                    new Country(){Name="Turkmenistan"},
                    new Country(){Name="Tuvalu"},
                    new Country(){Name="Uruguay"},
                    new Country(){Name="Vanuatu"},
                    new Country(){Name="Vaticaanstad"},
                    new Country(){Name="Venezuela"},
                    new Country(){Name="Verenigd Koninkrijk"},
                    new Country(){Name="Verenigde Arabische Emiraten"},
                    new Country(){Name="Verenigde Staten"},
                    new Country(){Name="Vietnam"},
                    new Country(){Name="Wit-Rusland"},
                    new Country(){Name="Zambia"},
                    new Country(){Name="Zimbabwe"},
                    new Country(){Name="Zuid-Afrika"},
                    new Country(){Name="Zuid-Korea"},
                    new Country(){Name="Zuid-Soedan"},
                    new Country(){Name="Zweden"},
                    new Country(){Name="Zwitserland"},



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
                    new TripCountry(){CityName = "Antwerpen", TripId = 2, CountryId = 15},
                    
                    new TripCountry(){CityName = "Winterberg", TripId = 1, CountryId = 43},
       
                    new TripCountry(){CityName = "Fontainebleau", TripId = 3, CountryId = 55},

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

