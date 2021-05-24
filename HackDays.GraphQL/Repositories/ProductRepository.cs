using HackDays.GraphQL.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace HackDays.GraphQL.Repositories
{
    public class ProductRepository
    {
        private readonly GraphQLDBContext _context;

        public ProductRepository(GraphQLDBContext context)
        {
            _context = context;
        }

        public Product Add(Product product)
        {
            var savedProduct = (_context.Products.Add(product)).Entity;
            _context.SaveChanges();
            return savedProduct;
        }

        public bool Delete(int id)
        {
            var product = _context.Products.FirstOrDefault(i => i.Id == id);
            _context.Products.Remove(product);
            _context.SaveChanges();
            return true;
        }

        public Product GetById(int id)
        {
            return _context.Products.AsNoTracking().FirstOrDefault(i => i.Id == id);
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
