using System;
using System.Collections.Generic;
using System.Linq;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController: ControllerBase
    {
        private readonly StoreDbContext _context;
        public ProductsController(StoreDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public  ActionResult<List<Product>> GetProducts(){
            var products=_context.Products.ToList();
            return Ok(products); 
        } 

        [HttpGet("{id}")]
        public  ActionResult<List<Product>> GetProduct(Guid id){
            var product=_context.Products.Find(id);
            return Ok(product); 
        } 
    }
}