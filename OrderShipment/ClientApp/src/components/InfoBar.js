import React, { useEffect, useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

const Infobar = ({ open, onChangero, message, severity }) => {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={onChangero}>
      <Alert severity={severity} onClose={onChangero}>
        {message}
      </Alert>
    </Snackbar>
  );
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default Infobar;