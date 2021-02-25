using GraphQL;
using GraphQL.Types;
using HackDays.GraphQL.GraphQL.Types;
using HackDays.GraphQL.Models;
using HackDays.GraphQL.Repositories;

namespace HackDays.GraphQL.GraphQL
{
    public class ProductMutation : ObjectGraphType
    {
        public ProductMutation(ProductRepository productRepository)
        {
            Field<ProductGraphType>(
                "createProduct",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<ProductInputType>> { Name = "product" }),
                resolve: context =>
                {
                    var product = context.GetArgument<Product>("product");
                    product.Id = 0;
                    return productRepository.Add(product);
                }
            );

            Field<ProductGraphType>(
                "updateProduct",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ProductInputType>> { Name = "product" }),
                resolve: context =>
                {
                    var product = context.GetArgument<Product>("product");
                    var dbProduct = productRepository.GetById(product.Id);
                    if (dbProduct == null)
                    {
                        context.Errors.Add(new ExecutionError("Couldn't find product in db."));
                        return null;
                    }

                    return productRepository.Update(product);
                }
            );

            Field<BooleanGraphType>(
                "deleteproduct",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "id" }
                ),
                resolve: context => {
                    var id = context.GetArgument<int>("id");
                    return productRepository.Delete(id);
                }
            );
        }
    }
}
