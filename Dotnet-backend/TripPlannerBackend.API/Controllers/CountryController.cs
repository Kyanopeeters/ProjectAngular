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

    public class CountryController : Controller
    {
        private readonly TripPlannerDbContext _context;
        private readonly IMapper _mapper;
        public CountryController(TripPlannerDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }



        // Get ALL countries
        [HttpGet]

        public async Task<ActionResult<List<GetCountryDto>>> getCountries()
        {
            var countries = await _context.Countries.ToListAsync();

            if (countries == null)
            {
                return NotFound();
            }

            return _mapper.Map<List<GetCountryDto>>(countries);
        }

    }
}
