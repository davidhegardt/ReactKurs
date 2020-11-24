using MediatR;
using OrderShipment.Business.Processes.CreateShipment;
using OrderShipment.Business.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace OrderShipment.Business.Processes.UpdateShipment
{
    public class UpdateShipmentHandler : IRequestHandler<UpdateShipmentCommand, Unit>
    {
        private readonly IShipmentService _shipmentService;
        public UpdateShipmentHandler(IShipmentService shipmentService)
        {
            _shipmentService = shipmentService;
        }
        public async Task<Unit> Handle(UpdateShipmentCommand request, CancellationToken cancellationToken)
        {
            var shipment = await _shipmentService.GetShipmentById(request.ShipmentID);

            shipment.Orders.Add(request.NewOrder);

            await _shipmentService.UpdateShipment(new Data.DbModels.Shipment()
            {
                DeliveryDate = shipment.DeliveryDate,
                Departure = shipment.Departure,
                Destination = shipment.Destination,
                Orders = shipment.Orders,
                ShipmentDate = shipment.ShipmentDate,
                ShipmentID = request.ShipmentID
            });

            return await Task.FromResult(Unit.Value);
        }
    }
}
