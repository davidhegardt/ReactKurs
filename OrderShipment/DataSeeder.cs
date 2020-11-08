using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using OrderShipment.Data;
using OrderShipment.Data.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderShipment
{
    public static class DataSeeder
    {
        public static void Init(IServiceProvider serviceProvider)
        {
            using (var context = new ShipmentContext(
               serviceProvider.GetRequiredService<
                   DbContextOptions<ShipmentContext>>()))
            {
                context.Database.EnsureCreated();
                AddMockData(context);
            }

        }
        public static void AddMockData(ShipmentContext context)
        {            
            if (context.Shipments.Any())
            {
                return;   // DB has been seeded.
            }

            var shipment = new Shipment()
            {
                Orders = GenerateOrders(),
                DeliveryDate = DateTime.Now.AddDays(20),
                Departure = "Stockholm",
                Destination = "Greenland",
                ShipmentDate = DateTime.Now,
            };

            context.Shipments.Add(shipment);

            var shipment2 = new Shipment()
            {
                Orders = GenerateOrders(),
                DeliveryDate = DateTime.Now.AddDays(20),
                Departure = "Stockholm",
                Destination = "New York",
                ShipmentDate = DateTime.Now,
            };

            context.Shipments.Add(shipment2);

            var shipment3 = new Shipment()
            {
                Orders = GenerateOrders(),
                DeliveryDate = DateTime.Now.AddDays(5),
                Departure = "Stockholm",
                Destination = "London",
                ShipmentDate = DateTime.Now,
            };

            context.Shipments.Add(shipment3);

            context.SaveChanges();
        }

        private static List<Order> GenerateOrders(int maxOrders = 10)
        {
            var orderList = new List<Order>();
            var items = GetItems();
            for (int seed = 0; seed < maxOrders; seed++)
            {
                var order = new Order()
                {
                    Items = new List<Item>() {
                        new Item() {
                            ItemDescription = items[GetRandomNumber(items.Count)],
                            Quantity = GetRandomNumber(500)
                        },
                        new Item()
                        {
                            ItemDescription = items[GetRandomNumber(items.Count)],
                            Quantity = GetRandomNumber(500)
                        },
                        new Item()
                        {
                            ItemDescription = items[GetRandomNumber(items.Count)],
                            Quantity = GetRandomNumber(500)
                        }
                    }
                ,
                    OrderDate = DateTime.Now.AddDays(seed),
                };
                var descriptions = order.Items.Select(o => o.ItemDescription);
                order.OrderDescription = $"Description for order: {string.Join(",", descriptions)}";
                orderList.Add(order);
            }



            return orderList;
        }

        private static List<string> GetItems()
        {
            return new List<string>()
            {
                "Rope",
                "Socks",
                "Beer",
                "Electronic Equipment",
                "Engine parts",
                "Orange Juice",
                "Pants",
                "Olives",
                "Mackerel",
                "Salmon"
            };
        }

        private static int GetRandomNumber(int range)
        {
            Random rnd = new Random();
            return rnd.Next(0, range);
        }
    }
}
