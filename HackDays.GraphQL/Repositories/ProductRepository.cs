using HackDays.GraphQL.Models;
using System.Collections.Generic;

namespace HackDays.GraphQL.Repositories
{
    public class ProductRepository
    {
        public List<Product> GetAll()
        {
            var products = new List<Product>();
            products.Add(new Product
            {
                Id = 1,
                Name = "Name1",
                Code = "Code1",
                Description = "Description1",
                Price= 10,
                Image = "Image",
                Category = Category.Shoes
            });
            return products;
        }
    }
}
