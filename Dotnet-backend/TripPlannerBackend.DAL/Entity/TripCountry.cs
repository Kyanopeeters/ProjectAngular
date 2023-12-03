using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlannerBackend.DAL.Entity
{
    public class TripCountry
    {
        // Id -> because the combination of TripId and CountryId is not always unique
        public int Id { get; set; }
        public int TripId { get; set; }
        public int CountryId { get; set; }
        public string CityName {  get; set; }

        public Trip? Trip { get; set; }
        public Country? Country { get; set; }
    }
}
