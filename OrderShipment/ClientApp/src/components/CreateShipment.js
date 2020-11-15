import { Button, Grid, Paper, TextField } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";

const CreateShipment = () => {
  const initialFormState = {
    shipmentID: "",
    shipmentDate: new Date(),
    departure: "",
    destination: "",
  };
  const [shipment, setShipment] = useState(initialFormState);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setShipment({ ...shipment, [name]: value });
    console.log(shipment);
  };

  const submitShipment = () => {
      console.log('submitski!');
  }

  const onDateChange = (date) => {       
      //setSelectedDate(date);

      setShipment({...shipment, shipmentDate : date});
      console.log(shipment);
  };

  useEffect(() => {
      
  }, [shipment.shipmentDate])

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!shipment.departure) return;
            console.log('submit???');
          // add to props ? save to db?
        }}
      >
        <Paper style={{ padding: 16 }}>
          <Grid container direction="column" alignItems="flex-start" spacing={2}>
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
            <Button variant="contained" color="primary" onClick={() => submitShipment()}>Add new Shipment</Button>
          </Grid>
        </Paper>
      </form>
    </div>
  );
};

export default CreateShipment;
