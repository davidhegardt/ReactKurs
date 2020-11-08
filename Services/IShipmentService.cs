using OrderShipment.Data.DbModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderShipment.Business.Services
{
    public interface IShipmentService
    {
        Task CreateShipment(Shipment shipment);
        Task<Shipment> GetShipmentById(int id);
        Task<List<Shipment>> GetShipmentsAsync();
        void UpdateShipment(Shipment shipment);
        Task<List<Order>> GetOrdersForShipmentId(int shipmentId);
        void UpdateOrder(Order order);
        List<Item> GetItemsForOrderId(int orderID);
        Order GetOrderById(int orderID);
        Shipment FindShipmentForOrder(Order order);
        Task DeleteShipment(int shipmentID);
    }
}