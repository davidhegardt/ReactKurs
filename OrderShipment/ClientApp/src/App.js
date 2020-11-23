import React, { Component } from 'react';

import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';

import './custom.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import CreateShipment from './components/CreateShipment';
import CreateOrder from './components/CreateOrder';
import ShipmentCountContext from './components/ShipmentCountContext';

export default class App extends Component {
  static displayName = App.name;

  setShipmentCount = countInformation => {
    this.setState({ countInformation: countInformation });
  };

  setUpdated = updated => {
    this.setState({ updated : updated });
  }

  state = {
    countInformation: { shipments : 0, orders : 0 },
    updated : true,
    setShipmentCount: this.setShipmentCount,
    setUpdated : this.setUpdated
  };

  render () {
    return (
      <ShipmentCountContext.Provider value={this.state}>
      <Layout>
        <Route exact path='/' component={Home} />        
        <Route path='/fetch-data' component={FetchData} />        
        <Route path='/create-shipment' component={CreateShipment} />
        <Route path='/create-order' component={CreateOrder} />
      </Layout>
      </ShipmentCountContext.Provider>
    );
  }
}
