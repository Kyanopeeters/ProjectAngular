using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlannerBackend.DAL.Entity
{
    public class TripCountry
    {
        public int TripId { get; set; }
        public int CountryId { get; set; }
        public string CityName {  get; set; }

        public Trip? Trip { get; set; }
        public Country? Country { get; set; }
    }
}
