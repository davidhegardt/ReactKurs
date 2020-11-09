import React, { Component } from 'react';
import { render } from 'react-dom';
import Loader from 'react-loader-spinner';
import { OrderTable } from './OrderTable';
import { ShipmentTable } from './ShipmentTable';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    //this.state = { forecasts: [], loading: true };
    this.state = { shipments: [], loading: true, loadNext: false, currentOrderID: 0};
  }

  componentDidMount() {
    this.populateShipmentData();
  }

  renderShipmentsTable(shipments) {
    return shipments.map((shipment, index)=> {

      return (        
        <table className='table table-striped' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>ShipmentID</th>
              <th>Departure Date</th>
              <th>Departure</th>
              <th>Destination</th>
            </tr>
          </thead>
          <tbody>            
              <tr key={shipment.shipmentID} onClick={() => this.getOrdersForShipment(shipment.shipmentID)}>
                <td>{shipment.shipmentID}</td>
                <td>{shipment.shipmentDate}</td>              
                <td>{shipment.departure}</td>
                <td>{shipment.destination}</td>
              </tr>
          </tbody>          
        </table>        
      );
    });    
  }

  renderShipmentTableComponent(){
    var dataToSend  = this.state.shipments.map(ship => ({ shipmentID: ship.shipmentID, shipmentDate: ship.shipmentDate, departure : ship.departure, destination : ship.destination }));
    return (
      <ShipmentTable shipmentSend={dataToSend} />
    )
  }

  render() {
    let contents = this.state.loading
      ? <p><em><Loader /></em></p>
      //: this.renderShipmentsTable(this.state.shipments);
      : this.renderShipmentTableComponent();

    return (
      <div>
        <h1 id="tabelLabel" >CQSS Shipment Manager</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
        {this.state.loadNext ? (
          <OrderTable orderID={this.state.currentOrderID} />
          ) : (
        <div>Order data here</div>
        )}
      </div>
    );
  }

  async populateShipmentData() {
    const response = await fetch('shipment');
    const data = await response.json();
    this.setState({ shipments: data, loading: false });
  }

  getOrdersForShipment(shipmentID){
    console.log(shipmentID);
    //FetchData.setState({render:OrderTable}); 
    this.setState({ loadNext : true});
    this.setState({currentOrderID: shipmentID});
  }

  async testControllerData() {
    const response = await fetch('shipment');
    const data = await response.json();
    console.log(data);
  }

}

