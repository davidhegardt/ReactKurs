import React, { Component } from 'react';
import { render } from 'react-dom';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    //this.state = { forecasts: [], loading: true };
    this.state = { shipments: [], loading: true, loadNext: false, currentOrderID: 0};
  }

  componentDidMount() {
    this.populateShipmentData();
    //this.testControllerData();
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

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderShipmentsTable(this.state.shipments);

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

class OrderTable extends React.Component {

  constructor(props){
     super(props);
     console.log(this.props.orderID);
     this.state = {orders: [], loadingOrder: true}; 
   }

   componentDidMount(){
     this.populateOrderData(this.props.orderID);
   }

  render(){

    let contents = this.state.loadingOrder
      ? <p><em>Loading...</em></p>
      : this.renderOrdersTable(this.state.orders);

    return <div>
      <h1>Order Table</h1> {this.props.orderID}
      {contents}
    </div>
  }

  renderOrdersTable(orders){
    return orders.map((order, index)=> {

      return (        
        <table className='table table-striped' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>OrderID</th>
              <th>Order Date</th>
              <th>Order Description</th>              
            </tr>
          </thead>
          <tbody>            
              <tr key={order.orderID}>
                <td>{order.orderID}</td>
                <td>{order.orderDate}</td>              
                <td>{order.orderDescription}</td>
              </tr>
          </tbody>          
        </table>        
      );

    });
  }

  async populateOrderData(shipmentID){
    const response = await fetch(`order/${shipmentID}`);
    //const response = await fetch('shipment');
    const data = await response.json();
    console.log(data);
    this.setState({ orders: data, loadingOrder: false });
  }
}