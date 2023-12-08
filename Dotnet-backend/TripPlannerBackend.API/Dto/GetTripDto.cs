using TripPlannerBackend.DAL.Entity;

namespace TripPlannerBackend.API.Dto
{
    public class GetTripDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserId { get; set; }
        public GetTripTypesDto TripType { get; set; }

        public DateTime DepartDate { get; set; }

        public DateTime ReturnDate { get; set; }
        public bool IsPublic { get; set; }
        public Guid GUIDLink { get; set; }

        public IEnumerable<GetTripCountryDto> TripCountries { get; set; }

        public IEnumerable<GetActivityDto>? Activities { get; set; }

    }
}
