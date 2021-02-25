﻿using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HackDays.GraphQL.GraphQL.Types
{
    public class ProductInputType : InputObjectGraphType
    {
		public ProductInputType()
		{
			Name = "productInput";
			Field<NonNullGraphType<IntGraphType>>("id");
			Field<NonNullGraphType<StringGraphType>>("code");
			Field<NonNullGraphType<StringGraphType>>("name");
			Field<StringGraphType>("description");
			Field<DecimalGraphType>("price");
			Field<StringGraphType>("imageurl");
			Field<StringGraphType>("category");
		}
	}
}
