import React from 'react';
import { BrowserRouter, Switch, Route, /*Link,*/ Redirect } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';

document.body.classList.add('container-fluid', 'p-0', 'h-100');

function App() {
  return (
    <div className="App d-flex flex-column h-100">
      <Navbar hostUrl="." titleShort="tln.sh" titleLong="tln.sh"/>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Redirect to='/'/>
        </Switch>
      </BrowserRouter>
      <Footer version="v20.8.0"/>
    </div>
  );
}

export default App;
