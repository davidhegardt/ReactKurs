import React, { Component } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import DirectionsBoatTwoTone from "@material-ui/icons/DirectionsBoatTwoTone";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@material-ui/icons";

export class ShipmentTable extends Component {
  static displayName = ShipmentTable.name;
  sortArray = [];

  constructor(props) {
    super(props);
    this.state = { shipments: [], loadingOrder: true, expanded: false };
  }

  componentDidMount() {
    this.setState({ shipments: this.props.shipmentSend, loadingOrder: false });
  }

  setSortingKeys() {
    Object.keys(this.state.shipments[0]).map((key) => {
      this.sortArray.push({ sortName: key, isSorted: false });
    });
  }

  getSortOrder(propertyName) {
    if (!this.state.loadingOrder) {
      return this.sortArray.find((x) => x.sortName === propertyName).isSorted;
    }
    return false;
  }

  switchOpen() {
    this.setState({ open: !this.state.open });
    console.log(this.state.open);
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
              <RenderRow shipment={shipment}></RenderRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

const RenderRow = (props) => {
  
  const [open, setOpen] = React.useState(false);  

  return (
    <React.Fragment>
      <TableRow key={props.shipment.shipmentID}>
        <TableCell>
          {" "}
          <DirectionsBoatTwoTone
            color="$primary-dark"
            fontSize="large"
          ></DirectionsBoatTwoTone>
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.shipment.shipmentID}
        </TableCell>
        <TableCell align="right">{props.shipment.shipmentDate}</TableCell>
        <TableCell align="right">{props.shipment.departure}</TableCell>
        <TableCell align="right">{props.shipment.destination}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <h3>Orderlist</h3>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.shipment.orders.map((order) => (
                    <TableRow key={order.orderId}>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>{order.orderDescription}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
