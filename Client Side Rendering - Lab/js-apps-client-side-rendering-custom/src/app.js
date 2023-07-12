import mainTemplate from './templates/main.js';
import render from './render.js';
import { getContacts } from './api.js';

const rootElement = document.getElementById('root');

const contacts = await getContacts();

render(mainTemplate({ contacts }), rootElement);

// Don't do this at home
window.addContact = function () {
    fetch('http://localhost:3030/jsonstore/contacts', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ person: 'Stamat', phone: '087343126' })
    })
        .then(res => res.json())
        .then(contact => {
            render(mainTemplate({ contacts: [...contacts, contact] }), rootElement);
        });
}