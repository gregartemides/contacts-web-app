'use strict';

/**
 * Detail Component
 */
class ContactDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.selectedContact
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.selectedContact);
  }
  
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  newContact(e) {
    e.preventDefault();
    this.props.newContact();
  }
  
  deleteContact(e) {
    e.preventDefault();
    this.props.deleteContact(this.props.selectedContact);
  }
  
  updateContact(e) {
    e.preventDefault();
    this.props.updateContact(this.state);
  }
  
  render() {
    return <div className="detail">
      <div className="header">
        <div className="body">{this.props.selectedContact._id ? 'Contact Details' : 'New Contact'}</div>
        { this.props.selectedContact._id &&
        <div className="right">
          <a href="#" 
            className="btn" 
            onClick={(e) => this.deleteContact(e)}
          >Delete</a>
          <a href="#" 
            className="btn" 
            onClick={(e) => this.newContact(e)}
          >New</a>
        </div>
        }
      </div>
      <form onSubmit={(e) => this.updateContact(e)}>
        <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input 
            type="text"
            id="Name" 
            name="Name"
            value={this.state.Name} 
            onChange={(e) => this.handleInputChange(e)} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="Phone">Phone</label>
          <input 
            type="text"
            id="Phone"
            name="Phone"
            value={this.state.Phone} 
            onChange={(e) => this.handleInputChange(e)} 
          />
        </div>
        <div className="action">
          <input type="submit" className="btn" value={this.props.selectedContact._id ? 'Update' : 'Save'} />
        </div>
      </form>
    </div>
  }
}


/**
 * Main App
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.emptyContact = {
      _id: '',
      Name: '',
      Phone: ''
    };
    this.state = {
      contacts: [],
      selectedContact: this.emptyContact,
      loading: true
    }
  }
  
  componentDidMount() {
    this.getContacts();
  }
  
  selectContact(_id) {
    this.setState({
      selectedContact: this.state.contacts.find(contact => contact._id == _id)
    });
  }
  
  newContact() {
    this.setState({
      selectedContact: this.emptyContact
    });
  }
  
  fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
  }
  
  toFormData(contact) {
    let array = [];
    for (let prop in contact) {
      array.push(`${prop}=${this.fixedEncodeURIComponent(contact[prop])}`);
    }
    return array.join('&');
  }
  
  reload(e) {
    e.preventDefault();
    this.getContacts();
  }
  
  async getContacts() {
    try {
      this.setState({loading: true});
      let response = await fetch(this.props.config.apiUrl);
      let responseJson = [];
      try {
        responseJson = await response.json();
        this.setState({ 
          contacts: responseJson,
          selectedContact: this.emptyContact,
          loading: false
        });
      } catch (error) {
        console.log(error);
        responseJson = [];
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  async updateContact(updatedContact) {
    let method;
    if (updatedContact._id == '') {
      delete updatedContact._id
      method = 'POST';
    } else {
      method = 'PUT';
    }
    this.setState({loading: true});
    try {
      await fetch(this.props.config.apiUrl, {
        method: method,
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: this.toFormData(updatedContact)
      });
      this.getContacts();
    } catch (error) {
      console.log(error);
    }
  }
  
  async deleteContact(contact) {
    this.setState({loading: true});
    try {
      await fetch(this.props.config.apiUrl, {
        method: 'DELETE',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: this.toFormData(contact)
      });
      this.getContacts();
    } catch (error) {
      console.log(error);
    }
  }
  
  render() {
    return <div>
      <header>
        <div className="body">Contacts</div>
        <div className="right">
          <a 
            href="#" 
            className="btn"
            onClick={(e) => this.reload(e)}
          >Reload</a>
        </div>
      </header>
      <div className="container">
        <main>
          <div className="list">
            { this.state.contacts.length ? '' : 'No contacts' }
            <ul>
              { this.state.contacts.map(contact => 
                   <li key={contact._id}>
                      <a 
                        href="#" 
                        onClick={() => this.selectContact(contact._id)}
                        className={this.state.selectedContact._id == contact._id ? 'selected' : ''}>
                        <span>{contact.Name}</span> 
                        <i className="fa fa-arrow-right"></i>
                      </a>
                   </li>
               )}
            </ul>
          </div>
          <ContactDetail
            selectedContact={this.state.selectedContact}
            newContact={() => this.newContact()}
            updateContact={(contact) => this.updateContact(contact)}
            deleteContact={(contact) => this.deleteContact(contact)} />
        </main>
      </div>
      <div className={this.state.loading ? 'loading show' : 'loading'}>
        <div className="loading-gif"></div>&nbsp;loading...
      </div>
    </div>
  }
}

const config = {
  apiUrl: "https://quiet-thicket-36443.herokuapp.com/api/contacts"
};

React.render(
  <App config={config} />, 
  document.getElementById('app')
);