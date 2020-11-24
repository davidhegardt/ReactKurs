import { Button, Grid, Paper, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { useContext, useEffect, useState } from "react";
import ShipmentCountContext from "./ShipmentCountContext";
import { ShipmentCountDisplay } from "./shipmentCountDisplay";
import axios from "axios";

const CreateShipment = () => {
  const initialFormState = {
    shipmentDate: new Date(),
    departure: "",
    destination: "",
  };
  const [shipment, setShipment] = useState(initialFormState);
  const [selectedDate, setSelectedDate] = useState(new Date());  
  const shipmentCountHandler = useContext(ShipmentCountContext);

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setShipment({ ...shipment, [name]: value });
  };

  const submitShipment = () => {
    if (!shipment.departure) {
      alert("You need to enter departure");
      return;
    }

    if (!shipment.destination) {
      alert("You need to enter destination");
      return;
    }

    PostShipment(shipment);
    shipmentCountHandler.setUpdated(true);
  };

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    setShipment({ ...shipment, shipmentDate: selectedDate });
  }, [selectedDate]);

  return (
    <div>
      <ShipmentCountDisplay />
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Paper style={{ padding: 16 }}>
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item>
              <TextField
                label="Departure"
                name="departure"
                value={shipment.departure}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Destination"
                name="destination"
                value={shipment.destination}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  format="MM/dd/yyyy hh:ss"
                  label="Shipment Date"
                  value={shipment.shipmentDate}
                  onChange={onDateChange}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={() => submitShipment()}
            >
              Add new Shipment
            </Button>
          </Grid>
        </Paper>
      </form>
    </div>
  );
};

function PostShipment(shipment) {
  async function addShipment() {
    axios
      .post("shipment/Create", shipment)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addShipment();
}

export default CreateShipment;
