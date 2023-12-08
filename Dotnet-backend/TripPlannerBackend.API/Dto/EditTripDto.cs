namespace TripPlannerBackend.API.Dto
{
    public class EditTripDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string UserId { get; set; }
        public int TripTypeId { get; set; }
        public DateTime DepartDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public bool IsPublic { get; set; }
        public IEnumerable<EditTripCountryDto>? TripCountries { get; set; }
    }
}