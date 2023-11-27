namespace TripPlannerBackend.API.Dto
{
    public class EditTripCountryDto
    {
        public string? Name { get; set; }
        public int TripId { get; set; }
        public int CountryId { get; set; }

    }
}
