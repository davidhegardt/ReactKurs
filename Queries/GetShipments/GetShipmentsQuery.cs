using MediatR;
using OrderShipment.Business.Models;
using OrderShipment.Data.DbModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace OrderShipment.Business.Queries.GetShipments
{
    public class GetShipmentsQuery : IRequest<List<ShipmentResponse>>
    {
    }
}
