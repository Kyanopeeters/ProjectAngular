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

    public class ActivityController : Controller
    {
        private readonly TripPlannerDbContext _context;
        private readonly IMapper _mapper;
        public ActivityController(TripPlannerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Get ALL activityTypes
        [HttpGet("Types")]
        public async Task<ActionResult<List<GetActivityTypesDto>>> getActivityTypes()
        {
            var activityTypes = await _context.ActivityTypes.ToListAsync();

            if (activityTypes == null)
            {
                return NotFound();
            }

            return _mapper.Map<List<GetActivityTypesDto>>(activityTypes);
        }

        //Get activity By ID
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<GetActivityDto>> GetActivity(int id)
        {

            var activity = await _context.Activities.OrderBy(t => t.StartTime)
                .Include(t => t.ActivityType)
                                .SingleAsync(t => t.Id == id);


            if (activity == null)
            {
                return NotFound();
            }

            return _mapper.Map<GetActivityDto>(activity);
        }

        // Create an activity
        [HttpPost("create")]
        [Authorize]
        public async Task<ActionResult<GetActivityDto>> AddActivity(CreateActivityDto activity)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            //We map the CreateTripDto to the Trip entity object
            Activity activityToAdd = _mapper.Map<Activity>(activity);
            _context.Activities.Add(activityToAdd);
            await _context.SaveChangesAsync();
            GetActivityDto activityToReturn = _mapper.Map<GetActivityDto>(activityToAdd);

            return CreatedAtAction(nameof(GetActivity), new { id = activityToReturn.Id }, activityToReturn);
        }

        // Delete an activity
        [HttpDelete("{id}")]
        //[Authorize]
        public async Task<IActionResult> DeleteActivity(int id)
        {
            // Get de userId
            //string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            // Get the activity
            var activity = await _context.Activities.Where(t => t.Id == id)
           .FirstOrDefaultAsync();


            // Activity doesn't exist
            if (activity == null)
            {
                return NotFound("Activity does not exist or the user does not have the permissions to delete it.");
            }

            _context.Activities.Remove(activity);
            await _context.SaveChangesAsync();

            // return Ok("Activity has been successfully deleted.");
            return Ok(new { message = "Activity has been successfully deleted." });
        }


        // Update an activity
        [HttpPut("{id}")]
        //[Authorize]
        public async Task<ActionResult<EditActivityDto>> EditActivity(int id, EditActivityDto editActivity)
        {
            try
            {
                // Get trip that you want to edit
                int tripId = editActivity.TripId;
                var existingActivity = await _context.Activities.FindAsync(id);

                if (existingActivity == null || tripId != existingActivity.TripId)
                {
                    return NotFound($"Activity with id {id} not found.");
                }

                _mapper.Map(editActivity, existingActivity);

                await _context.SaveChangesAsync();

                return Ok(editActivity);
            }
            catch (Exception ex)
            {
                // Log the exception for further analysis
                return StatusCode(500, "Internal server error");
            }
        }


    }
}
