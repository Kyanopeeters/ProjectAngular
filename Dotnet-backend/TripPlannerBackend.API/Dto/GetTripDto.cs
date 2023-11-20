using TripPlannerBackend.DAL.Entity;

namespace TripPlannerBackend.API.Dto
{
    public class GetTripDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public GetTripTypesDto TripType { get; set; }

        public DateTime DepartDate { get; set; }

        public DateTime ReturnDate { get; set; }
        public bool IsPublic { get; set; }

        public IEnumerable<GetTripCountryDto> Countries { get; set; }

        public IEnumerable<GetActivityDto>? Activities { get; set; }

    }
}
