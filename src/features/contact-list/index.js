import React from 'react'
import fetch from 'isomorphic-fetch'
import Contact from './contact'

const url = 'https://student-example-api.herokuapp.com/v1/contacts.json?';

class ContactList extends React.Component {
  state = {
    contacts: [],
    per: 2,
    page: 1,
    totalPages: null
  }

  componentDidMount() {
    this.loadContacts()
  }

  loadContacts = () => {
    //
    // deconstruct the state
    //
    let {contacts, per, page} = this.state;

    let url2 = url + `per=${per}&page=${page}`
    
    fetch(url2)
      .then(response => response.json())      // response.json() returns body of the response
      .then(json => this.setState({           // in json form
      
       //contacts: json.contacts

       contacts: [
          ...contacts,                    
          ...json.contacts          //append newly fetched contacts 
        ]
    })).then( () => this.scrollTo())
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page+1
    }), this.loadContacts)
  }
  
  scrollTo = () => {
    let el = document.getElementById("loadMore");
    if (el) {
      el.scrollIntoView();
    }
  }

  render() {
    return (
      <div>
        <ul className="contacts">
          {this
            .state
            .contacts
            .map(contact => <li key={contact.id}>
              <Contact  {...contact} />
              
            </li>)
          }
        </ul>
        
        <a onClick={this.loadMore}>
          <span id='loadMore' style={{color: 'brown', fontWeight: 'bold'}}>Load more</span>
        </a>

        <div  style={{minHeight: '100px'}}>&nbsp;</div>

      </div>
    )
  }
}

export default ContactList