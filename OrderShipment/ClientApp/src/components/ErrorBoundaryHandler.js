import React, { Component } from "react";

export class ErrorBoundaryHandler extends React.Component {

    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
  
    componentDidCatch(error, errorInfo){
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
    }
  
    render() {
      if (this.state.errorInfo) {      
        return (
          <div>
            <h2>Ett fel inträffade..</h2>          
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}          
          </div>
        );
      }
      
      return this.props.children;
    }
}