import "./App.css";
import { nanoid } from "nanoid";
import { Component } from "react";
import { ContactForm } from "./Components/ContactForm/ContactForm";
import { ContactList } from "./Components/ContactList/ContactList";
import { Filter } from "./Components/Filter/Filter";

export class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
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
      localStorage.setItem(name, number);
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
        <h2 style={{textAlign: "start"}}>Contacts</h2>
        <Filter onChange={this.contactFilter} value={filter} />
        <ContactList
          contacts={this.contactVisible()}
          onDeleteContact={this.removeContact}
        />
      </div>
    );
  }
}
