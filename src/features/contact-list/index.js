import React from 'react'
import fetch from 'isomorphic-fetch'
import Contact from './contact'

class ContactList extends React.Component {
  state = {
    contacts: [],
    per: 5,
    page: 1,
    totalPages: null,
    scrolling: false,
  }

  componentDidMount() {
    this.loadContacts()
    this.scrollListener = window.addEventListener('scroll', (e) => {
      this.handleScroll(e)
    })
  }
  
  handleScroll = () => {
    const { scrolling, totalPages, page } = this.state
    if (scrolling) return
    if (totalPages <= page) return
    let lastLi = document.querySelector('ul.contacts > li:last-child')

    // let ul = document.querySelector('ul.contacts')
    // let li = document.querySelector('li:last-child');
    // console.log('handleScroll.li:last-child', li)

    //The offsetTop property returns the top position (in pixels) relative to the top of the offsetParent element.
    //The clientHeight property returns the viewable height of an element in pixels, including padding, but not 
    //  the border, scrollbar or margin.
    let lastLiOffset = lastLi.offsetTop + lastLi.clientHeight

    //The pageXOffset and pageYOffset properties returns the pixels the current document has been scrolled from 
    //  the upper left corner of the window, horizontally and vertically.
    //The innerHeight property returns the height of a window's content area.
    let pageOffset = window.pageYOffset + window.innerHeight
    let bottomOffset = 20

    if (pageOffset > lastLiOffset - bottomOffset) {
      this.loadMore()
    }
    
  }

  loadContacts = () => {
    const { per, page, contacts } = this.state
    const url = `https://student-example-api.herokuapp.com/v1/contacts.json?per=${per}&page=${page}`
    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({
        contacts: [...contacts, ...json.contacts],
        scrolling: false,
        totalPages: json.total_pages,
      }))
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page+1,
      scrolling: true,
    }), this.loadContacts)
  }

  render() {
    return <ul className="contacts contact-container">
      {
        this.state.contacts.map(contact => <li key={contact.id}>
          <Contact {...contact} />
        </li>)
      }
    </ul>
  }
}

export default ContactList