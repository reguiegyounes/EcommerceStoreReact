using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Data
{
    public static class DbInitializer
    {
        public async static Task Initailize(StoreDbContext context){
            if (context.Products.Any()) return;

            var products=new List<Product>(){
                new Product{
                    Id=Guid.NewGuid(),
                    Name="product 01",
                    Description="description product 01 Noak slim premium recycled fabric waistcoat in stone micro texture with two-way stretch",
                    Price=1500,
                    PictureUrl="/images/01.jpg",
                    Brand="Zara",
                    Type="",
                    QuantityInStock=50
                },
                new Product{
                    Id=Guid.NewGuid(),
                    Name="product 02",
                    Description="description product 02  waistcoat in stone micro texture with two-way stretch",
                    Price=2000,
                    PictureUrl="/images/02.jpg",
                    Brand="dsd",
                    Type="",
                    QuantityInStock=10
                },
                new Product{
                    Id=Guid.NewGuid(),
                    Name="product 03",
                    Description="description product 03",
                    Price=2540,
                    PictureUrl="/images/03.jpg",
                    Brand="livee",
                    Type="",
                    QuantityInStock=45
                },
                new Product{
                    Id=Guid.NewGuid(),
                    Name="product 04",
                    Description="description product 04 kjflkj rffcd premium recycled fabric waistcoat in stone micro texture with two-way stretch",
                    Price=1550,
                    PictureUrl="/images/04.jpg",
                    Brand="Zara",
                    Type="",
                    QuantityInStock=2
                },
                new Product{
                    Id=Guid.NewGuid(),
                    Name="product 05",
                    Description="description product 05",
                    Price=450,
                    PictureUrl="/images/05.jpg",
                    Brand="livee",
                    Type="",
                    QuantityInStock=80
                },
                new Product{
                    Id=Guid.NewGuid(),
                    Name="product 06",
                    Description="description product 06 kjlksf hhf shffks sfhsfh",
                    Price=3000,
                    PictureUrl="/images/06.jpg",
                    Brand="dsd",
                    Type="",
                    QuantityInStock=03
                }
            };
            foreach (var product in products)
            {
                await context.Products.AddAsync(product);
            }
            await context.SaveChangesAsync();
        }
    }
}