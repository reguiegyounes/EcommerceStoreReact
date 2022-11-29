using System;
using System.Linq;
using System.Collections.Generic;

namespace API.Models
{
    public class Basket
    {
        public Guid Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; }=new();

        public void AddItem(Product product,int quantity){
            var existingItem=Items.FirstOrDefault(item => item.ProductId == product.Id);
            if(existingItem == null) Items.Add(new BasketItem{
                    Quantity= quantity,
                    Product=product
            });
            else existingItem.Quantity += quantity;
        }

        public void RemoveItem(Product product,int quantity){
            var item=Items.FirstOrDefault(item => item.ProductId == product.Id);
            if(item == null) return;
            item.Quantity -= quantity;
            if(item.Quantity == 0) Items.Remove(item);
        }
    }
}