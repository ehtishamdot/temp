import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PaymentModal from "./paymentModal";

export default function MessageModal(props) {
  const { open, setOpen } = props;
  const [openPaymentModal, setPaymentModal] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(false);
    setPaymentModal(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
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
            Please proceed to the payment page to register your Super Eat vote
            😊
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClickOpen} autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
      <PaymentModal open={openPaymentModal} setOpen={setPaymentModal} />
    </React.Fragment>
  );
}
