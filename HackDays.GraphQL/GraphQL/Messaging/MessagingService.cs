using HackDays.GraphQL.Models;
using System;
using System.Reactive.Linq;
using System.Reactive.Subjects;

namespace HackDays.GraphQL.GraphQL.Messaging
{
    public class MessagingService
    {
        private readonly ISubject<ProductMutatedMessage> _messageStream = new ReplaySubject<ProductMutatedMessage>(1);

        public ProductMutatedMessage AddProductMutatedMessage(Product product, string eventType)
        {
            var message = new ProductMutatedMessage
            {
                Id = product.Id,
                Name = product.Name,
                EventType= eventType
            };
            _messageStream.OnNext(message);
            return message;
        }

        public IObservable<ProductMutatedMessage> GetMessages()
        {
            return _messageStream.AsObservable();
        }
    }
}
