using System;
using System.Collections.Generic;
using System.Text;

namespace OrderShipment.Business.Models
{
    public class CountResponse
    {
        public int OrderCount { get; set; }
        public int ShipmentCount { get; set; }
    }
}
