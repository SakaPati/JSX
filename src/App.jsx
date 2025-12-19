import "./App.css";
import { nanoid } from "nanoid";
import { Component } from "react";
import { ContactForm } from "./Components/ContactForm/ContactForm";
import { ContactList } from "./Components/ContactList/ContactList";
import { Filter } from "./Components/Filter/Filter";

export class App extends Component {
  componentDidMount() { 
    const savedData = localStorage.getItem("contacts");
    if (savedData) {
      this.setState({
        contacts: JSON.parse(savedData)
      });
     }
  }

  componentDidUpdate(prevState) { 
    if (prevState.contacts !== this.state.contacts) { 
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
    }
  }
  state = {
    contacts: [],
    filter: "",
    name: "",
    number: "",
  };

  addContact = ({ name, number }) => {
    const contacts = this.state.contacts;
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    if (!contacts.find((contact) => contact.number === number)) {
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contact],
      }));
    } else {
      alert("Этот контакт уже существуют");
    }
  };

  removeContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  contactFilter = (e) => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  contactVisible = () => {
    const { contacts, filter } = this.state;
    const normalize = filter.toLowerCase();

    return contacts.filter(({ name, number }) =>
      [name, number].some((field) => field.toLowerCase().includes(normalize))
    );
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2 style={{ textAlign: "start" }}>Contacts</h2>
        <Filter onChange={this.contactFilter} value={filter} />
        <ContactList
          contacts={this.contactVisible()}
          onDeleteContact={this.removeContact}
        />
      </div>
    );
  }
}
