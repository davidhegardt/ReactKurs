using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrderShipment.Business.Models;
using OrderShipment.Business.Queries.GetOrdersForShipment;
using OrderShipment.Business.Services;
using OrderShipment.Data.DbModels;

namespace OrderShipment.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IMediator _mediator;

        public OrderController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public Order GetOrder([FromRoute]int orderID)
        {
            return null;
        }

        [HttpGet("{shipmentID}")]
        public async Task<IEnumerable<OrderResponse>> GetOrdersForShipmentId([FromRoute]int shipmentID)
        {
            var orderResponse = await _mediator.Send(new GetOrdersForShipmentQuery()
            {
                ShipmentID = shipmentID
            });
            return orderResponse;
        }
    }
}