'use strict';

/**
 * Detail Component
 */

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContactDetail = function (_React$Component) {
  _inherits(ContactDetail, _React$Component);

  function ContactDetail(props) {
    _classCallCheck(this, ContactDetail);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = props.selectedContact;
    return _this;
  }

  ContactDetail.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState(nextProps.selectedContact);
  };

  ContactDetail.prototype.handleInputChange = function handleInputChange(e) {
    var _setState;

    this.setState((_setState = {}, _setState[e.target.name] = e.target.value, _setState));
  };

  ContactDetail.prototype.newContact = function newContact(e) {
    e.preventDefault();
    this.props.newContact();
  };

  ContactDetail.prototype.deleteContact = function deleteContact(e) {
    e.preventDefault();
    this.props.deleteContact(this.props.selectedContact);
  };

  ContactDetail.prototype.updateContact = function updateContact(e) {
    e.preventDefault();
    this.props.updateContact(this.state);
  };

  ContactDetail.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      "div",
      { className: "detail" },
      React.createElement(
        "div",
        { className: "header" },
        React.createElement(
          "div",
          { className: "body" },
          this.props.selectedContact._id ? 'Contact Details' : 'New Contact'
        ),
        this.props.selectedContact._id && React.createElement(
          "div",
          { className: "right" },
          React.createElement(
            "a",
            { href: "#",
              className: "btn",
              onClick: function onClick(e) {
                return _this2.deleteContact(e);
              }
            },
            "Delete"
          ),
          React.createElement(
            "a",
            { href: "#",
              className: "btn",
              onClick: function onClick(e) {
                return _this2.newContact(e);
              }
            },
            "New"
          )
        )
      ),
      React.createElement(
        "form",
        { onSubmit: function onSubmit(e) {
            return _this2.updateContact(e);
          } },
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "label",
            { htmlFor: "Name" },
            "Name"
          ),
          React.createElement("input", {
            type: "text",
            id: "Name",
            name: "Name",
            value: this.state.Name,
            onChange: function onChange(e) {
              return _this2.handleInputChange(e);
            }
          })
        ),
        React.createElement(
          "div",
          { className: "form-group" },
          React.createElement(
            "label",
            { htmlFor: "Phone" },
            "Phone"
          ),
          React.createElement("input", {
            type: "text",
            id: "Phone",
            name: "Phone",
            value: this.state.Phone,
            onChange: function onChange(e) {
              return _this2.handleInputChange(e);
            }
          })
        ),
        React.createElement(
          "div",
          { className: "action" },
          React.createElement("input", { type: "submit", className: "btn", value: this.props.selectedContact._id ? 'Update' : 'Save' })
        )
      )
    );
  };

  return ContactDetail;
}(React.Component);

/**
 * Main App
 */

