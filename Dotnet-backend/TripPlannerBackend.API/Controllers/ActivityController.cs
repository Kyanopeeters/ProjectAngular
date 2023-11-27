using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        //[Authorize]
        //[Authorize(Policy = "TripReadAccess")]
        public async Task<ActionResult<GetActivityDto>> GetActivity(int id)
        {
            var activity = await _context.Activities
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
        //[Authorize]
        //[Authorize(Policy = "TripWriteAccess")]
        public async Task<ActionResult<GetActivityDto>> AddActivity(CreateActivityDto activity)
        {
            //We map the CreateTripDto to the Trip entity object
            Activity activityToAdd = _mapper.Map<Activity>(activity);
            _context.Activities.Add(activityToAdd);
            await _context.SaveChangesAsync();
            GetActivityDto activityToReturn = _mapper.Map<GetActivityDto>(activityToAdd);

            return CreatedAtAction(nameof(GetActivity), new { id = activityToReturn.Id }, activityToReturn);
        }

    }
}
