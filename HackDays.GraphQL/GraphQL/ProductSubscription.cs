using GraphQL.Resolvers;
using GraphQL.Types;
using HackDays.GraphQL.GraphQL.Messaging;
using HackDays.GraphQL.GraphQL.Types;

namespace HackDays.GraphQL.GraphQL
{
    public class ProductSubscription : ObjectGraphType
    {
        public ProductSubscription(MessagingService messagingService)
        {
            AddField(new EventStreamFieldType
            {
                Name = "productMutated",
                Type = typeof(ProductMutatedMessageType),
                Resolver = new FuncFieldResolver<ProductMutatedMessage>(c => c.Source as ProductMutatedMessage),
                Subscriber = new EventStreamResolver<ProductMutatedMessage>(c => messagingService.GetMessages())
            });
        }
    }
}
