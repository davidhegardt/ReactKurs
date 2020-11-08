using System;
using System.Collections.Generic;
using System.Text;

namespace OrderShipment.Business.Models
{
    public class OrderResponse
    {
        public int OrderID { get; set; }
        public DateTime OrderDate { get; set; }
        public string OrderDescription { get; set; }
    }
}
