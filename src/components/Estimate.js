import React, { useState, useRef } from "react";
import axios from "axios";
import Lottie from "react-lottie";
import { cloneDeep } from "lodash";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Hidden from "@material-ui/core/Hidden";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";

import check from "../assets/check.svg";
import send from "../assets/send.svg";
import software from "../assets/software.svg";
import mobile from "../assets/mobile.svg";
import website from "../assets/website.svg";
import websiteBlack from "../assets/websiteBlack.svg";
import backArrow from "../assets/backArrow.svg";
import forwardArrow from "../assets/forwardArrow.svg";
import backArrowDisabled from "../assets/backArrowDisabled.svg";
import forwardArrowDisabled from "../assets/forwardArrowDisabled.svg";
import camera from "../assets/camera.svg";
import upload from "../assets/upload.svg";
import person from "../assets/person.svg";
import persons from "../assets/persons.svg";
import people from "../assets/people.svg";
import info from "../assets/info.svg";
import bell from "../assets/bell.svg";
import users from "../assets/users.svg";
import iphone from "../assets/iphone.svg";
import gps from "../assets/gps.svg";
import customized from "../assets/customized.svg";
import data from "../assets/data.svg";
import android from "../assets/android.svg";
import biometrics from "../assets/biometrics.svg";
import globe from "../assets/globe.svg";

import estimateAnimation from "../animations/estimateAnimation/data.json";

const useStyles = makeStyles((theme) => ({
  heading: {
    paddingLeft: "5em",
    paddingRight: "5em",
    marginBottom: "3em",
    marginTop: "2em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "1.5em",
      paddingRight: "1.5em",
      marginTop: "1em",
      marginBottom: "1em",
      textAlign: "center",
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: "1.5em",
    },
  },

  icon: {
    height: "10em",
    width: "10em",
  },
  question: {
    marginTop: "5em",
    marginBottom: "2em",
    marginLeft: "1em",
    marginRight: "1em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "1.5em",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "1em",
      marginBottom: "1em",
    },
  },
  estimate: {
    ...theme.typography.estimate,
    borderRadius: "30px",
    marginLeft: "20px",
    marginRight: "20px",
    height: "45px",
    width: "250px",
    marginTop: "0.5rem",
    fontSize: "1.35rem",
  },

  placeRequest: {
    ...theme.typography.estimate,
    borderRadius: "30px",
    marginLeft: "20px",
    marginRight: "20px",
    height: "45px",
    width: "200px",
    marginTop: "0.5rem",
    fontSize: "1.15rem",
  },
  transparentOnHover: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  estimateModalHeading: {
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
  message: {
    border: `2px solid ${theme.palette.common.orange}`,
    marginTop: "4em",
    borderRadius: "5px",
  },
  specialText: {
    fontFamily: "Raleway",
    fontWeight: 700,
    fontSize: "1.5rem",
    color: theme.palette.common.orange,
  },
}));

const defaultQuestions = [
  {
    id: 1,
    title: "Which service are you interested in?",
    subtitle: null,
    active: true,
    options: [
      {
        id: 1,
        title: "Software Development",
        subtitle: null,
        icon: software,
        iconAlt: "three floating screens",
        selected: false,
        cost: 0,
      },
      {
        id: 2,
        title: "App Development",
        subtitle: null,
        icon: mobile,
        iconAlt: "phones and tablet ouline",
        selected: false,
        cost: 0,
      },
      {
        id: 3,
        title: "Website Development",
        subtitle: null,
        icon: website,
        iconAlt: "a computer screen outline",
        selected: false,
        cost: 0,
      },
    ],
  },
];

