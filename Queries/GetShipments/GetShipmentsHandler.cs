using MediatR;
using OrderShipment.Business.Models;
using OrderShipment.Business.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace OrderShipment.Business.Queries.GetShipments
{
    public class GetShipmentsHandler : IRequestHandler<GetShipmentsQuery, List<ShipmentResponse>>
    {
        private readonly IShipmentService _shipmentService;
        public GetShipmentsHandler(IShipmentService shipmentService)
        {
            _shipmentService = shipmentService;
        }
        public async Task<List<ShipmentResponse>> Handle(GetShipmentsQuery request, CancellationToken cancellationToken)
        {
            var shipments = await _shipmentService.GetShipmentsAsync();

            var shipmentResponseList = new List<ShipmentResponse>();

            foreach(var shipment in shipments)
            {
                var orderIDs = shipment.Orders.Select(o => o.OrderId).ToList();
                shipmentResponseList.Add(new ShipmentResponse()
                {
                    DeliveryDate = shipment.DeliveryDate,
                    Departure = shipment.Departure,
                    Destination = shipment.Destination,
                    OrderNumbers = orderIDs,
                    ShipmentDate = shipment.ShipmentDate,
                    ShipmentID = shipment.ShipmentID
                });
            }

            return shipmentResponseList;
        }
    }
}
