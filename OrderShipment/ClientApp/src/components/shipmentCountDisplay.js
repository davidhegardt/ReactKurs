import { Button, Paper } from "@material-ui/core";
import React, { useContext, useState } from "react";
import ShipmentCountContext from "./ShipmentCountContext";

export const ShipmentCountDisplay = () => {
  const shipmentCountHandler = useContext(ShipmentCountContext);

  async function update() {
    const response = await fetch("shipment/Count");
    const data = await response.json();    
    
    shipmentCountHandler.setShipmentCount({
      shipments: data.shipmentCount,
      orders: data.orderCount,
    });
    shipmentCountHandler.setUpdated(false);
  }

  return (
    <Paper>
      <div className="wrapper form-spacing-bottom">
        <p>
          Number of shipments :{" "}
          {shipmentCountHandler.countInformation.shipments}
        </p>
        <p>Number of orders : {shipmentCountHandler.countInformation.orders}</p>

        {shipmentCountHandler.updated && (
          <Button variant="contained" color="secondary" onClick={() => update()}>Update Shipment Count</Button>
        )}
      </div>
    </Paper>
  );
};
