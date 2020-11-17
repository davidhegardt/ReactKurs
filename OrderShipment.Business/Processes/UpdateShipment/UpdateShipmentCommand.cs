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
        public Order NewOrder { get; set; }
        
    }
}
