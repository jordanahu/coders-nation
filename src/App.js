import React from 'react';
import {Home, Login, Reset, AuthProvider,
        Dashboard, PrivateRoute} from "./components"
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {


  
  return (
    <AuthProvider>
      <Router>
    <div className="App">
    <Route path="/" exact component={Home}/>
    <Switch>
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <Route path="/login" component={Login}/>
      <Route path="/reset" component={Reset}/>
    </Switch>
    </div>
    
    </Router>
    </AuthProvider>
  );
}

export default App;
