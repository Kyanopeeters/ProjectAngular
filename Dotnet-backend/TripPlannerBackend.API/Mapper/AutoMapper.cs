using AutoMapper;
using TripPlannerBackend.API.Dto;
using TripPlannerBackend.DAL.Entity;

namespace TripPlannerBackend.API.Mapper
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            // Get trips
            CreateMap<GetTripDto, Trip>();
            CreateMap<Trip, GetTripDto>()
                .ForMember(dest => dest.TripType, act => act.MapFrom(src => src.TripType))
                .ForMember(d => d.TripCountries, act => act.MapFrom(src => src.TripCountries));

            // Create trips
            CreateMap<CreateTripDto, Trip>()
            .ForMember(dest => dest.Activities, act => act.MapFrom(src => src.Activity))
            .ForMember(d => d.TripCountries, act => act.MapFrom(src => src.Country));
            CreateMap<Trip, CreateTripDto>()
                .ForMember(dest => dest.Activity, act => act.MapFrom(src => src.Activities))
                .ForMember(d => d.Country, act => act.MapFrom(src => src.TripCountries));

            // Create tripCountry
            CreateMap<CreateTripCountryDto, TripCountry>();
            CreateMap<TripCountry, CreateTripCountryDto>()
                .ForMember(d => d.TripId, a => a.MapFrom(src => src.Trip.Id));

            //  Get tripType
            CreateMap<GetTripTypesDto, TripType>();
            CreateMap<TripType, GetTripTypesDto>();

            //  Get activity
            CreateMap<GetActivityDto, Activity>();
            CreateMap<Activity, GetActivityDto>()
                .ForMember(dest => dest.ActivityType, act => act.MapFrom(src => src.ActivityType.Name));

            // Create activity
            CreateMap<CreateActivityDto, Activity>();

            // Get Country
            CreateMap<Country, GetCountryDto>();

            // Get activityType
            CreateMap<ActivityType, GetActivityTypesDto>();

            // Get tripCountry
            CreateMap<GetTripCountryDto, TripCountry>();
            CreateMap<TripCountry, GetTripCountryDto>()
                .ForMember(dest => dest.Name, act => act.MapFrom(src => src.Country.Name));
            CreateMap<EditTripDto, Trip>();

        }
    }
}
