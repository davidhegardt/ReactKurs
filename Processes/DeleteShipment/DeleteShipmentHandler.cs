using MediatR;
using OrderShipment.Business.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace OrderShipment.Business.Processes.DeleteShipment
{
    public class DeleteShipmentHandler : IRequestHandler<DeleteShipmentCommand, Unit>
    {
        private readonly IShipmentService _shipmentService;
        public DeleteShipmentHandler(IShipmentService shipmentService)
        {
            _shipmentService = shipmentService;
        }
        public async Task<Unit> Handle(DeleteShipmentCommand request, CancellationToken cancellationToken)
        {
            await _shipmentService.DeleteShipment(request.ShipmentID);

            return await Task.FromResult(Unit.Value);
        }        
    }
}
