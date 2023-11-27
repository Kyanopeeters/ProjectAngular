using Azure;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlannerBackend.DAL.Entity
{
    public class Trip
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserId { get; set; }
        public DateTime DepartDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public bool IsPublic { get; set; }
        public int TripTypeId { get; set; }
        public ICollection<Activity>? Activities { get; set; } = new List<Activity>();

        public ICollection<TripCountry> TripCountries { get; set; } = new List<TripCountry>();

        public TripType TripType { get; set; }


    }
}
