using API.DTOs;
using API.Models;
using AutoMapper;

namespace API.Mapper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Basket,BasketDto>();
            CreateMap<BasketItem,BasketItemDto>()
                .ForMember( d => d.Name , option => option.MapFrom( s => s.Product.Name))
                .ForMember( d => d.Price , option => option.MapFrom( s => s.Product.Price))
                .ForMember( d => d.PictureUrl , option => option.MapFrom( s => s.Product.PictureUrl))
                .ForMember( d => d.Type , option => option.MapFrom( s => s.Product.Type))
                .ForMember( d => d.Brand , option => option.MapFrom( s => s.Product.Brand))
                .ForMember( d => d.Price , option => option.MapFrom( s => s.Product.Price));
        }
    }
}