using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    public class BasketController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly StoreDbContext _context;
        public BasketController(StoreDbContext context,IMapper mapper)
        {
            this._context=context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket(){
            var basket=await RetrieveBasket();

            if(basket == null) return NotFound();

            return _mapper.Map<BasketDto>(basket); ;
        }
        
        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(Guid productId ,int quantity){
            // get basket
            var basket=await RetrieveBasket();
            //create basket
            if(basket == null) basket =await CreateBasket();
            //get product 
            var product = await _context.Products.FindAsync(productId);
            if(product == null ) return NotFound();
            //add item
            basket.AddItem(product,quantity);
            //save changes
            var result = await _context.SaveChangesAsync()>0;
            if(result ) return StatusCode(201);

            return BadRequest(new ProblemDetails{Title = "Problem saving item to basket"});
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(Guid productId ,int quantity){
            // get basket
            var basket=await RetrieveBasket();
            //create basket
            if(basket == null) return NotFound();
            //remove item
            basket.RemoveItem(productId,quantity);
            //save changes
            var result = await _context.SaveChangesAsync()>0;
            if(result ) return Ok();

            return BadRequest(new ProblemDetails{Title = "Problem removing item from the basket"});
        }


        // methods
        private async Task<Basket> RetrieveBasket(){
            return await _context.Baskets
                .Include(basket => basket.Items)
                .ThenInclude(basketItem => basketItem.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private async Task<Basket> CreateBasket(){
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{
                IsEssential=true,
                Expires = DateTime.Now.AddDays(30)
            };
            Response.Cookies.Append("buyerId",buyerId,cookieOptions);
            var basket = new Basket{
                BuyerId = buyerId
            };
            await _context.Baskets.AddAsync(basket);
            return basket;
        }

    }
}