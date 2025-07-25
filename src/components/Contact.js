import React, { useState } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CallToAction from "../components/ui/CallToAction.js";
import phoneIcon from "../assets/phone.svg";
import emailIcon from "../assets/email.svg";
import paperAirplane from "../assets/send.svg";

const useStyles = makeStyles((theme) => ({
  heading: {
    paddingLeft: "2em",
    paddingRight: "2em",
    marginBottom: "2em",
    marginTop: "2em",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "1.5em",
      paddingRight: "1.5em",
    },
  },
  confirmationModalHeading: {
    paddingLeft: "2em",
    paddingRight: "2em",
    marginTop: "2em",
    paddingTop: 0,
    paddingBottom: 0,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      marginLeft: "2em",
      marginRight: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  itemContainer: {
    textAlign: "center",
  },
  sendMessageButton: {
    ...theme.typography.learnButton,
    backgroundColor: theme.palette.common.orange,
    height: "45px",
    opacity: 0.85,
    borderRadius: "5px",
    marginTop: "1em",
  },
  message: {
    border: `2px solid ${theme.palette.common.orange}`,
    marginTop: "4em",
    borderRadius: "5px",
  },
  confirmationButton: {
    verticalAlign: "bottom",
    "&:hover": {
      //backgroundColor: theme.palette.common.orange,
      //opacity: 0.75
    },
  },
}));

