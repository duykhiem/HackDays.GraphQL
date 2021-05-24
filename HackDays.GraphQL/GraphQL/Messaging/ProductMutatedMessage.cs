using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HackDays.GraphQL.GraphQL.Messaging
{
    public class ProductMutatedMessage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string EventType { get; set; }
    }
}
