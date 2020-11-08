using MediatR;
using OrderShipment.Business.Models;
using OrderShipment.Business.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace OrderShipment.Business.Queries.GetOrdersForShipment
{
    public class GetOrdersForShipmentHandler : IRequestHandler<GetOrdersForShipmentQuery, List<OrderResponse>>
    {
        private readonly IShipmentService _shipmentService;
        public GetOrdersForShipmentHandler(IShipmentService shipmentService)
        {
            _shipmentService = shipmentService;
        }

        public async Task<List<OrderResponse>> Handle(GetOrdersForShipmentQuery request, CancellationToken cancellationToken)
        {
            var orders = await _shipmentService.GetOrdersForShipmentId(request.ShipmentID);

            var orderResponseList = orders.Select(o => new OrderResponse()
            {
                OrderDescription = o.OrderDescription,
                OrderDate = o.OrderDate,
                OrderID = o.OrderId
            });

            return orderResponseList.ToList();
        }
    }
}
