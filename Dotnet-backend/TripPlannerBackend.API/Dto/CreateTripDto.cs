namespace TripPlannerBackend.API.Dto
{
    public class CreateTripDto
    {
        public string Name { get; set; }
        public int TripTypeId { get; set; }
        public DateTime DepartDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public bool IsPublic { get; set; }
        public IEnumerable<CreateActivityDto>? Activity { get; set; }
        public IEnumerable<CreateTripCountryDto> Country { get; set; }

    }
}
