namespace TripPlannerBackend.API.Dto
{
    public class CreateTripCountryDto
    {
        public string CityName { get; set; }
        public int TripId { get; set; }
        public int CountryId { get; set; }

    }
}
