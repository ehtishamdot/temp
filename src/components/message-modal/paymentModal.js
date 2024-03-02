import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Box from '@mui/material/Box';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export default function PaymentModal(props) {
  const { open, setOpen } = props;

  const stripePromise = loadStripe(
      "pk_test_51O2KsPEjS12OGlkDbSBhfjyRl4JcwekIaAoQ8MSEPgho0CIyPLFg3d00P3ahBo6iH6DjEhbOxCawbRCvYsFL5ch600qU1oKbKW"
    );
  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    setOpen(false);
  };

  const options = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <React.Fragment>
       <Elements stripe={stripePromise}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Supervote confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This container is payment container for the super vote in this project Please Fill this is it is a test version.
          </DialogContentText>
        </DialogContent>
        <Box sx={{margin:"0 1rem", border:"1px solid #aaa",padding:"10px 8px", borderRadius:"8px"}}>
        <CardElement className="sr-input sr-card-element" options={options} />
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
      </Elements>
    </React.Fragment>
  );
}
