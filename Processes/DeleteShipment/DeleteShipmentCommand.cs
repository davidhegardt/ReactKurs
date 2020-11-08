using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace OrderShipment.Business.Processes.DeleteShipment
{
    public class DeleteShipmentCommand : IRequest<Unit>
    {
        public int ShipmentID { get; set; }
    }
}
