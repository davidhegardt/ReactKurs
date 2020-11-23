import React, { useContext } from "react";
import { ShipmentCountDisplay } from "./shipmentCountDisplay";
import ShipmentCountContext from "./ShipmentCountContext";

const ShipmentDropDown = ({ onShipmentChange }) => {
    const [loading, setLoading] = React.useState(true);
    const [shipmentList, setShipmentList] = React.useState([]);
    const [items, setItems] = React.useState([]);
    const [value, setValue] = React.useState("");
    React.useEffect(() => {
      let unmounted = false;
      async function getShipments() {
        const response = await fetch("shipment");
        const body = await response.json();
        
        if (!unmounted) {
          setItems(
            body.map((shipment) => ({
              label:
                shipment.shipmentID +
                " - " +
                shipment.departure +
                "=>" +
                shipment.destination,
              value: shipment.shipmentID,
            }))
          );
          setLoading(false);          
          setShipmentList(body);
        }
      }
      getShipments();
      return () => {
        unmounted = true;
      };
    }, []);
  
    function handleChange(e) {
      var selectShip = shipmentList.find((x) => x.shipmentID === +e);
      onShipmentChange(selectShip);
      setValue(e);
    }
  
    return (
      <div>
        <ShipmentCountDisplay />
        <label>Select Shipment to add Order to</label>
        <div className="wrapper">
          <select
            disabled={loading}
            value={value}
            onChange={(e) => handleChange(e.currentTarget.value)}
          >
            <option>-- Select Shipment --</option>
            {items.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
}

export default ShipmentDropDown;