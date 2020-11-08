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
    public class UpdateShipmentHandler : IRequestHandler<CreateShipmentCommand, Unit>
    {
        private readonly IShipmentService _shipmentService;
        public UpdateShipmentHandler(IShipmentService shipmentService)
        {
            _shipmentService = shipmentService;
        }
        public Task<Unit> Handle(CreateShipmentCommand request, CancellationToken cancellationToken)
        {
            _shipmentService.UpdateShipment(new Data.DbModels.Shipment()
            {
                DeliveryDate = request.DeliveryDate,
                Departure = request.Departure,
                Destination = request.Destination,
                Orders = request.Orders,
                ShipmentDate = request.ShipmentDate,
                ShipmentID = request.ShipmentID
            });

            return Task.FromResult(Unit.Value);
        }
    }
}
