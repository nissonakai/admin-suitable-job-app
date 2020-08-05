import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import axios from "axios";
import { theme } from "./assets/theme";
import { Auth } from "./Auth";
import { Callback } from "./callback/Callback";
import { Login } from "./components/Login";

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

const auth = new Auth();

const App = () => {
  return (
    <MuiThemeProvider theme={theme} >
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
