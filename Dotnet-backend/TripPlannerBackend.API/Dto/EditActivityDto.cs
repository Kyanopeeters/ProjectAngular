namespace TripPlannerBackend.API.Dto
{
    public class EditActivityDto
    {
        public string? Name { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public int? Price { get; set; }
        public string? StreetName { get; set; }
        public string? StreetNr { get; set; }
        public string? City { get; set; }
        public string? PostalCode { get; set; }
        public string? Country { get; set; }
        public string? Comment { get; set; }
        public string? TransportType { get; set; }
        public int? Distance { get; set; }
        public int ActivityTypeId { get; set; }
    }
}