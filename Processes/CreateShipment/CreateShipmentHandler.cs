using MediatR;
using OrderShipment.Business.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace OrderShipment.Business.Processes.CreateShipment
{
    public class CreateShipmentHandler : IRequestHandler<CreateShipmentCommand, Unit>
    {
        private readonly IShipmentService _shipmentService;
        public CreateShipmentHandler(IShipmentService shipmentService)
        {
            _shipmentService = shipmentService;
        }
        public Task<Unit> Handle(CreateShipmentCommand request, CancellationToken cancellationToken)
        {
            _shipmentService.CreateShipment(new Data.DbModels.Shipment()
            {
                DeliveryDate = request.DeliveryDate,
                Departure = request.Departure,
                Destination = request.Destination,
                Orders = request.Orders,
                ShipmentDate = request.ShipmentDate,
            });

            return Task.FromResult(Unit.Value);
        }
    }
}
