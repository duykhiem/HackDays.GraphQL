# MT1 - GraphQL Hackday project

This is a simple project to have fun with GraphQL of Hanoi Multitenant Team 1 using .Net Core, ReactJS and GraphQL.

## First run?

### Prerequisites

- Visual Studio 2019
- .Net Core 3.1
- CLI tools for Entity Framework Core: `dotnet tool install --global dotnet-ef`

### Steps to run

- At path `..\HackDays.GraphQL\HackDays.GraphQL` run `dotnet ef database update` to create the database and seed  some sample products
- Open `HackDays.GraphQL.sln`, build the solution then hit F5 :)

## Endpoints

- Application URL: <https://localhost:44354/> or <http://localhost:50308/>
- GraphQL URL: ApplicationURL/graphql
- GraphQL Playground: ApplicationURL/ui/playground
