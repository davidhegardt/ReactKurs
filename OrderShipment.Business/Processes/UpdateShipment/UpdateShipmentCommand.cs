using MediatR;
using OrderShipment.Data.DbModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace OrderShipment.Business.Processes.UpdateShipment
{
    public class UpdateShipmentCommand : IRequest<Unit>
    {
        public int ShipmentID { get; set; }
        public List<Order> Orders { get; set; }
        public DateTime ShipmentDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public string Departure { get; set; }
        public string Destination { get; set; }
    }
}
