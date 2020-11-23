import React, { Component } from 'react';
import { ShipmentCountDisplay } from './shipmentCountDisplay';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>CQSS Shipment Manager - React</h1>
        <p>Welcome to your new single-page application, built with:</p>
        <ul>
          <li>Fetch Data : presents a list of Shipments</li>
          <li>Shipment : create a new shipment</li>
          <li>Order : create an order for a shipment</li>
        </ul>
        <ShipmentCountDisplay />            
      </div>
    );
  }
}
