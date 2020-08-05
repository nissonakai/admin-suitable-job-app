import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Container } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import axios from "axios";
import { theme } from "./assets/theme";
import { Auth } from "./Auth";
import { Callback } from "./callback/Callback";
import { Login } from "./components/Login";
import { Surveys } from "./components/Surveys";
import { Questions } from "./components/Questions";

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

const auth = new Auth();

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    marginBottom: "1.5em"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const classes = useStyles();

  const [surveys, setSurveys] = useState([]);
  const [vQuestions, setvQuestions] = useState([]);
  const [pQuestions, setpQuestions] = useState([]);

  useEffect(() => {
    const getSurveys = () => {
      axios.get(process.env.REACT_APP_SJC_SURVEYS)
        .then(results => {
          const data = results.data.data;
          setSurveys(data);
        }).catch(err => {
          console.log(err);
        });
    };

    const getvQuestions = () => {
      axios.get(process.env.REACT_APP_SJC_VQUESTIONS)
        .then(results => {
          const data = results.data.data;
          setvQuestions(data);
        }).catch(err => {
          console.log(err);
        });
    };

    const getpQuestions = () => {
      axios.get(process.env.REACT_APP_SJC_PQUESTIONS)
        .then(results => {
          const data = results.data.data;
          setpQuestions(data);
        }).catch(err => {
          console.log(err);
        });
    };

    getSurveys();
    getvQuestions();
    getpQuestions();
  },[]);

  return (
    <MuiThemeProvider theme={theme} className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
            <Typography variant="h6" component="h1" className={classes.title}>
              適職診断管理画面
          </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Login auth={auth} />
            </Route>
            <Route
              path="/callback"
              exact
              render={props => (
                <Callback {...props} auth={auth} />
              )}
            />
            <Route path="/surveys" exact>
                <Surveys surveys={surveys}/>
            </Route>
            <Route path="/values/:survey_id" exact>
              <Questions questions={vQuestions} type="values" />
            </Route>
            <Route path="/personality/:survey_id" exact>
              <Questions questions={pQuestions} type="personality" />
            </Route>
          </Switch>
        </Router>
      </Container>
    </MuiThemeProvider>
  );
}

export default App;
