import React, { Component } from "react";
import Form from "./Form";
import FormList from "./FormList";
import contactsFole from "./connacts/contacts.json";
import Filter from "./Filter";

class App extends Component {
  state = {
    contacts: contactsFole,
    filter: "",
  };

  getDataForm = (data) => {
    this.setState({ contacts: [data, ...this.state.contacts] });
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
    console.log(this.state.filter);
  };

  filteredContacts = () => {
    const normalizeContacts = this.state.filter.toLowerCase();
    return this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizeContacts)
    );
  };

  onDeleteButtonClick = (id) => {
    const contactName = this.state.contacts.filter(
      (contact) => contact.id !== id
    );
    this.setState({ contacts: contactName });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsetContacts = JSON.parse(contacts);

    if (parsetContacts) {
      this.setState({ contacts: parsetContacts });
    }
  }

  render() {
    const visibleContacts = this.filteredContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <Form
          propsForSubmit={this.getDataForm}
          contacts={this.state.contacts}
        />

        <Filter value={this.state.filter} filterContacts={this.changeFilter} />

        <FormList
          title={"Contacts"}
          data={visibleContacts}
          buttonClick={this.onDeleteButtonClick}
        />
      </div>
    );
  }
}

export default App;
