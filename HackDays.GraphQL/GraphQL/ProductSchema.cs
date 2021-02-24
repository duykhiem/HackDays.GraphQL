using GraphQL.Types;
using GraphQL.Utilities;
using System;

namespace HackDays.GraphQL.GraphQL
{
    public class ProductSchema: Schema
    {
        public ProductSchema(IServiceProvider provider)
            : base(provider)
        {
            Query = provider.GetRequiredService<ProductQuery>();
        }
    }
}
