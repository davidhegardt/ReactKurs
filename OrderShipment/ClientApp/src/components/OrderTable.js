import React, { Component } from 'react';

export class OrderTable extends React.Component {

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
      fetch(`order/${shipmentID}`)
            .then(response => response.json())
            .then(data => {
              console.log(data);
              this.setState({ orders: data, loadingOrder: false });
            });
    }
  
  }