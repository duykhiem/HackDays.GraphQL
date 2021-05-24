using GraphQL;
using GraphQL.Types;
using HackDays.GraphQL.GraphQL.Messaging;
using HackDays.GraphQL.GraphQL.Types;
using HackDays.GraphQL.Models;
using HackDays.GraphQL.Repositories;

namespace HackDays.GraphQL.GraphQL
{
    public class ProductMutation : ObjectGraphType
    {
        public ProductMutation(ProductRepository productRepository, MessagingService messagingService)
        {
            Field<ProductGraphType>(
                "createProduct",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<ProductInputType>> { Name = "product" }),
                resolve: context =>
                {
                    var product = productRepository.Add(context.GetArgument<Product>("product"));

                    messagingService.AddProductMutatedMessage(product, "created");

                    return product;
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
                        context.Errors.Add(new ExecutionError("Couldn't find product in database."));
                        return null;
                    }

                    var updatedProduct = productRepository.Update(product);

                    messagingService.AddProductMutatedMessage(product, "updated");

                    return updatedProduct;
                }
            );

            Field<BooleanGraphType>(
                "deleteProduct",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "id" }
                ),
                resolve: context => {
                    var id = context.GetArgument<int>("id");
                    var product = productRepository.GetById(id);
                    if (product == null)
                    {
                        context.Errors.Add(new ExecutionError("Couldn't find product in db."));
                        return false;
                    }

                    productRepository.Delete(id);

                    messagingService.AddProductMutatedMessage(product, "deleted");

                    return true;
                }
            );
        }
    }
}
