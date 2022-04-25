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
                    Description="description product 01",
                    Price=1500,
                    PictureUrl="",
                    Brand="",
                    Type="",
                    QuantityInStock=50
                },
                new Product{
                    Id=Guid.NewGuid(),
                    Name="product 02",
                    Description="description product 02",
                    Price=2000,
                    PictureUrl="",
                    Brand="",
                    Type="",
                    QuantityInStock=10
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