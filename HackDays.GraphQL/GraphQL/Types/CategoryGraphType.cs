using GraphQL.Types;
using HackDays.GraphQL.Models;

namespace HackDays.GraphQL.GraphQL.Types
{
    public class CategoryGraphType : EnumerationGraphType<Category>
    {
        public CategoryGraphType()
        {
            Name = "Category";
            Description = "The category of product";
        }
    }
}
