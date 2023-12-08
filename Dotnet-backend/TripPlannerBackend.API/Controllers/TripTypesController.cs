using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TripPlannerBackend.API.Dto;
using TripPlannerBackend.DAL;

namespace TripPlannerBackend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripTypesController: ControllerBase
    {
        private readonly TripPlannerDbContext _context;
        private readonly IMapper _mapper;
        public TripTypesController(TripPlannerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Get all trip types
        [HttpGet]
        public async Task<ActionResult<List<GetTripTypesDto>>> GetTripsTypes()
        {
            var tripTypes = await _context.TripTypes.ToListAsync();

            if (tripTypes == null)
            {
                return NotFound();
            }

            return _mapper.Map<List<GetTripTypesDto>>(tripTypes);

        }
    }
}
