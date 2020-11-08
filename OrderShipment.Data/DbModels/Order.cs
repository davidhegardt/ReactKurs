using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace OrderShipment.Data.DbModels
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public string OrderDescription { get; set; }
        public List<Item> Items { get; set; }
        public DateTime OrderDate { get; set; }
    }

    public class Item
    {
        [Key]
        public int ItemId { get; set; }
        public string ItemDescription { get; set; }
        public int Quantity { get; set; }
    }
}
