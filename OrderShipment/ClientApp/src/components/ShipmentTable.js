import React, { Component } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import { couldStartTrivia } from "typescript";
import DirectionsBoatTwoTone from '@material-ui/icons/DirectionsBoatTwoTone'; 

export class ShipmentTable extends Component {
  static displayName = ShipmentTable.name;
  sortArray = [];

  constructor(props) {
    super(props);
    this.state = { shipments: [], loadingOrder: true };
  }

  componentDidMount() {
    this.setState({ shipments: this.props.shipmentSend, loadingOrder: false });
  }

  setSortingKeys() {
    Object.keys(this.state.shipments[0]).map((key, index) => {
      this.sortArray.push({ sortName: key, isSorted: false });
    });
  }

  getSortOrder(propertyName) {
    if (!this.state.loadingOrder) {
      return this.sortArray.find((x) => x.sortName === propertyName).isSorted;
    }
    return false;
  }

  sortData(propertyName) {
    var isPropSorted = this.sortArray.find((x) => x.sortName === propertyName)
      .isSorted;

    var shipmentList = [...this.state.shipments];

    if (isPropSorted) {
      shipmentList.sort(this.dynamicSort(propertyName));
    } else {
      shipmentList.sort(this.dynamicSort("-" + propertyName));
    }

    this.sortArray.find(
      (x) => x.sortName === propertyName
    ).isSorted = !isPropSorted;
    this.setState({ shipments: shipmentList, loadingOrder: false });
  }

  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  render() {
    if (!this.state.loadingOrder) {
      this.setSortingKeys();
    }
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table" className="custom-table">
          <TableHead color="primary">
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <TableSortLabel
                  direction={this.getSortOrder("shipmentID") ? "asc" : "desc"}
                  onClick={() => this.sortData("shipmentID")}
                >
                  ShipmentID
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Departure Date</TableCell>
              <TableCell align="right">
                <TableSortLabel
                  direction={this.getSortOrder("departure") ? "asc" : "desc"}
                  onClick={() => this.sortData("departure")}
                >
                  Departure
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  direction={this.getSortOrder("destination") ? "asc" : "desc"}
                  onClick={() => this.sortData("destination")}
                >
                  Destination
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>          
          <TableBody>
            {this.state.shipments.map((shipment) => (
              <TableRow key={shipment.shipmentID}>
                <TableCell> <DirectionsBoatTwoTone color="$primary-dark" fontSize="large"></DirectionsBoatTwoTone></TableCell>
                <TableCell component="th" scope="row">
                 {shipment.shipmentID}
                </TableCell>                
                <TableCell align="right">{shipment.shipmentDate}</TableCell>
                <TableCell align="right">{shipment.departure}</TableCell>
                <TableCell align="right">{shipment.destination}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
