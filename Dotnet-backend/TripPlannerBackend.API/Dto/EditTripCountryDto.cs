namespace TripPlannerBackend.API.Dto
{
    public class EditTripCountryDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? CityName { get; set; }
        public int TripId { get; set; }
        public int CountryId { get; set; }

    }
}
