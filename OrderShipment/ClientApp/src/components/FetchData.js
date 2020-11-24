import React, { Component } from "react";
import { render } from "react-dom";
import Loader from "react-loader-spinner";
import { ErrorBoundaryHandler } from "./ErrorBoundaryHandler";
import { OrderTable } from "./OrderTable";
import { ShipmentCountDisplay } from "./shipmentCountDisplay";
import { ShipmentTable } from "./ShipmentTable";

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { shipments: [], loading: true };
  }

  componentDidMount() {
    this.populateShipmentData();
  }

  renderShipmentTableComponent() {
    var dataToSend = this.state.shipments.map((ship) => ({
      shipmentID: ship.shipmentID,
      shipmentDate: ship.shipmentDate,
      departure: ship.departure,
      destination: ship.destination,
      orders: ship.orders,
    }));
    return <ErrorBoundaryHandler><ShipmentTable shipmentSend={dataToSend} /> </ErrorBoundaryHandler>;
  }

  render() {
    let contents = this.state.loading ? (      
        <em>
          <Loader />
        </em>      
    ) : (
      this.renderShipmentTableComponent()
    );

    return (
      <div>
        <h1 id="tabelLabel">CQSS Shipment Manager</h1>
        This component demonstrates fetching data from the server.
        <ShipmentCountDisplay />
        {contents}
      </div>
    );
  }

  async populateShipmentData() {
    const response = await fetch("shipment");
    const data = await response.json();
    this.setState({ shipments: data, loading: false });
  }
}
