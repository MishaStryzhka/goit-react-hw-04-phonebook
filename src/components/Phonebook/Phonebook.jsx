import { Component } from "react";
import { nanoid } from "nanoid";

import FormContacts from "components/FormContacts/FormContacts";
import FormFind from "components/FormFind/FormFind";
import css from './Phonebook.module.css';

const KEYCONTACTS = "contacts";

class Phonebook extends Component {
    state = {
        contacts: [],
        filter: ''
    }

    componentDidMount = () => {
        if (localStorage.getItem(KEYCONTACTS)) {
            this.setState({ contacts: JSON.parse(localStorage.getItem(KEYCONTACTS)) })
        }
    }


    componentDidUpdate = (_, prevState) => {
        if (this.state.contacts) {
            if (prevState.contacts.length !== this.state.contacts.length) {
                console.log(this.state.contacts);
                localStorage.setItem(KEYCONTACTS, JSON.stringify(this.state.contacts));
            }
        }
    }

    onSubmit = (user) => {
        if (this.state.contacts && this.state.contacts.find(contact => {
            const normalizeUser = user.name.toLowerCase();
            return contact.name.toLowerCase() === normalizeUser
        })) { alert("Даний контакт вже є в телефонній") }
        else {
            const newUser = { id: nanoid(), ...user }
            return this.state.contacts
                ? this.setState((prefState) => ({ ...prefState, contacts: [...prefState.contacts, newUser] }))
                : this.setState({ contacts: [newUser] })
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleRemove = e => {
        this.setState({ contacts: this.state.contacts.filter(value => value.id !== e.currentTarget.parentNode.id) })
    }

    getVizibleContacts = () => {
        const { contacts, filter } = this.state;

        const normalizedFilter = filter.toLowerCase();

        if (contacts) {
            return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
        };

        return []

    }

    render() {
        return (
            <>
                <h1 className={css.title}>Phonebook</h1>

                <FormContacts onSubmit={this.onSubmit} name />

                <h2 className={css.title}>Contacts</h2>

                <FormFind handleChange={this.handleChange} value={this.state.filter} />

                <ul className={css.contactsList}>
                    {this.getVizibleContacts().map((contact) =>
                        <li className={css.item} key={contact.id} id={contact.id}>
                            {contact.name} {contact.number}
                            <button type="button" className="btn-close" aria-label="Close" onClick={this.handleRemove}></button>
                        </li>
                    )}
                </ul>
            </>
        );
    };

}

export default Phonebook;