const softwareQuestions = [
  { ...defaultQuestions[0], active: false },
  {
    id: 2,
    title: "Which platforms do you need supported?",
    subtitle: "Select all that apply.",
    options: [
      {
        id: 1,
        title: "Web Application",
        subtitle: null,
        icon: websiteBlack,
        iconAlt: "computer outline",
        selected: false,
        cost: 2500,
      },
      {
        id: 2,
        title: "iOS Application",
        subtitle: null,
        icon: iphone,
        iconAlt: "outline of iphone",
        selected: false,
        cost: 3000,
      },
      {
        id: 3,
        title: "Android Application",
        subtitle: null,
        icon: android,
        iconAlt: "outlines of android phone",
        selected: false,
        cost: 3000,
      },
    ],
    active: true,
  },
  {
    id: 3,
    title: "Which features do you expect to use?",
    subtitle: "Select all that apply.",
    options: [
      {
        id: 1,
        title: "Photo/Video",
        subtitle: null,
        icon: camera,
        iconAlt: "camera outline",
        selected: false,
        cost: 500,
      },
      {
        id: 2,
        title: "GPS",
        subtitle: null,
        icon: gps,
        iconAlt: "gps pin",
        selected: false,
        cost: 2500,
      },
      {
        id: 3,
        title: "File Transfer",
        subtitle: null,
        icon: upload,
        iconAlt: "outline of cloud with arrow pointing up",
        selected: false,
        cost: 1000,
      },
    ],
    active: false,
  },
  {
    id: 4,
    title: "Which features do you expect to use?",
    subtitle: "Select all that apply.",
    options: [
      {
        id: 1,
        title: "Users Authentication",
        subtitle: null,
        icon: users,
        iconAlt: "outline of a person with a plus sign",
        selected: false,
        cost: 500,
      },
      {
        id: 2,
        title: "Biometrics",
        subtitle: null,
        icon: biometrics,
        iconAlt: "fingerprint",
        selected: false,
        cost: 750,
      },
      {
        id: 3,
        title: "Push Notifications",
        subtitle: null,
        icon: bell,
        iconAlt: "outline of a bell",
        selected: false,
        cost: 1500,
      },
    ],
    active: false,
  },
  {
    id: 5,
    title: "What type of custom features do you expect to need?",
    subtitle: "Select one.",
    options: [
      {
        id: 1,
        title: "Low Complexity",
        subtitle: "(Informational)",
        icon: info,
        iconAlt: "'i' inside a circle",
        selected: false,
        cost: 500,
      },
      {
        id: 2,
        title: "Medium Complexity",
        subtitle: "(Interactive, Customizable, Realtime)",
        icon: customized,
        iconAlt: "two toggle switches",
        selected: false,
        cost: 2000,
      },
      {
        id: 3,
        title: "High Complexity",
        subtitle: "(Data Modeling and Computation)",
        icon: data,
        iconAlt: "outline of line graph",
        selected: false,
        cost: 5000,
      },
    ],
    active: false,
  },
  {
    id: 6,
    title: "How many users do you expect?",
    subtitle: "Select one.",
    options: [
      {
        id: 1,
        title: "0-10",
        subtitle: null,
        icon: person,
        iconAlt: "person outline",
        selected: false,
        cost: 1,
      },
      {
        id: 2,
        title: "10-100",
        subtitle: null,
        icon: persons,
        iconAlt: "outline of two people",
        selected: false,
        cost: 1.25,
      },
      {
        id: 3,
        title: "100+",
        subtitle: null,
        icon: people,
        iconAlt: "outline of three people",
        selected: false,
        cost: 1.5,
      },
    ],
    active: false,
  },
];

const websiteQuestions = [
  { ...defaultQuestions[0], active: false },
  {
    id: 2,
    title: "Which type of website are you wanting?",
    subtitle: "Select one.",
    options: [
      {
        id: 1,
        title: "Basic",
        subtitle: "(Informational)",
        icon: info,
        iconAlt: "person outline",
        selected: false,
        cost: 1000,
      },
      {
        id: 2,
        title: "Interactive",
        subtitle: "(Users, API's, Messaging)",
        icon: customized,
        iconAlt: "outline of two people",
        selected: false,
        cost: 2500,
      },
      {
        id: 3,
        title: "E-Commerce",
        subtitle: "(Sales)",
        icon: globe,
        iconAlt: "outline of three people",
        selected: false,
        cost: 5000,
      },
    ],
    active: true,
  },
];

