using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController: BaseApiController
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
            if(product==null) return NotFound();
            return Ok(product); 
        } 
    }
}