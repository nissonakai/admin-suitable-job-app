import React from 'react';
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
          </Switch>
        </Router>
      </Container>
    </MuiThemeProvider>
  );
}

export default App;
