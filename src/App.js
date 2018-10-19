import React, { Component } from 'react';
import ContactList from './features/contact-list'

class App extends Component {
  render() {
    return (
      <div className="container">
        <h3>Contacts : inifinite-scroll branch</h3>
        <ContactList />
      </div>
    );
  }
}

export default App;

// master branch