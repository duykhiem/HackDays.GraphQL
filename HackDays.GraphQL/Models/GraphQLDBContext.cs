using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;

namespace HackDays.GraphQL.Models
{
    public class GraphQLDBContext : DbContext
    {
        public GraphQLDBContext()
        {
        }

        public GraphQLDBContext(DbContextOptions<GraphQLDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Product> Products { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
                   .SetBasePath(Directory.GetCurrentDirectory())
                   .AddJsonFile("appsettings.json")
                   .Build();
                var connectionString = configuration.GetConnectionString("GraphQLDatabase");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Code);

                entity.Property(e => e.Name);

                entity.Property(e => e.Description);

                entity.Property(e => e.ImageUrl);

                entity.Property(e => e.Price);

                entity.Property(e => e.Category)
                .HasMaxLength(50)
                .HasConversion(
                    c => c.ToString(),
                    c => (Category)Enum.Parse(typeof(Category), c))
                .IsUnicode(false);
            });
        }
    }
}
