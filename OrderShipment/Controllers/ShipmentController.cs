using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using OrderShipment.Business.Models;
using OrderShipment.Business.Processes.CreateShipment;
using OrderShipment.Business.Processes.UpdateShipment;
using OrderShipment.Business.Queries.GetShipments;
using OrderShipment.Business.Services;
using OrderShipment.Data;
using OrderShipment.Data.DbModels;

namespace OrderShipment.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShipmentController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ShipmentController(IMediator mediator)
        {
            _mediator = mediator;
        }
        // Retrieve all shipments
        [HttpGet]
        public async Task<IEnumerable<ShipmentResponse>> Get()
        {
            var shipmentResponse = await _mediator.Send(new GetShipmentsQuery());

            return shipmentResponse;
        }

        // Retrieve shipments by ID
        [HttpGet("{shipmentID}")]
        public async Task<Shipment> GetShipmentById([FromRoute] int shipmentID)
        {            
            return null;
        }
        

        [HttpPost("Create")]
        public IActionResult CreateShipment(CreateShipmentCommand shipment)
        {
            _mediator.Send(shipment);

            return Ok();
        }

        [HttpPut("Update")]
        public IActionResult UpdateShipment(UpdateShipmentCommand shipment)
        {
            _mediator.Send(shipment);

            return Ok();
        }
    }
}