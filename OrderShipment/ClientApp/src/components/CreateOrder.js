import {
  Button,
  Grid,
  Paper,
  Snackbar,
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
import React, { useContext, useEffect, useState } from "react";
import Infobar from "./InfoBar";
import ShipmentDropDown from "./ShipmentDropdown";
import ShipmentCountContext from "./ShipmentCountContext";
import axios from "axios";

const CreateOrder = () => {
  const [shipment, setShipment] = useState();

  const initialItems = [
    {
      itemDescription: "",
      quantity: 0,
    },
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
  const [result, setResult] = useState({ datarows: [], loading: true });
  const [isSelectedShip, setIsSelectedShip] = useState(false);
  const [shipOpen, setShipOpen] = React.useState(false);
  const [saveOrderOpen, setSaveOrderOpen] = React.useState(false);
  const [infotext, setInfoText] = React.useState("");
  const shipmentCountHandler = useContext(ShipmentCountContext);

  const onOrderChange = (event) => {
    const { name, value } = event.target;

    setOrder({ ...order, [name]: value });
  };

  const onDateChange = (date) => {
    setOrder({ ...order, orderDate: date });
  };

  const onItemChange = (event) => {
    const { name, value } = event.target;

    setCurrentItem({ ...currentItem, [name]: value });
  };

  const saveOrder = () => {
    if (!order.orderDescription) {
      alert("order description missing");
      return;
    }

    if (order.items.length < 1) {
      alert("you must add at least 1 item");
      return;
    }

    if (isSelectedShip) {
      UpdateShipment(shipment.shipmentID, order);
      setInfoText("Order added to shipment");
      setSaveOrderOpen(true);
      shipmentCountHandler.setUpdated(true);
    } else {
      alert("You must select a shipment");
    }
  };

  const onItemAdd = () => {
    const newList = itemList.concat(currentItem);
    setItemList(newList);
  };

  const callbackShip = (selectedShip) => {
    setIsSelectedShip(true);
    setInfoText("Shipment " + selectedShip.shipmentID + " selected");
    setShipment(selectedShip);
    setShipOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
       fetch("shipment")
        .then((response) => response.json())
        .then((response) => setResult({ datarows: response, loading: false }))
        .catch((error) => {
          console.log(error)
        });
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

  const handleCloseShipInfo = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShipOpen(false);
  };

  const handleCloseSaveOrderInfo = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSaveOrderOpen(false);
  };

  return (
    <div>
      <ShipmentDropDown onShipmentChange={(s) => callbackShip(s)} />
      <Infobar
        open={shipOpen}
        onChangero={handleCloseShipInfo}
        message={infotext}
        severity="info"
      ></Infobar>
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
                inputProps={{
                  "data-testid": "orderDescription",
                }}
              />
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  format="MM/dd/yyyy"
                  label="Shipment Date"
                  value={order.orderDate}
                  onChange={onDateChange}
                  inputProps={{
                    "data-testid": "orderDate",
                  }}
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
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" color="primary" onClick={saveOrder}>
            Add Order
          </Button>
          <Infobar
            open={saveOrderOpen}
            onChangero={handleCloseSaveOrderInfo}
            message={infotext}
            severity="success"
          ></Infobar>
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
      inputProps={{
        "data-testid": "itemDescription",
      }}
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
  async function addOrderToShipment() {
    axios
      .put("shipment/Update", { shipmentID: shipmentID, newOrder: order })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addOrderToShipment();
}

export default CreateOrder;
