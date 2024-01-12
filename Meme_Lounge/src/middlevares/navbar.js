import {hideNotification} from "../api/notification.js";

const userLinks = document.querySelector('.user')
const guestLinks =  document.querySelector('.guest')
const greetingElement = document.getElementById('greeting');

const links = {
    '/memes': document.getElementById('memes'),
    '/create': document.getElementById('create'),
    '/': document.getElementById('home'),
    '/profile': document.getElementById('profile'),
    '/login':  document.getElementById('login'),
    '/register':  document.getElementById('register')
}

export function updateNav(ctx, next) {
    Object.values(links).forEach(l => l.classList.remove('active'))
    let current = links[ctx.pathname];
    if(current) {
        current.classList.add('active')
    }

    if(ctx.user) {
        userLinks.style.display = '';
        guestLinks.style.display = 'none';
        greetingElement.textContent=`Welcome, ${ctx.user.email}`;

    } else {
        userLinks.style.display = 'none';
        guestLinks.style.display = '';
    }
    next();
}
