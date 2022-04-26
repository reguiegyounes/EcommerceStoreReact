using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult<List<Product>>> GetProducts(){
            var products=await _context.Products.ToListAsync();
            return Ok(products); 
        } 

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Product>>> GetProduct(Guid id){
            var product=await _context.Products.FindAsync(id);
            return Ok(product); 
        } 
    }
}