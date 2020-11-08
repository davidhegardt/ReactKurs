using System;
using System.Collections.Generic;
using System.Text;

namespace OrderShipment.Business.Models
{
    public class ShipmentResponse
    {
        public int ShipmentID { get; set; }
        public List<int> OrderNumbers { get; set; }
        public DateTime ShipmentDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public string Departure { get; set; }
        public string Destination { get; set; }
    }
}
