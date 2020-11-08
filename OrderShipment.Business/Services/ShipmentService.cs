using Microsoft.EntityFrameworkCore;
using OrderShipment.Data;
using OrderShipment.Data.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderShipment.Business.Services
{
    public class ShipmentService : IShipmentService
    {
        public readonly ShipmentContext _dbContext;
        public ShipmentService(ShipmentContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<List<Shipment>> GetShipmentsAsync()
        {            
            return await _dbContext.Shipments.Include(s => s.Orders).ThenInclude(order => order.Items).ToListAsync();
        }

        public async Task<Shipment> GetShipmentById(int id)
        {
            var shipment = await _dbContext.Shipments.Include(s => s.Orders).Where(s => s.ShipmentID == id).
                            FirstOrDefaultAsync();
            if (shipment == null)
                throw new KeyNotFoundException($"Shipment with Id:{id} not found");

            return shipment;
        }

        public async Task CreateShipment(Shipment shipment)
        {
            if (_dbContext.Shipments.Any(s => s.ShipmentID == shipment.ShipmentID)) return;
            
            await _dbContext.Shipments.AddAsync(shipment);

            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteShipment(int shipmentID)
        {
            // Trigger manual cascade delete
            // Shipment has MANY orders PK = ShipmentID
            // Orders has MANY items PK = OrderID FK = ShipmentID
            // Items has ONE Order PK = ItemID FK = OrderID
            var shipmentDelete = _dbContext.Shipments.SingleOrDefault(s => s.ShipmentID == shipmentID);

            var orderRows = _dbContext.Shipments.Where(s => s.ShipmentID == shipmentID)
                                .Include(s => s.Orders).SelectMany(s => s.Orders);            

            var items = orderRows.Include(o => o.Items).SelectMany(o => o.Items);

            _dbContext.Items.RemoveRange(items);
            _dbContext.Orders.RemoveRange(orderRows);
            _dbContext.Shipments.Remove(shipmentDelete);

            await _dbContext.SaveChangesAsync();
                            
        }

        public void UpdateShipment(Shipment shipment)
        {
            if (_dbContext.Shipments.Any(s => s.ShipmentID == shipment.ShipmentID))
            {
                _dbContext.Shipments.Update(shipment);
            }
            else 
                throw new KeyNotFoundException($"Shipment with Id:{shipment.ShipmentID} not found, cannot update");
        }

        public void UpdateOrder(Order order)
        {
            if(_dbContext.Orders.Any(o => o.OrderId == order.OrderId))
            {
                _dbContext.Orders.Update(order);
            }
            else
                throw new KeyNotFoundException($"Order with Id:{order.OrderId} not found, cannot update");
        }

        public List<Item> GetItemsForOrderId(int orderID)
        {
            // Below generates Inner join query
            if(_dbContext.Orders.Any(o => o.OrderId == orderID))
            {
                var items = _dbContext.Orders.Where(o => o.OrderId == orderID).Include(o => o.Items).SelectMany(o => o.Items);

                return items.ToList();
            }
            else
                throw new KeyNotFoundException($"Order with Id:{orderID} not found, cannot update");
        }

        public Order GetOrderById(int orderID)
        {
            return _dbContext.Orders.Where(o => o.OrderId == orderID).Include(o => o.Items).FirstOrDefault();
        }

        public async Task<List<Order>> GetOrdersForShipmentId(int shipmentId)
        {
            if (_dbContext.Shipments.Any(s => s.ShipmentID == shipmentId))
            {
                var orders = _dbContext.Shipments.Where(s => s.ShipmentID == shipmentId)
                            .Include(s => s.Orders).SelectMany(s => s.Orders);

                return orders.ToList();
            }

            return null;
        }

        public Shipment FindShipmentForOrder(Order order)
        {
            return _dbContext.Shipments.Where(s => s.Orders.Any(o => o.OrderId == order.OrderId)).FirstOrDefault();           
        }

    }
}
