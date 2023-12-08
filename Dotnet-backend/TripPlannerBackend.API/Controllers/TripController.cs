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


        //Get trip By ID
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<GetTripDto>> GetTrip(int id)
        {
            try
            {
                string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var trip = await _context.Trips
                    .Include(t => t.Activities).ThenInclude(t => t.ActivityType)
                    .Include(t => t.TripType)
                    .Include(t => t.TripCountries).ThenInclude(t => t.Country)
                    .Where(t => t.IsPublic || t.UserId == userId)
                    .SingleAsync(t => t.Id == id);

                if (trip == null)
                {
                    return NotFound();
                }

                return _mapper.Map<GetTripDto>(trip);
            }
            catch (Exception ex)
            {
                return Forbid();
            }
        }


        // Get the details of a trip with a unique link
        [HttpGet("byGuid/{guid}")]
        [Authorize]
        public async Task<ActionResult<GetTripDto>> GetTripByGuid(Guid guid)
        {
            
                var trip = await _context.Trips
                    .Include(t => t.Activities).ThenInclude(t => t.ActivityType)
                    .Include(t => t.TripType)
                    .Include(t => t.TripCountries).ThenInclude(t => t.Country)
                    .FirstOrDefaultAsync(t => t.GUIDLink == guid);

                if (trip == null)
                {
                    return NotFound();
                }

                return _mapper.Map<GetTripDto>(trip);
            
        }

        // Get all the public trips
        [HttpGet]
        public async Task<ActionResult<List<GetTripDto>>> GetPublicTrips()
        {
            var trips = await _context.Trips
                .Include(t => t.Activities).ThenInclude(t => t.ActivityType)
                .Include(t => t.TripType)
                .Include(t => t.TripCountries).ThenInclude(t => t.Country)
                .Where(t => t.IsPublic)
                .ToListAsync();

            if (trips == null)
            {
                return NotFound();
            }

            return _mapper.Map<List<GetTripDto>>(trips);
        }

        // Get specific user trips
        [HttpGet("user")]
        [Authorize]
        public async Task<ActionResult<List<GetTripDto>>> GetMyTrips()
        {
           
                string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var trips = await _context.Trips.Where(t => t.UserId == userId)
                    .Include(t => t.Activities).ThenInclude(t => t.ActivityType)
                    .Include(t => t.TripType)
                    .Include(t => t.TripCountries).ThenInclude(t => t.Country)
                    .ToListAsync();

                if (trips == null)
                {
                    return NotFound();
                }

                return _mapper.Map<List<GetTripDto>>(trips);
           
        }

        //Get Search
        [HttpGet("search")]
        public ActionResult<List<GetTripDto>> SearchTrips([FromQuery] SearchTripDto searchDto)
        {
            var trips = _context.Trips

                .Include(t => t.Activities).ThenInclude(t => t.ActivityType)
                .Include(t => t.TripType)
                .Include(t => t.TripCountries).ThenInclude(t => t.Country)
                .Where(t => t.Name.ToLower().Contains(searchDto.Name.ToLower()) && t.IsPublic);


            if (trips == null)
            {
                return NotFound();
            }

            return _mapper.Map<List<GetTripDto>>(trips);
        }


        // Create a trip
        [HttpPost("create")]
        [Authorize]
        public async Task<ActionResult<GetTripDto>> AddTrip(CreateTripDto trip)
        {
            //We map the CreateTripDto to the Trip entity object
           string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            Trip tripToAdd = _mapper.Map<Trip>(trip);
            tripToAdd.GUIDLink = Guid.NewGuid(); 
            _context.Trips.Add(tripToAdd);
            await _context.SaveChangesAsync();
            GetTripDto tripToReturn = _mapper.Map<GetTripDto>(tripToAdd);

            return CreatedAtAction(nameof(GetTrip), new { id = tripToReturn.Id }, tripToReturn);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<EditTripDto>> EditTrip(int id, EditTripDto editTrip)

        {
            try
            {
                // Get trip that you want to edit
                string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var existingTrip = await _context.Trips.FindAsync(id);

                if (existingTrip == null || userId != existingTrip.UserId)
                {
                    return NotFound($"Trip with id {id} not found.");
                }

                _mapper.Map(editTrip, existingTrip);

                await _context.SaveChangesAsync();

                return Ok(editTrip);
            }
            catch (Exception ex)
            {
                // Log the exception for further analysis
                return StatusCode(500, "Internal server error");
            }
        }



        // Delete a trip
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteTrip(int id)
          {
            // Get de userId
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            
            // Get the trip
            var trip = await _context.Trips .Where(t => t.UserId == userId && t.Id == id) 
           .FirstOrDefaultAsync();


            // Trip doesn't exist
            if (trip == null)
             {
                 return NotFound("Trip does not exist or the user does not have the permissions to delete it.");
             }

              _context.Trips.Remove(trip);
              await _context.SaveChangesAsync();

            // return Ok("Trip has been successfully deleted.");
            return Ok(new { message = "Trip has been successfully deleted." }); 
        }


    }
}
