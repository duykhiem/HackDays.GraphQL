using GraphQL.Types;
using HackDays.GraphQL.GraphQL.Messaging;

namespace HackDays.GraphQL.GraphQL.Types
{
    public class ProductMutatedMessageType : ObjectGraphType<ProductMutatedMessage>
    {
        public ProductMutatedMessageType()
        {
            Field(t => t.Id);
            Field(t => t.Name);
            Field(t => t.EventType);
        }
    }
}
