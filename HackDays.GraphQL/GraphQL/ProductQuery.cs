using GraphQL;
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

            Field<ProductGraphType>(
                "product",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id" }
                ),
                resolve: context => {
                    var id = context.GetArgument<int>("id");
                    return productRepository.GetById(id);
                }
            );
        }
    }
}