const Contact = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  //const smaller = useMediaQuery(theme.breakpoints.down('sm'));
  const smallest = useMediaQuery(theme.breakpoints.down("xs"));

  const [name, setName] = useState("");
  const [nameHelperText, setNameHelperText] = useState("");
  const [email, setEmail] = useState("");
  const [emailHelperText, setEmailHelperText] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneHelperText, setPhoneHelperText] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const [open, setOpen] = useState(false);

  const onFieldInputChange = (event) => {
    let valid;
    switch (event.target.id) {
      case "name":
        setName(event.target.value);
        if (event.target.value !== "") {
          valid = /^[a-z ,.'-]+$/i.test(event.target.value);
          if (!valid) {
            setNameHelperText(
              `Cannot include numbers, brackets and special characters`
            );
          } else {
            setNameHelperText("");
          }
        } else {
          setNameHelperText("");
        }
        break;
      case "email":
        setEmail(event.target.value);
        if (event.target.value !== "") {
          valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
            event.target.value
          );
          if (!valid) {
            setEmailHelperText("Invalid email.");
          } else {
            setEmailHelperText("");
          }
        } else {
          setEmailHelperText("");
        }

        break;
      case "phone":
        setPhone(event.target.value);
        if (event.target.value !== "") {
          valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
            event.target.value
          );
          if (!valid) {
            setPhoneHelperText("Invalid Phone Number");
          } else {
            setPhoneHelperText("");
          }
        } else {
          setPhoneHelperText("");
        }
        break;
      default:
        break;
    }
  };

  const sendButtonJSX = (text) => (
    <>
      {text}
      <img
        style={{ marginLeft: 7.5 }}
        src={paperAirplane}
        alt="paper airplane icon"
      />
    </>
  );
  const onConfirm = () => {
    setLoading(true);
    axios
      .get("https://us-central1-beri-tech.cloudfunctions.net/sendMail", {
        params: {
          name: name,
          email: email,
          phone: phone,
          message: message,
        },
      })
      .then((res) => {
        setLoading(false);
        setOpen(false);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setAlert({
          open: true,
          message: "Message sent successfully!",
          backgroundColor: "#4BB543",
        });
      })
      .catch((err) => {
        setLoading(false);
        setAlert({
          open: true,
          message: "Something went wrong! Please try again.",
          backgroundColor: "#FF3232",
        });
      });
  };

  return (
    <Grid container direction="row">
      <Grid
        item
        container
        direction="column"
        style={{ paddingBottom: "10em" }}
        alignItems="center"
        lg={4}
      >
        <Grid item className={classes.heading}>
          <Typography variant="h2" style={{ lineHeight: 1 }}>
            Contact Us
          </Typography>
          <Typography variant="subtitle1">We are waiting.</Typography>
        </Grid>
        <Grid item container alignItems="center" justifyContentContent="center">
          <Grid item>
            <img
              src={phoneIcon}
              alt="phone icon"
              style={{ marginRight: "0.5em", verticalAlign: "baseline" }}
            />
          </Grid>
          <Grid item>
            <Typography variant="body1" style={{ fontSize: "1rem" }}>
              <a
                href="tel:5555555555"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                (254) 794369806
              </a>
            </Typography>
          </Grid>
        </Grid>
        <Grid item container alignItems="center" justifyContentContent="center">
          <Grid item>
            <img
              src={emailIcon}
              alt="phone icon"
              style={{ marginRight: "0.5em", verticalAlign: "middle" }}
            />
          </Grid>
          <Grid item>
            <Typography variant="body1" style={{ fontSize: "1rem" }}>
              <a
                href="mailto:info@dancahtechnology.co.ke"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                info@dancahtechnology.co.ke
              </a>
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContentContent="center"
          style={{ maxWidth: smallest ? "80%" : "25em", marginTop: "2em" }}
        >
          <Grid item style={{ width: "100%", marginTop: "0.5em" }}>
            <TextField
              label="Name"
              id="name"
              error={nameHelperText.length !== 0}
              helperText={nameHelperText}
              value={name}
              onChange={onFieldInputChange}
              fullWidth
            />
          </Grid>
          <Grid item style={{ width: "100%", marginTop: "0.5em" }}>
            <TextField
              label="Email"
              id="email"
              error={emailHelperText.length !== 0}
              helperText={emailHelperText}
              value={email}
              onChange={onFieldInputChange}
              fullWidth
            />
          </Grid>
          <Grid item style={{ width: "100%", marginTop: "0.5em" }}>
            <TextField
              label="Phone"
              id="phone"
              error={phoneHelperText.length !== 0}
              helperText={phoneHelperText}
              value={phone}
              onChange={onFieldInputChange}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContentContent="center"
          style={{ maxWidth: smallest ? "80%" : "25em" }}
        >
          <Grid item style={{ width: "100%" }}>
            <TextField
              InputProps={{ disableUnderline: true }}
              id="message"
              placeholder="Tell us about your project here..."
              rows={10}
              value={message}
              className={classes.message}
              onChange={(e) => setMessage(e.target.value)}
              multiline
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button
              disabled={
                name.length === 0 ||
                nameHelperText.length !== 0 ||
                email.length === 0 ||
                emailHelperText.length !== 0 ||
                phone.length === 0 ||
                phoneHelperText.length !== 0 ||
                message.length === 0
              }
              className={classes.sendMessageButton}
              variant="contained"
              onClick={() => setOpen(true)}
            >
              {sendButtonJSX("Send Message")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="confirmation-modal-title"
        fullScreen={smallest ? true : false}
        style={{ zIndex: 1302 }}
      >
        <DialogTitle
          id="confirmation-modal-title"
          className={classes.confirmationModalHeading}
          disableTypography
        >
          <Typography variant="h4">Confirm Message</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="column"
            style={{
              padding: smallest ? 0 : "2rem",
              width: smallest ? "auto" : "30em",
            }}
          >
            <Grid item style={{ width: "100%", marginTop: "0.5em" }}>
              <TextField
                label="Name"
                id="name"
                error={nameHelperText.length !== 0}
                helperText={nameHelperText}
                value={name}
                onChange={onFieldInputChange}
                fullWidth
              />
            </Grid>
            <Grid item style={{ width: "100%", marginTop: "0.5em" }}>
              <TextField
                label="Email"
                id="email"
                error={emailHelperText.length !== 0}
                helperText={emailHelperText}
                value={email}
                onChange={onFieldInputChange}
                fullWidth
              />
            </Grid>
            <Grid item style={{ width: "100%", marginTop: "0.5em" }}>
              <TextField
                label="Phone"
                id="phone"
                error={phoneHelperText.length !== 0}
                helperText={phoneHelperText}
                value={phone}
                onChange={onFieldInputChange}
                fullWidth
              />
            </Grid>
            <Grid item style={{ width: "100%" }}>
              <TextField
                InputProps={{ disableUnderline: true }}
                id="message"
                rows={8}
                value={message}
                className={classes.message}
                style={{ marginTop: "2em" }}
                onChange={(e) => setMessage(e.target.value)}
                multiline
                fullWidth
              />
            </Grid>
            <Grid
              item
              container
              justifyContentContent="flex-end"
              style={{ marginTop: "1em" }}
            >
              <Grid item style={{ marginRight: "0.5rem" }}>
                <Button
                  variant="text"
                  color="primary"
                  size="small"
                  onClick={() => setOpen(false)}
                >
                  CANCEL
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={onConfirm}
                  className={classes.confirmationButton}
                  disableElevation
                >
                  {loading ? (
                    <CircularProgress size={20} color="secondary"/>
                  ) : (
                    sendButtonJSX("Send")
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={7000}
      />
      <Grid item container direction="column" lg={8}>
        <CallToAction
          setValue={props.setValue}
          setSelected={props.setSelected}
          grid={{ size: "lg", noc: 8 }}
        />
      </Grid>
    </Grid>
  );
};

export default Contact;
