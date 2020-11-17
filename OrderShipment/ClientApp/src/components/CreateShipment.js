import { Button, Grid, Paper, TextField } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";

const CreateShipment = () => {
  const initialFormState = {    
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
      if(!shipment.departure){
        alert("You need to enter departure");
        return;
      }

      if(!shipment.destination){
        alert("You need to enter destination");
        return;
      }

      PostShipment(shipment);
  }

  const onDateChange = (date) => {       
      setSelectedDate(date);
  };

  useEffect(() => {
      setShipment({...shipment, shipmentDate : selectedDate});
      console.log(shipment);
  }, [selectedDate])

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();          
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

function PostShipment(shipment) {
  
  async function addShipment() {
    fetch("shipment/Create", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shipment),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }

  addShipment();

}

export default CreateShipment;