var App = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App(props) {
    _classCallCheck(this, App);

    var _this3 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this3.emptyContact = {
      _id: '',
      Name: '',
      Phone: ''
    };
    _this3.state = {
      contacts: [],
      selectedContact: _this3.emptyContact,
      loading: true
    };
    return _this3;
  }

  App.prototype.componentDidMount = function componentDidMount() {
    this.getContacts();
  };

  App.prototype.selectContact = function selectContact(_id) {
    this.setState({
      selectedContact: this.state.contacts.find(function (contact) {
        return contact._id == _id;
      })
    });
  };

  App.prototype.newContact = function newContact() {
    this.setState({
      selectedContact: this.emptyContact
    });
  };

  App.prototype.fixedEncodeURIComponent = function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
  };

  App.prototype.toFormData = function toFormData(contact) {
    var array = [];
    for (var prop in contact) {
      array.push(prop + "=" + this.fixedEncodeURIComponent(contact[prop]));
    }
    return array.join('&');
  };

  App.prototype.reload = function reload(e) {
    e.preventDefault();
    this.getContacts();
  };

  App.prototype.getContacts = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var response, responseJson;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              this.setState({ loading: true });
              _context.next = 4;
              return fetch(this.props.config.apiUrl);

            case 4:
              response = _context.sent;
              responseJson = [];
              _context.prev = 6;
              _context.next = 9;
              return response.json();

            case 9:
              responseJson = _context.sent;

              this.setState({
                contacts: responseJson,
                selectedContact: this.emptyContact,
                loading: false
              });
              _context.next = 17;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](6);

              console.log(_context.t0);
              responseJson = [];

            case 17:
              _context.next = 22;
              break;

            case 19:
              _context.prev = 19;
              _context.t1 = _context["catch"](0);

              console.log(_context.t1);

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 19], [6, 13]]);
    }));

    return function getContacts() {
      return ref.apply(this, arguments);
    };
  }();

  App.prototype.updateContact = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(updatedContact) {
      var method;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              method = undefined;

              if (updatedContact._id == '') {
                delete updatedContact._id;
                method = 'POST';
              } else {
                method = 'PUT';
              }
              this.setState({ loading: true });
              _context2.prev = 3;
              _context2.next = 6;
              return fetch(this.props.config.apiUrl, {
                method: method,
                headers: {
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: this.toFormData(updatedContact)
              });

            case 6:
              this.getContacts();
              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](3);

              console.log(_context2.t0);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[3, 9]]);
    }));

    return function updateContact(_x) {
      return ref.apply(this, arguments);
    };
  }();

  App.prototype.deleteContact = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(contact) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.setState({ loading: true });
              _context3.prev = 1;
              _context3.next = 4;
              return fetch(this.props.config.apiUrl, {
                method: 'DELETE',
                headers: {
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: this.toFormData(contact)
              });

            case 4:
              this.getContacts();
              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](1);

              console.log(_context3.t0);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[1, 7]]);
    }));

    return function deleteContact(_x2) {
      return ref.apply(this, arguments);
    };
  }();

  App.prototype.render = function render() {
    var _this4 = this;

    return React.createElement(
      "div",
      null,
      React.createElement(
        "header",
        null,
        React.createElement(
          "div",
          { className: "body" },
          "Contacts"
        ),
        React.createElement(
          "div",
          { className: "right" },
          React.createElement(
            "a",
            {
              href: "#",
              className: "btn",
              onClick: function onClick(e) {
                return _this4.reload(e);
              }
            },
            "Reload"
          )
        )
      ),
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "main",
          null,
          React.createElement(
            "div",
            { className: "list" },
            this.state.contacts.length ? '' : 'No contacts',
            React.createElement(
              "ul",
              null,
              this.state.contacts.map(function (contact) {
                return React.createElement(
                  "li",
                  { key: contact._id },
                  React.createElement(
                    "a",
                    {
                      href: "#",
                      onClick: function onClick() {
                        return _this4.selectContact(contact._id);
                      },
                      className: _this4.state.selectedContact._id == contact._id ? 'selected' : '' },
                    React.createElement(
                      "span",
                      null,
                      contact.Name
                    ),
                    React.createElement("i", { className: "fa fa-arrow-right" })
                  )
                );
              })
            )
          ),
          React.createElement(ContactDetail, {
            selectedContact: this.state.selectedContact,
            newContact: function newContact() {
              return _this4.newContact();
            },
            updateContact: function updateContact(contact) {
              return _this4.updateContact(contact);
            },
            deleteContact: function deleteContact(contact) {
              return _this4.deleteContact(contact);
            } })
        )
      ),
      React.createElement(
        "div",
        { className: this.state.loading ? 'loading show' : 'loading' },
        React.createElement("div", { className: "loading-gif" }),
        " loading..."
      )
    );
  };

  return App;
}(React.Component);

var config = {
  apiUrl: "https://quiet-thicket-36443.herokuapp.com/api/contacts"
};

React.render(React.createElement(App, { config: config }), document.getElementById('app'));