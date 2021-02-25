using HackDays.GraphQL.Models;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Linq;

namespace HackDays.GraphQL.Repositories
{
    public class ProductRepository
    {
        private readonly GraphQLDBContext _context;

        public ProductRepository(IServiceScopeFactory factory)
        {
            _context = factory.CreateScope().ServiceProvider.GetRequiredService<GraphQLDBContext>();
        }

        public Product Add(Product product)
        {
            var savedProduct = (_context.Products.Add(product)).Entity;
            _context.SaveChanges();
            return savedProduct;
        }

        public bool Delete(Product product)
        {
            _context.Products.Remove(product);
            _context.SaveChanges();
            return true;
        }

        public Product GetById(int id)
        {
            return _context.Products.FirstOrDefault(i => i.Id == id);
        }

        public List<Product> GetAll()
        {
            return _context.Products.ToList();
        }

        public Product Update(Product product)
        {
            var updated = (_context.Products.Update(product)).Entity;
            _context.SaveChanges();
            return updated;
        }
    }
}
