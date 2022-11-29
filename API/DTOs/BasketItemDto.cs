using System;

namespace API.DTOs
{
    public class BasketItemDto
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public string  Name { get; set; }
        public long Price { get; set; }
        public string PictureUrl { get; set; }
        public string  Type { get; set; }
        public string Brand { get; set; }
    }
}