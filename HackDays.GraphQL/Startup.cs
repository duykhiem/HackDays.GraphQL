using GraphQL.Server;
using GraphQL.Types;
using HackDays.GraphQL.GraphQL;
using HackDays.GraphQL.GraphQL.Messaging;
using HackDays.GraphQL.GraphQL.Types;
using HackDays.GraphQL.Models;
using HackDays.GraphQL.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;


namespace HackDays.GraphQL
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<GraphQLDBContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("GraphQLDatabase")));

            services.AddScoped<ProductGraphType>();
            services.AddScoped<CategoryGraphType>();
            services.AddScoped<ProductInputType>();
            services.AddScoped<ProductMutatedMessageType>();

            services.AddScoped<ProductRepository>();
            services.AddSingleton<MessagingService>();
            services.AddScoped<ProductQuery>();
            services.AddScoped<ProductMutation>();
            services.AddScoped<ProductSubscription>();

            services.AddScoped<ProductSchema>();


            services.AddLogging(builder => builder.AddConsole());
            services.AddHttpContextAccessor();

            services.AddGraphQL(options =>
            {
                options.EnableMetrics = true;
            })
            .AddErrorInfoProvider(opt => opt.ExposeExceptionStackTrace = true)
            .AddSystemTextJson()
            .AddUserContextBuilder(httpContext => new GraphQLUserContext { User = httpContext.User })
            .AddWebSockets()
            .AddDataLoader();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, GraphQLDBContext context)
        {
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // app.UseHttpsRedirection();

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseWebSockets();
            app.UseGraphQLWebSockets<ProductSchema>();

            // add http for Schema at default url /graphql
            app.UseGraphQL<ProductSchema>();

            // use graphql-playground at default url /ui/playground
            app.UseGraphQLPlayground();

            context.Seed();

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
