import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <h1 className="header mt-0 mb-0">Fake Store</h1>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/product/:id" component={ProductDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
