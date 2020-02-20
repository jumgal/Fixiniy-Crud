import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Customers from './components/Customers';
import NavBar from './components/NavBar';
import Feedbacks from './components/Feedbacks';
import Contact from './components/Contact';
import NotFound from './components/NotFound';



class App extends Component {

  render() {
    return (<div>
      <NavBar />
      <main className='container'>
        <Switch>
          <Route path="/customers" component={Customers} />
          <Route path="/feedbacks" component={Feedbacks} />
          <Route path="/contact" component={Contact} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/customers" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </div>
    )
  }
}


export default App;
