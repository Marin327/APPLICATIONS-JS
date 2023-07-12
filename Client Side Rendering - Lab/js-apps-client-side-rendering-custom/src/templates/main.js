import navbarTemplate from './navbar.js';
import contactListTemplate from './contactList.js';


const mainTemplate = (data) => `
    <header>
        ${navbarTemplate()}
    </header>
    <main>
        ${contactListTemplate(data.contacts)}
    </main>
`;

export default mainTemplate;