using HackDays.GraphQL.Models;
using System.Collections.Generic;
using System.Linq;

namespace HackDays.GraphQL
{
    public static class InitialData
    {
        public static void Seed(this GraphQLDBContext dbContext)
        {
            if (!dbContext.Products.Any())
            {
                dbContext.Products.AddRange(DumpProducts());
                dbContext.SaveChanges();
            }
        }

        private static List<Product> DumpProducts()
        {
            var products = new List<Product> {
                    new Product
                    {
                        Name = "Puma Red Leather Loafers Shoes",
                        Code = "Puma",
                        Description = "PUMA creates high-performance, high-style athletic shoes for men and women, with an incredible variety of classic and contemporary designs tailored to all-around athletics and casual lifestyle. All PUMA shoes are made to the highest standards of technology and quality, promising superb comfort, performance, and style.",
                        Price= new decimal(52.50),
                        Category = Category.Shoes
                    },
                    new Product
                    {
                        Name = "Hanes Women's Short Sleeve Scoopneck Tee",
                        Code = "Hanes",
                        Description = "Hanes Women's Short Sleeve Scoopneck Tee",
                        Price= new decimal(4.50),
                        Category = Category.Shirts
                    },
                    new Product
                    {
                        Name = "Duck Hooded Jacket",
                        Code = "Dickies",
                        Description = "This Genuine Dickies Men's Duck Hooded Jacket is soft and comfortable. Get one just in time for the coldest days of the year. The versatile color will match a variety of outfits. The Dickies jacket repels water, so you will be able to avoid getting soaked in the winter rains. The hidden pocket allows you to safeguard your valuables against the weather, yet still keep them within arm's reach.",
                        Price= new decimal(49.50),
                        Category = Category.Jackets
                    },
                    new Product
                    {
                        Name = "Space Dye Roll Neck Scoop",
                        Code = "Concepts",
                        Description = "This Concepts Women's Space Dye Roll Neck Scoop is so adorable! This tee is comfortable and features a cute color scheme. This is a perfect addition to your wardrobe!",
                        Price= new decimal(10.00),
                        Category = Category.Sweatshirts
                    },
                    new Product
                    {
                        Name = "Canvas Printed Weekender Duffle Handbag",
                        Code = "Faded Glory",
                        Description = "Make your weekend trips colorful and fashionable with Women's Canvas Printed Weekender Handbag. It has beautiful tribal print; it’s practical and perfect for the season. Pockets on the inside help you store your cell phone and other precious things. Choose from assorted colors and prints.",
                        Price= new decimal(18.50),
                        Category = Category.Bags
                    },
                    new Product
                    {
                        Name = "Puma Gray Textile Boat Shoes",
                        Code = "Puma",
                        Description = "PUMA creates high-performance, high-style athletic shoes for men and women, with an incredible variety of classic and contemporary designs tailored to all-around athletics and casual lifestyle. All PUMA shoes are made to the highest standards of technology and quality, promising superb comfort, performance, and style.",
                        Price= new decimal(41.50),
                        Category = Category.Shoes
                    },
                    new Product
                    {
                        Name = "Stripe V-neck",
                        Code = "No Boundaries",
                        Description = "These No Boundaries stripe V-neck shirt are great for all occasions. They're soft, comfortable, and practical. Wear it to work or for a casual day around the house. It's definitely going to be one of your favorite staples.",
                        Price= new decimal(5.50),
                        Category = Category.Shirts
                    },
                    new Product
                    {
                        Name = "L/S ComfortBlend Tee",
                        Code = "Hanes",
                        Description = "Hanes Men's L/S ComfortBlend T-shirt: Long sleeve tee in lightweight, super soft Comfortblend fabric and Big Men's sizes! Preshrunk cotton-blend fabric shrinks less, and keeps its shape. Double-needle seams for durability. No irritating tag. Washable.",
                        Price= new decimal(5.50),
                        Category = Category.Shirts
                    },
                };

            for (int i = 0; i < products.Count; i++)
            {
                products.ElementAt(i).ImageUrl = $"product/{i + 1}.jfif";
            }

            return products;
        }
    }
}
