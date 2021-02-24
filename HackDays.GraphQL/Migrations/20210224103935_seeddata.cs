using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HackDays.GraphQL.Migrations
{
    public partial class seeddata : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Code", "Name", "Description", "Price", "Image", "Category" },
                values: new object[] { 1, "SKU-36127195", "Faded Glory Mens Canvas Twin Gore Slip-On Shoe",
                    "Use a soft bristle brush to remove any surface dirt or dust from the shoe", 14.50,
                    "http://dailyqs.ep.se/master_Front/globalassets/catalog/0060538813454_color_grey_sw_500x500", "Shoes" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
