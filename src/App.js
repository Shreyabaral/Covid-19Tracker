import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './nav'
import Footer from "./footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/home'

function App() {
  return (
    <div className="App">
   
   <Nav/>
     <Router>
       <Switch>
           <Route exact path="/" component={Home} />
       </Switch>
     </Router>
  
    
    <Footer/>
    </div>
  );
}

export default App;
