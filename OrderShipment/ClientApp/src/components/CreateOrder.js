import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React, { useEffect, useState } from "react";

const CreateOrder = () => {
  const [shipment, setShipment] = useState();

  const initialItems = [
    {      
      itemDescription : "",
      quantity : 0
    }
  ];

  const initialOrderState = {    
    orderDescription: "",
    items: initialItems,
    orderDate: new Date(),
  };

  const initialItem = {
    itemID: 1,
    itemDescription: "banan",
    quantity: 200,
  };

  const initialList = [];

  const [order, setOrder] = useState(initialOrderState);
  const [itemList, setItemList] = useState(initialList);
  const [currentItem, setCurrentItem] = useState(initialItem);
  const [, setResult] = useState({ datarows: [], loading: true });
  const [isSelectedShip,setIsSelectedShip] = useState(false);


  const onOrderChange = (event) => {
    const { name, value } = event.target;

    setOrder({ ...order, [name]: value });
    console.log(order);
  };

  const onDateChange = (date) => {
    //setSelectedDate(date);

    setOrder({ ...order, orderDate: date });
    console.log(order);
  };

  const onItemChange = (event) => {
    const { name, value } = event.target;

    setCurrentItem({ ...currentItem, [name]: value });
    console.log(currentItem);
  };

  const saveOrder = () => {

    if(!order.orderDescription){
      console.log(false);
      alert("order description missing");
      return;
    }

    if(order.items.length < 1){
      console.log(false);
      alert("you must add at least 1 item");
      return;
    }

    if(isSelectedShip){
       UpdateShipment(shipment.shipmentID, order);
    } else {
      alert("You must select a shipment");
    }
  };

  const onItemAdd = () => {    
    const newList = itemList.concat(currentItem);
    setItemList(newList);
    //setOrder({ ...order, items: itemList });
  };

  const callbackShip = (selectedShip) => {
    setIsSelectedShip(true);
    setShipment(selectedShip);    
  };

  useEffect(() => {
    const fetchData = async () => {
      fetch("shipment")
        .then((response) => response.json())
        .then((response) => setResult({ datarows: response, loading: false }));
    };

    fetchData();
  }, []);

  useEffect(() => {
    let count = itemList.length;
    const currentItemId = ++count;
    setCurrentItem({ ...currentItem, itemID: currentItemId });
  }, [currentItem]);

  useEffect(() => {
    setOrder({ ...order, items: itemList });
  }, [itemList]);

  return (
    <div>
      <ShipmentDropDown onShipmentChange={(s) => callbackShip(s)} />
      <form>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item>
              <TextField
                label="OrderDescription"
                name="orderDescription"
                value={order.orderDescription}
                onChange={onOrderChange}
              />
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  format="MM/dd/yyyy"
                  label="Shipment Date"
                  value={order.orderDate}
                  onChange={onDateChange}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <AddItem
            item={currentItem}
            onChange={onItemChange}
            onAdd={onItemAdd}
          />
          <TableContainer
            component={Paper}
            className="form-spacing-top form-spacing-bottom"
          >
            <Table>
              <TableHead color="primary">
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itemList.map((item) => (
                  <TableRow key={item.itemID}>
                    <TableCell>{item.itemID}</TableCell>
                    <TableCell>{item.itemDescription}</TableCell>
                    <TableCell >{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" color="primary" onClick={saveOrder}>
            Add Order
          </Button>
        </Paper>
      </form>
    </div>
  );
};

const AddItem = ({ item, onChange, onAdd }) => (
  <div className="form-spacing-top">
    <TextField
      label="ItemDescription"
      name="itemDescription"
      value={item.itemDescription}
      onChange={onChange}
    />
    <TextField
      label="Quantity"
      name="quantity"
      type="number"
      value={item.quantity}
      onChange={onChange}
    />
    <Button variant="contained" color="primary" onClick={onAdd}>
      Add Item
    </Button>
  </div>
);

function UpdateShipment(shipmentID, order) {
    console.log(order);
    async function addOrderToShipment() {
      fetch("shipment/Update", {
        method: "put",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shipmentID: shipmentID, newOrder: order}),
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
    }

    addOrderToShipment();

}

function ShipmentDropDown({ onShipmentChange }) {
  const [loading, setLoading] = React.useState(true);
  const [shipmentList, setShipmentList] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    let unmounted = false;
    async function getShipments() {
      const response = await fetch("shipment");
      const body = await response.json();
      console.log(body);
      if (!unmounted) {
        setItems(
          body.map((shipment) => ({
            label:
              shipment.shipmentID +
              " - " +
              shipment.departure +
              "=>" +
              shipment.destination,
            value: shipment.shipmentID,
          }))
        );
        setLoading(false);
        setShipmentList(body);
      }
    }
    getShipments();
    return () => {
      unmounted = true;
    };
  }, []);

  function handleChange(e) {
    var selectShip = shipmentList.find((x) => x.shipmentID === +e);
    onShipmentChange(selectShip);
    setValue(e);
  }

  return (
    <div>
      <label>Select Shipment to add Order to</label>
      <div className="wrapper">
        <select
          disabled={loading}
          value={value}
          onChange={(e) => handleChange(e.currentTarget.value)}
        >
          <option>-- Select Shipment --</option>
          {items.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CreateOrder;
