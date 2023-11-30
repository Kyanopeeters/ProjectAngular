using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripPlannerBackend.DAL.Entity
{
    public class Activity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TripId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        //public object? Document { get; set; }
        public double? Price { get; set; }
        public string? StreetName { get; set; }
        public string? StreetNr { get; set; }
        public string? City { get; set; }
        public string? PostalCode { get; set; }
        public string? Country {  get; set; }
        public string? Comment { get; set; }
        public string? TransportType { get;set; }
        public double? Distance {  get; set; }
        public int ActivityTypeId { get; set; }

        public Trip Trip { get; set; }
        public ActivityType? ActivityType { get; set; }
    }
}
