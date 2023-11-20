using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TripPlannerBackend.API.Dto;
using TripPlannerBackend.DAL;
using TripPlannerBackend.DAL.Entity;

namespace TripPlannerBackend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripController : ControllerBase
    {
        private readonly TripPlannerDbContext _context;
        private readonly IMapper _mapper;
        public TripController(TripPlannerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }



        //Search - everyone is allowed to search

        //Get By ID
        [HttpGet("{id}")]
        [Authorize]
        //[Authorize(Policy = "TripReadAccess")]
        public async Task<ActionResult<GetTripDto>> GetTrip(int id)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var trip = await _context.Trips.Include(t => t.Activities).ThenInclude(t => t.ActivityType)
                .Include(t => t.TripType)
                .Include(t => t.TripCountries).ThenInclude(t => t.Country)
                .SingleAsync(t => t.Id == id);

            if (trip == null)
            {
                return NotFound();
            }

            return _mapper.Map<GetTripDto>(trip);
        }

        // Get ALL
        [HttpGet]
        //[Authorize]
        //[Authorize(Policy = "TripReadAccess")]
        public async Task<ActionResult<List<GetTripDto>>> GetPublicTrips()
        {
            var trips = await _context.Trips
                .Where(t => t.IsPublic)
                .Include(t => t.Activities).Include(t => t.TripType).ToListAsync();

            if (trips == null)
            {
                return NotFound();
            }

            return _mapper.Map<List<GetTripDto>>(trips);
        }

        // Get specific user trips
        [HttpGet("user")]
        [Authorize]
        //[Authorize(Policy = "TripReadAccess")]
        public async Task<ActionResult<List<GetTripDto>>> GetMyTrips()
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var trips = await _context.Trips
                .Where(t => t.UserId == userId)
                .Include(t => t.Activities).Include(t => t.TripType).ToListAsync();

            if (trips == null)
            {
                return NotFound();
            }

            return _mapper.Map<List<GetTripDto>>(trips);
        }

        //Get Search
        [HttpGet("search")]
        //[Authorize]
        //[Authorize(Policy = "TripReadAccess")]
        public ActionResult<List<GetTripDto>> SearchTrips([FromQuery] SearchTripDto searchDto)
        {
            var trips = _context.Trips.Include(t => t.Activities).Where(t =>
            t.Name.ToLower().Contains(searchDto.Name.ToLower()));

            if (trips == null)
            {
                return NotFound();
            }

            return _mapper.Map<List<GetTripDto>>(trips);
        }

        //Insert - you have to be authenticated
        [HttpPost]
        [Authorize]
        //[Authorize(Policy = "TripWriteAccess")]
        public async Task<ActionResult<GetTripDto>> AddTrip(CreateTripDto trip)
        {
            //We map the CreateTripDto to the Trip entity object
            Trip tripToAdd = _mapper.Map<Trip>(trip);
            _context.Trips.Add(tripToAdd);
            await _context.SaveChangesAsync();
            GetTripDto tripToReturn = _mapper.Map<GetTripDto>(tripToAdd);

            return CreatedAtAction(nameof(GetTrip), new { id = tripToReturn.Id }, tripToReturn);
        }

    }
}
