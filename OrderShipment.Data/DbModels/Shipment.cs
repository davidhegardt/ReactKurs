using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace OrderShipment.Data.DbModels
{
    public class Shipment
    {
        [Key]
        public int ShipmentID { get; set; }
        public List<Order> Orders { get; set; }
        public DateTime ShipmentDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public string Departure { get; set; }
        public string Destination { get; set; }
    }
}
