import React, { Component } from "react";
import { render } from "react-dom";
import Loader from "react-loader-spinner";
import { OrderTable } from "./OrderTable";
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
    return <ShipmentTable shipmentSend={dataToSend} />;
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>
          <Loader />
        </em>
      </p>
    ) : (
      this.renderShipmentTableComponent()
    );

    return (
      <div>
        <h1 id="tabelLabel">CQSS Shipment Manager</h1>
        <p>This component demonstrates fetching data from the server.</p>
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
