using AutoMapper;
using TripPlannerBackend.API.Dto;
using TripPlannerBackend.DAL.Entity;

namespace TripPlannerBackend.API.Mapper
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<GetTripDto, Trip>();
            CreateMap<CreateTripDto, Trip>();
            CreateMap<Trip, GetTripDto>()
                .ForMember(dest => dest.TripType, act => act.MapFrom(src => src.TripType))
                .ForMember(d => d.Countries, act => act.MapFrom(src => src.TripCountries));
            CreateMap<Activity, GetActivityDto>()
                .ForMember(dest => dest.ActivityType, act => act.MapFrom(src => src.ActivityType.Name));
            CreateMap<GetActivityDto, Activity>();
            CreateMap<CreateActivityDto, Activity>();
            CreateMap<GetTripTypesDto, TripType>();
            CreateMap<TripType, GetTripTypesDto>();
            CreateMap<Country, GetCountryDto>();
            CreateMap<ActivityType, GetActivityTypesDto>();
            CreateMap<GetTripCountryDto, TripCountry>();
            CreateMap<TripCountry, GetTripCountryDto>()
                .ForMember(dest => dest.Name, act => act.MapFrom(src => src.Country.Name));
        }
    }
}
