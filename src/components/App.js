import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './styles/App.css'

import Home from "../pages/home";
import Aqueduct from "../pages/aqueduct";
import Aqueduct2 from "../pages/aqueduct2";
import Sewer from "../pages/sewer";
import Consumption from "../pages/consumption";
import AptosDetail from "../pages/aptos-detail";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />{" "}
        <Route exact path="/aqueduct" component={Aqueduct} />{" "}
        <Route exact path="/aqueduct2" component={Aqueduct2} />{" "}
        <Route exact path="/sewer" component={Sewer} />{" "}
        <Route exact path="/consumption" component={Consumption} />{" "}
        <Route exact path="/aptos-detail" component={AptosDetail} />{" "}
      </Switch>{" "}
    </BrowserRouter>
  );
}

export default App;