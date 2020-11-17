import React, { Component } from 'react';

import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';

import './custom.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import CreateShipment from './components/CreateShipment';
import CreateOrder from './components/CreateOrder';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (      
      <Layout>
        <Route exact path='/' component={Home} />        
        <Route path='/fetch-data' component={FetchData} />        
        <Route path='/create-shipment' component={CreateShipment} />
        <Route path='/create-order' component={CreateOrder} />
      </Layout>      
    );
  }
}
