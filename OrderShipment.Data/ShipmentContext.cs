using Microsoft.EntityFrameworkCore;
using OrderShipment.Data.DbModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace OrderShipment.Data
{
    public class ShipmentContext : DbContext
    {
        public ShipmentContext(DbContextOptions<ShipmentContext> options) : base(options)
        {
        }

        public DbSet<Shipment> Shipments { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Item> Items { get; set; }
        
    }
}
