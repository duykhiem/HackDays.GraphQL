using GraphQL.Types;
using HackDays.GraphQL.GraphQL.Types;
using HackDays.GraphQL.Repositories;

namespace HackDays.GraphQL.GraphQL
{
    public class ProductQuery : ObjectGraphType
    {
        public ProductQuery(ProductRepository productRepository)
        {
            Field<ListGraphType<ProductGraphType>>(
            "products",
            resolve: context => productRepository.GetAll()
);
        }
    }
}
