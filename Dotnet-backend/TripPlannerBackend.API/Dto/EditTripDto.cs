namespace TripPlannerBackend.API.Dto
{
    public class EditTripDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int TripTypeId { get; set; }
        public DateTime DepartDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public bool IsPublic { get; set; }
        public IEnumerable<EditActivityDto>? Activity { get; set; }
        public IEnumerable<EditTripCountryDto>? Country { get; set; }
    }
}