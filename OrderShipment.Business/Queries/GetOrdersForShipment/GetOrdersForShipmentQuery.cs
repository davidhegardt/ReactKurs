using MediatR;
using OrderShipment.Business.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OrderShipment.Business.Queries.GetOrdersForShipment
{
    public class GetOrdersForShipmentQuery : IRequest<List<OrderResponse>>
    {
        public int ShipmentID { get; set; }
    }
}