const Estimate = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const smaller = useMediaQuery(theme.breakpoints.down("sm"));
  const medium = useMediaQuery(theme.breakpoints.down("md"));
  const smallest = useMediaQuery(theme.breakpoints.down("xs"));

  const questionsRef = useRef();

  const [questions, setQuestions] = useState(defaultQuestions);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameHelperText, setNameHelperText] = useState("");
  const [email, setEmail] = useState("");
  const [emailHelperText, setEmailHelperText] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneHelperText, setPhoneHelperText] = useState("");
  const [message, setMessage] = useState("");

  const [estimate, setEstimate] = useState(0);

  const [service, setService] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [customFeatures, setCustomFeatures] = useState("");
  const [category, setCategory] = useState("");
  const [users, setUsers] = useState("");

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  // useEffect(()=>{
  //   if(smallest) questionsRef.current.scrollIntoView({behavior: 'smooth'});
  // }, [smallest])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: estimateAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const resetStates = () => {
    setPlatforms([]);
    setFeatures([]);
    setCustomFeatures("");
    setCategory("");
    setUsers("");
    if (smallest) questionsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const nextQuestion = () => {
    //creating a deep copy of state Questions to keep the state immutable
    const updatedQuestions = cloneDeep(questions);
    //filtering out the currently active question
    const activeQuestion = updatedQuestions.filter(
      (question) => question.active
    );
    //Getting index of active question
    const activeQuestionIndex = activeQuestion[0].id - 1;
    //Getting next question index
    const nextQuestionIndex = activeQuestionIndex + 1;
    //setting active question to false
    updatedQuestions[activeQuestionIndex] = {
      ...activeQuestion[0],
      active: false,
    };
    //setting next question to true
    updatedQuestions[nextQuestionIndex] = {
      ...updatedQuestions[nextQuestionIndex],
      active: true,
    };
    //Finally Update the question structure in state
    setQuestions(updatedQuestions);
    if (smallest) {
      questionsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextQuestionDisabled = () => {
    //Filter out the currently active question
    const activeQuestion = questions.filter((question) => question.active);
    //Check if active question id is the last id in the questions array and return true
    if (activeQuestion[0].id === questions[questions.length - 1].id) {
      return true;
    }
    //Under all other circumstances we need to enable question navigation
    return false;
  };

  const previousQuestion = () => {
    //creating a deep copy of state Questions to keep the state immutable
    const updatedQuestions = cloneDeep(questions);
    //filtering out the currently active question
    let activeQuestion = updatedQuestions.filter((question) => question.active);
    //Getting index of active question
    const activeQuestionIndex = activeQuestion[0].id - 1;
    //Getting next question index
    const previousQuestionIndex = activeQuestionIndex - 1;
    //setting active question to false
    updatedQuestions[activeQuestionIndex] = {
      ...activeQuestion[0],
      active: false,
    };
    //setting next question to true
    updatedQuestions[previousQuestionIndex] = {
      ...updatedQuestions[previousQuestionIndex],
      active: true,
    };
    //Finally Update the question structure in state
    setQuestions(updatedQuestions);
    if (smallest) questionsRef.current.scrollIntoView({ behavior: "smooth" });

    //if we need to restrict user to select only one type of service
    //its kind of a reset function for question
    //Without this block of code user can still go back n forth between questions even after going back to first question
    // activeQuestion = updatedQuestions.filter(
    //   (question) => question.active
    // );
    // if(activeQuestion[0].title === 'Which service are you interested in?'){
    //   setQuestions(defaultQuestions);
    // }
  };

  const previousQuestionDisabled = () => {
    //Filter out the currently active question
    const activeQuestion = questions.filter((question) => question.active);
    //Check if active question id is the first id in the questions array and return true
    if (activeQuestion[0].id === questions[0].id) {
      return true;
    }
    //Under all other circumstances we need to enable question navigation
    return false;
  };

  const handleOptionSelection = (id) => {
    //creating a deep copy of state Questions to keep the state immutable
    const updatedQuestions = cloneDeep(questions);
    //filtering out the active question
    const activeQuestion = updatedQuestions.filter(
      (question) => question.active
    );
    //Getting the index of currently active question
    const activeQuestionIndex = activeQuestion[0].id - 1;
    //Getting the selected option from currently active question using the option id input parameter
    const selectedOption =
      updatedQuestions[activeQuestionIndex].options[id - 1];
    //Getting the previous selected option from currently active question and filter for any other options seleted
    const previouslySelectedOption = activeQuestion[0].options.filter(
      (option) => option.selected
    );
    //switch over active question subtitle to find whether single or multiple questions needed to be selected.
    switch (activeQuestion[0].subtitle) {
      //The case where only one option can be seleted at a time
      case "Select one.":
        //Check if there is any already or previously selected option exist
        //if condition is true => toggle the previously selected option
        if (previouslySelectedOption[0]) {
          previouslySelectedOption[0].selected = !previouslySelectedOption[0]
            .selected;
          if (previouslySelectedOption[0] === selectedOption) {
            selectedOption.selected = !selectedOption.selected;
          }
        }
        //if there is no previously selected option then Toggle the options currently selected property
        selectedOption.selected = !selectedOption.selected;
        break;
      default:
        //In all other cases user can select multiple options, so toggle selection
        selectedOption.selected = !selectedOption.selected;
        break;
    }
    //switch over selected option title to find which set of questions should be shown to the user
    switch (selectedOption.title) {
      //if selected option title matches the swtich case => question state is updated to show relevant questions
      case "Software Development":
        setQuestions(softwareQuestions);
        setService(selectedOption.title);
        resetStates();
        break;
      case "App Development":
        setQuestions(softwareQuestions);
        setService(selectedOption.title);
        resetStates();
        break;
      case "Website Development":
        setQuestions(websiteQuestions);
        setService(selectedOption.title);
        resetStates();
        break;
      default:
        //if selected option title doesnt match any switch case then we will simply update the question
        setQuestions(updatedQuestions);
        break;
    }
  };

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

  const calculateCost = () => {
    //declaring a cost counter
    let cost = 0;
    //Filter out the questions that are answered with at least one option selected
    const selections = questions
      .map((question) => question.options.filter((option) => option.selected))
      .filter((question) => question.length !== 0);
    //aggregating cost from the selected option to the cost counter
    selections.map((options) => options.map((option) => (cost += option.cost)));
    //Note: The question "How many users do you expect?" doesnt have a cost
    //It only has a multiplyer as a cost property. So we need to subtract the multiplyer
    //from the cost calculated in the above step

    //Website Questions have only 2 questions and doesnt have "How many users do you expect?"
    if (questions.length > 2) {
      //Filtering out the multiplyer from "How many users do you expect?"
      //if user don't choose any option from "How many users do you expect?" then
      //userCostMultiplyer should return undefined
      const expectedNumberOfUsers = questions
        .filter(
          (question) => question.title === "How many users do you expect?"
        )[0]
        .options.filter((option) => option.selected)[0];
      const usersCostMultiplyer = expectedNumberOfUsers?.cost;
      //if userCostMultiplyer is not undefined subtract multiplyer from cost
      //and multiply the remaining cost with multiplyer
      if (usersCostMultiplyer) {
        cost -= usersCostMultiplyer;
        cost *= usersCostMultiplyer;
        setUsers(expectedNumberOfUsers.title);
      }
    }
    //Finally set the estimated cost state
    setEstimate(cost);
  };

  const getPlatforms = () => {
    let selectedPlatforms = [];

    if (questions.length > 2) {
      questions
        .filter(
          (question) =>
            question.title === "Which platforms do you need supported?"
        )[0]
        .options.filter((option) => option.selected)
        .map((selectedOption) => selectedPlatforms.push(selectedOption.title));
    }
    setPlatforms(selectedPlatforms);
  };

  const getFeatures = () => {
    let selectedFeatures = [];

    if (questions.length > 2) {
      questions
        .filter(
          (question) =>
            question.title === "Which features do you expect to use?"
        )
        .map((question) =>
          question.options
            .filter((option) => option.selected)
            .map((selectedOption) =>
              selectedFeatures.push(selectedOption.title)
            )
        );
    }
    setFeatures(selectedFeatures);
  };

  const getCustomFeatures = () => {
    if (questions.length > 2) {
      const featuresComplexity = questions
        .filter(
          (question) =>
            question.title ===
            "What type of custom features do you expect to need?"
        )
        .map((question) =>
          question.options.filter((option) => option.selected)
        )[0][0].title;

      setCustomFeatures(featuresComplexity);
    }
  };

  const getCategory = () => {
    if (questions.length === 2) {
      const websiteType = questions
        .filter(
          (question) =>
            question.title === "Which type of website are you wanting?"
        )[0]
        .options.filter((option) => option.selected)[0]?.title;
      setCategory(websiteType);
    }
  };

  const estimateDisabled = () => {
    let disabled = true;
    //Getting an unansweredQuestions List after removing the default question
    const unAnsweredQuestions = questions
      .filter(
        (question) => question.title !== "Which service are you interested in?"
      )
      .map((question) => question.options.filter((option) => option.selected))
      .filter((answeredQuestion) => answeredQuestion.length === 0);
    //Check if user has selected any type of service
    if (questions.length >= 2) {
      if (unAnsweredQuestions.length === 0) {
        disabled = false;
      } else if (questions.length > 2 && unAnsweredQuestions.length === 1) {
        if (
          questions
            .filter(
              (question) =>
                question.title !== "Which features do you expect to use?" &&
                question.title !== "Which service are you interested in?"
            )
            .map((question) =>
              question.options.filter((option) => option.selected)
            )
            .filter((unAnswered) => unAnswered.length === 0).length > 0
        ) {
          disabled = true;
        } else {
          disabled = false;
        }
      }
    } else {
      //if User hasn't selected any type of service than disable estimate
      disabled = true;
    }
    return disabled;
  };

  const placeRequest = () => {
    setLoading(true);
    axios
      .get("https://us-central1-beri-tech.cloudfunctions.net/sendMail", {
        params: {
          name: name,
          email: email,
          phone: phone,
          message: message,
          total: estimate,
          service: service,
          platforms: platforms,
          features: features,
          customFeatures: customFeatures,
          users: users,
        },
      })
      .then((res) => {
        setLoading(false);
        setOpen(false);
        setAlert({
          open: true,
          message: "Request has been placed successfully.",
          backgroundColor: "#4BB543",
        });
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setAlert({
          open: true,
          message: "Something went wrong! Please try again.",
          backgroundColor: "#FF3232",
        });
      });
  };

  const placeRequestButtonJSX = (
    <React.Fragment>
      Place Request
      <img src={send} alt="airplane" style={{ marginLeft: "10px" }} />
    </React.Fragment>
  );

  const softwareSelectionsJSX = (
    <Grid container direction="column" style={{ marginBottom: "2.5em" }}>
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        style={{ marginBottom: "1.25em" }}
      >
        <Grid item xs={2}>
          <img src={check} alt="checkmark" />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1">
            You want {service}{" "}
            {platforms.length > 0
              ? `for ${
                  //if only web application is selected...
                  platforms.indexOf("Web Application") > -1 &&
                  platforms.length === 1
                    ? //then finish sentence here
                      "a Web Application."
                    : //otherwise, if web application and another platform is selected...
                    platforms.indexOf("Web Application") > -1 &&
                      platforms.length === 2
                    ? //then finish the sentence here
                      `a Web Application and an ${platforms[1]}.`
                    : //otherwise, if only one platform is selected which isn't web application...
                    platforms.length === 1
                    ? //then finish the sentence here
                      `an ${platforms[0]}`
                    : //otherwise, if other two options are selected...
                    platforms.length === 2
                    ? //then finish the sentence here
                      "an iOS Application and an Android Application."
                    : //otherwise if all three are selected...
                    platforms.length === 3
                    ? //then finish the sentence here
                      "a Web Application, an iOS Application, and an Android Application."
                    : null
                }`
              : null}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        style={{ marginBottom: "1.25em" }}
      >
        <Grid item xs={2}>
          <img src={check} alt="checkmark" />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1">
            {" "}
            {"with "}
            {/* if we have features... */}
            {features.length > 0
              ? //...and there's only 1...
                features.length === 1
                ? //then end the sentence here
                  `${features[0]}.`
                : //otherwise, if there are two features...
                features.length === 2
                ? //...then end the sentence here
                  `${features[0]} and ${features[1]}.`
                : //otherwise, if there are three or more features...
                  features
                    //filter out the very last feature...
                    .filter((feature, index) => index !== features.length - 1)
                    //and for those features return their name...
                    .map((feature, index) => (
                      <span key={index}>{`${feature}, `}</span>
                    ))
              : null}
            {features.length > 0 &&
            features.length !== 1 &&
            features.length !== 2
              ? //...and then finally add the last feature with 'and' in front of it
                ` and ${features[features.length - 1]}.`
              : null}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        style={{ marginBottom: "1.25em" }}
      >
        <Grid item xs={2}>
          <img src={check} alt="checkmark" />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1">
            The custom features will be of {customFeatures.toLowerCase()}{" "}
            {`, and the project will be used by about ${users} users.`}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );

  const websiteSelectionJSX = (
    <Grid container direction="column" style={{ marginBottom: "2.5em" }}>
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        style={{ marginBottom: "1.25em" }}
      >
        <Grid item xs={2}>
          <img src={check} alt="checkmark" />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1">
            You want{" "}
            {category === "Basic"
              ? "a Basic Website."
              : `an ${category} Website.`}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Grid container direction="row" style={{ marginBottom: "10em" }}>
      <Grid item container direction="column" md>
        <Grid item className={classes.heading}>
          <Typography variant="h2">Estimate</Typography>
        </Grid>
        <Grid
          item
          ref={questionsRef}
          style={{
            marginTop: smaller ? 0 : medium ? "9em" : "7em",
            marginBottom: smaller ? 0 : "5em",
            height: smallest ? "10em" : smaller ? "17.5em" : "auto",
            marginRight: smaller ? "0" : "7.5em",
            maxWidth: smaller ? "100%" : "40em",
          }}
        >
          <Lottie options={defaultOptions} height="100%" width="100%" />
        </Grid>
      </Grid>
      <Grid item container direction="column" md>
        {questions
          .filter((question) => question.active)
          .map((question, index) => (
            <React.Fragment key={index}>
              <Grid item className={classes.question}>
                <Typography variant="h4" align="center">
                  {question.title}
                </Typography>
                <Typography variant="subtitle1" align="center" gutterBottom>
                  {question.subtitle}
                </Typography>
              </Grid>
              <Grid item container>
                {question.options.map((option, i) => (
                  <React.Fragment key={i}>
                    <Grid
                      item
                      container
                      alignItems="center"
                      //here we converted regular button component to display data in a grid !important styling
                      style={{
                        marginTop: smallest && i !== 0 ? "4em" : "2em",
                        textTransform: "none",
                        display: "grid",
                        backgroundColor: option.selected
                          ? theme.palette.common.orange
                          : null,
                        borderRadius: 0,
                      }}
                      component={Button}
                      onClick={() => handleOptionSelection(option.id)}
                      direction="column"
                      sm
                    >
                      <Grid item>
                        <img
                          src={option.icon}
                          alt={option.iconAlt}
                          className={classes.icon}
                        />
                      </Grid>
                      <Grid
                        item
                        style={{ maxWidth: "10em", marginTop: "0.5em" }}
                      >
                        <Typography variant="h6" align="center">
                          {option.title}
                        </Typography>
                        <Typography variant="caption" align="center">
                          {option.subtitle}
                        </Typography>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </React.Fragment>
          ))}
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          style={{ marginTop: "3em", marginBottom: "2.5em" }}
        >
          <Grid item>
            <IconButton
              className={classes.transparentOnHover}
              onClick={previousQuestion}
              disabled={previousQuestionDisabled()}
            >
              <img
                src={previousQuestionDisabled() ? backArrowDisabled : backArrow}
                alt="Previous question"
              />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              className={classes.transparentOnHover}
              onClick={nextQuestion}
              disabled={nextQuestionDisabled()}
            >
              <img
                src={
                  nextQuestionDisabled() ? forwardArrowDisabled : forwardArrow
                }
                alt="Next question"
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item align="center" style={{ marginTop: "3em" }}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.estimate}
            disabled={estimateDisabled()}
            onClick={() => {
              setOpen(true);
              calculateCost();
              getCategory();
              getPlatforms();
              getFeatures();
              getCustomFeatures();
            }}
          >
            Get Estimate
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="estimate-modal-title"
        fullScreen={smaller ? true : false}
        style={{ zIndex: 1303 }}
        maxWidth={smaller ? "sm" : "lg"}
      >
        <DialogTitle
          id="estimate-modal-title"
          className={classes.estimateModalHeading}
          disableTypography
        >
          <Typography variant="h4">Estimate</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container justifyContent="space-around">
            <Grid
              item
              container
              direction="column"
              md={7}
              style={{ maxWidth: "25em" }}
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
                  placeholder="Tell us about your project here..."
                  id="message"
                  rows={6}
                  value={message}
                  className={classes.message}
                  style={{ marginTop: "2em" }}
                  onChange={(e) => setMessage(e.target.value)}
                  multiline
                  fullWidth
                />
              </Grid>
              <Grid item style={{ marginTop: "1.5em" }}>
                <Typography variant="body1" align="justifyContent" paragraph>
                  We can create this digital solution for an estimated{" "}
                  <span className={classes.specialText}>
                    ${estimate.toFixed(2)}
                  </span>
                  .
                </Typography>
                <Typography variant="body1" align="justifyContent" paragraph>
                  Fill out your name, phone number and email to place your
                  request, and we'll get back to you with details moving forward
                  and a final price.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="column"
              alignItems="center"
              md={5}
              style={{
                paddingLeft: smaller ? 0 : "2em",
                maxWidth: "35em",
                marginTop: smaller ? "3em" : 0,
              }}
            >
              <Grid item>
                {questions.length > 2
                  ? softwareSelectionsJSX
                  : websiteSelectionJSX}
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.placeRequest}
                  onClick={placeRequest}
                  disabled={
                    name.length === 0 ||
                    nameHelperText.length !== 0 ||
                    email.length === 0 ||
                    emailHelperText.length !== 0 ||
                    phone.length === 0 ||
                    phoneHelperText.length !== 0 ||
                    message.length === 0
                  }
                >
                  {loading ? (
                    <CircularProgress size={25} />
                  ) : (
                    placeRequestButtonJSX
                  )}
                </Button>
              </Grid>
              <Hidden mdUp>
                <Grid item style={{ marginBottom: "3em" }}>
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={() => setOpen(false)}
                    className={classes.transparentOnHover}
                    disableRipple
                  >
                    Cancel
                  </Button>
                </Grid>
              </Hidden>
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
    </Grid>
  );
};

export default Estimate;
