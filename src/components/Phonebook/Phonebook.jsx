
import { nanoid } from "nanoid";

import FormContacts from "components/FormContacts/FormContacts";
import FormFind from "components/FormFind/FormFind";
import css from './Phonebook.module.css';
import { useState, useEffect } from "react";

const KEYCONTACTS = "contacts";

const Phonebook = () => {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState("")


    useEffect(() => {
        if (localStorage.getItem(KEYCONTACTS)) {
            setContacts(JSON.parse(localStorage.getItem(KEYCONTACTS)));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(KEYCONTACTS, JSON.stringify(contacts));
    }, [contacts]);

    const onSubmit = (user) => {
        if (contacts && contacts.find(contact => {
            const normalizeUser = user.name.toLowerCase();
            return contact.name.toLowerCase() === normalizeUser
        })) { alert("Даний контакт вже є в телефонній") }
        else {
            const newUser = { id: nanoid(), ...user }
            setContacts((pref) => [...pref, newUser])
        }
    }

    const handleChange = e => {
        setFilter(e.target.value)
    };

    const handleRemove = e => {
        setContacts(contacts.filter(value => value.id !== e.currentTarget.parentNode.id))
    };

    const getVizibleContacts = () => {
        const normalizedFilter = filter.toLowerCase();

        if (contacts) {
            return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
        };

        return []

    };


    return (
        <>
            <h1 className={css.title}>Phonebook</h1>

            <FormContacts onSubmit={onSubmit} name />

            <h2 className={css.title}>Contacts</h2>

            <FormFind handleChange={handleChange} value={filter} />

            <ul className={css.contactsList}>
                {getVizibleContacts().map((contact) =>
                    <li className={css.item} key={contact.id} id={contact.id}>
                        {contact.name} {contact.number}
                        <button type="button" className="btn-close" aria-label="Close" onClick={handleRemove}></button>
                    </li>
                )}
            </ul>
        </>
    );

};

export default Phonebook;