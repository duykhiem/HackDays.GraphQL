using GraphQL.Types;
using HackDays.GraphQL.Models;

namespace HackDays.GraphQL.GraphQL.Types
{
    public class ProductGraphType : ObjectGraphType<Product>
    {
        public ProductGraphType()
        {
            Field(t => t.Id);
            Field(t => t.Code).Description("The code of the product");
            Field(t => t.Name).Description("The name of the product");
            Field(t => t.Description).Description("The description of the product");
            Field(t => t.Price).Description("The price of the product");
            Field(t => t.ImageUrl).Description("The image URL of the product");
            Field<CategoryGraphType>("Category", "The category of product");
        }
    }
}
