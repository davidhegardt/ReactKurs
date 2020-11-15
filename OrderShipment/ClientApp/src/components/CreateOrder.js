import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
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
import DateFnsUtils from '@date-io/date-fns';
import React, { useEffect, useState } from "react";

const CreateOrder = (props) => {
  //const [shipment, setShipment] = useState(props.shipment);

  const initialOrderState = {
    orderID: "",
    orderDescription: "",
    items: [],
    orderDate: new Date(),
  };

  const initialItem = {
    itemID: 1,
    itemDescription: "banan",
    quantity: "200",
  };

  const initialList = [initialItem];

  const [order, setOrder] = useState(initialOrderState);
  const [itemList, setItemList] = useState(initialList);
  const [currentItem, setCurrentItem] = useState(initialItem);

  const onOrderChange = (event) => {
    const { name, value } = event.target;

    setOrder({ ...order, [name]: value });
    console.log(order);
  };

  const onDateChange = (date) => {       
    //setSelectedDate(date);

    setOrder({...order, orderDate : date});
    console.log(order);
};

  const onItemChange = (event) => {
    const { name, value } = event.target;

    setCurrentItem({ ...currentItem, [name]: value });
    console.log(currentItem);
  };

  const saveOrder = () => {
      
    setOrder({...order, items: itemList});

    console.log(order);
  }

  const onItemAdd = () => {
    console.log(currentItem);
    const newList = itemList.concat(currentItem);
    setItemList(newList);
  };

  useEffect(() => {
    let count = itemList.length;
    const currentItemId = ++count;
    setCurrentItem({ ...currentItem, itemID: currentItemId });
  }, [currentItem]);

  return (
    <div>
      <form>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Grid container direction="column" alignItems="flex-start" spacing={2}>
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
          <AddItem item={currentItem} onChange={onItemChange} onAdd={onItemAdd} />
        
        <TableContainer component={Paper} className="form-spacing-top form-spacing-bottom">
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
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" color="primary" onClick={saveOrder} >
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
      value={item.quantity}
      onChange={onChange}
    />
    <Button variant="contained" color="primary" onClick={onAdd}>
      Add Item
    </Button>
  </div>
);

export default CreateOrder;
