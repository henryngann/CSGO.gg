import React from "react";
//Components
import Homescreen from "./screens/Homescreen";
import Profilescreen from "./screens/Profilescreen";
import Wepscreen from "./screens/Wepscreen";
//React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/profile/:platform/:id"
          component={Profilescreen}
        ></Route>
        <Route
          exact
          path="/profile/:platform/:id/weapon"
          component={Wepscreen}
        ></Route>
        <Route exact path="/" component={Homescreen}></Route>
      </Switch>
    </Router>
  );
}

export default App;
