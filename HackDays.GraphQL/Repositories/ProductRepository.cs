using HackDays.GraphQL.Models;
using System.Collections.Generic;

namespace HackDays.GraphQL.Repositories
{
    public class ProductRepository
    {
        public List<Product> GetAll()
        {
            return new List<Product>() {
                new Product
                {
                    Id = 1,
                    Name = "Puma Red Leather Loafers Shoes",
                    Code = "Puma",
                    Description = "PUMA creates high-performance, high-style athletic shoes for men and women, with an incredible variety of classic and contemporary designs tailored to all-around athletics and casual lifestyle. All PUMA shoes are made to the highest standards of technology and quality, promising superb comfort, performance, and style.",
                    Price= new decimal(52.50),
                    Image = "http://dailyqs.ep.se/develop_Front/globalassets/catalog/i55peckyx0457_p698442_500x500",
                    Category = Category.Shoes
                },
                new Product
                {
                    Id = 2,
                    Name = "Hanes Women's Short Sleeve Scoopneck Tee",
                    Code = "Hanes",
                    Description = "Hanes Women's Short Sleeve Scoopneck Tee",
                    Price= new decimal(4.50),
                    Image = "http://dailyqs.ep.se/develop_Front/globalassets/catalog/0007871545602_color_amaranth_sw_500x500",
                    Category = Category.Shirts
                },
                new Product
                {
                    Id = 3,
                    Name = "Duck Hooded Jacket",
                    Code = "Dickies",
                    Description = "This Genuine Dickies Men's Duck Hooded Jacket is soft and comfortable. Get one just in time for the coldest days of the year. The versatile color will match a variety of outfits. The Dickies jacket repels water, so you will be able to avoid getting soaked in the winter rains. The hidden pocket allows you to safeguard your valuables against the weather, yet still keep them within arm's reach.",
                    Price= new decimal(49.50),
                    Image = "http://dailyqs.ep.se/develop_Front/globalassets/catalog/0076125374738_color_timber_sw_500x500",
                    Category = Category.Jackets
                },
                new Product
                {
                    Id = 4,
                    Name = "Space Dye Roll Neck Scoop",
                    Code = "Concepts",
                    Description = "This Concepts Women's Space Dye Roll Neck Scoop is so adorable! This tee is comfortable and features a cute color scheme. This is a perfect addition to your wardrobe!",
                    Price= new decimal(10.00),
                    Image = "http://dailyqs.ep.se/develop_Front/globalassets/catalog/0072654751769_color_blue-combo_sw_500x5003",
                    Category = Category.Sweatshirts
                },
                new Product
                {
                    Id = 11,
                    Name = "Puma Red Leather Loafers Shoes",
                    Code = "Puma",
                    Description = "PUMA creates high-performance, high-style athletic shoes for men and women, with an incredible variety of classic and contemporary designs tailored to all-around athletics and casual lifestyle. All PUMA shoes are made to the highest standards of technology and quality, promising superb comfort, performance, and style.",
                    Price= new decimal(52.50),
                    Image = "http://dailyqs.ep.se/develop_Front/globalassets/catalog/i55peckyx0457_p698442_500x500",
                    Category = Category.Shoes
                },
                new Product
                {
                    Id = 22,
                    Name = "Hanes Women's Short Sleeve Scoopneck Tee",
                    Code = "Hanes",
                    Description = "Hanes Women's Short Sleeve Scoopneck Tee",
                    Price= new decimal(4.50),
                    Image = "http://dailyqs.ep.se/develop_Front/globalassets/catalog/0007871545602_color_amaranth_sw_500x500",
                    Category = Category.Shirts
                },
            };
        }
    }
}
