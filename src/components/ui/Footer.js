/* eslint-disable no-unused-vars */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import FooterAdornment from "../../svgToReact/FooterAdornment.js";
import MobileFooterAdornment from "../../svgToReact/MobileFooterAdornment.js";
import facebook from "../../assets/facebook.svg";
import twitter from "../../assets/twitter.svg";
import instagram from "../../assets/instagram.svg";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    width: "100%",
    paddingTop: "4rem",
    paddingBottom: "2rem",
    position: "relative",
    zIndex: theme.zIndex.modal + 1,
  },
  adornment: {
    width: "100%",
    marginTop: "2rem",
  },
  mainContainer: {
    width: "100%",
    maxWidth: "1200px",
    margin: "auto",
    padding: "0 2rem",
  },
  link: {
    ...theme.typography.link,
    color: "white",
    textDecoration: "none",
    opacity: 0.8,
    marginBottom: "0.5rem",
    transition: "opacity 0.3s ease",
    "&:hover": {
      opacity: 1,
    },
  },
  sectionTitle: {
    marginBottom: "1rem",
    fontWeight: 600,
    fontSize: "1.2rem",
  },
  icon: {
    width: "2rem",
    height: "2rem",
    marginRight: "1rem",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  mediaIconsContainer: {
    marginTop: "2rem",
    justifyContent: "center",
  },
  copyright: {
    marginTop: "2rem",
    fontSize: "0.875rem",
    opacity: 0.6,
    textAlign: "center",
  },
}));

const Footer = (props) => {
  const classes = useStyles();
  // const theme = useTheme();
  // const medium = useMediaQuery(theme.breakpoints.down("md"));
  // const smaller = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <footer className={classes.footer}>
      <Grid container spacing={4} className={classes.mainContainer}>
        <Grid item xs={6} sm={3}>
          <div className={classes.sectionTitle}>Company</div>
          <div className={classes.link} component={Link} to="/" onClick={() => props.setValue(0)}>Home</div>
          <div className={classes.link} component={Link} to="/about" onClick={() => props.setValue(3)}>About Us</div>
          <div className={classes.link} component={Link} to="/contact" onClick={() => props.setValue(4)}>Contact Us</div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className={classes.sectionTitle}>Services</div>
          <div className={classes.link} component={Link} to="/software" onClick={() => props.setValue(1)}>Software</div>
          <div className={classes.link} component={Link} to="/mobileapps" onClick={() => props.setValue(1)}>Apps</div>
          <div className={classes.link} component={Link} to="/websites" onClick={() => props.setValue(1)}>Websites</div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className={classes.sectionTitle}>Explore</div>
          <div className={classes.link} component={Link} to="/revolution" onClick={() => props.setValue(2)}>Vision</div>
          <div className={classes.link} component={Link} to="/revolution" onClick={() => props.setValue(2)}>Technology</div>
          <div className={classes.link} component={Link} to="/revolution" onClick={() => props.setValue(2)}>Process</div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className={classes.sectionTitle}>Support</div>
          <div className={classes.link} component={Link} to="/estimate" onClick={() => props.setValue(5)}>Get Estimate</div>
        </Grid>
      </Grid>
      <Grid container className={classes.mediaIconsContainer}>
        <a href="https://www.facebook.com/profile.php?id=61574756750367" target="_blank" rel="noopener noreferrer">
          <img src={facebook} alt="Facebook" className={classes.icon} />
        </a>
        <a href="https://www.instagram.com/dancah._/" target="_blank" rel="noopener noreferrer">
          <img src={instagram} alt="Instagram" className={classes.icon} />
        </a>
        <a href="https://x.com/K_Muthunga" target="_blank" rel="noopener noreferrer">
          <img src={twitter} alt="Twitter" className={classes.icon} />
        </a>
        {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src={twitter} alt="Twitter" className={classes.icon} />
        </a> */}
      </Grid>
      {/* <Grid item className={classes.adornment}>
        {smaller ? <MobileFooterAdornment /> : <FooterAdornment />}
      </Grid> */}
      <div className={classes.copyright}>
        &copy; {new Date().getFullYear()} dancah Technology. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
