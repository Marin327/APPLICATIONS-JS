const userLinks = document.getElementById('profile');
const guestLinks =  document.getElementById('guest');
const greetingElement = document.getElementById('greeting');

const links = {
    '/': document.getElementById('home'),
    '/listings': document.getElementById('listings'),
    '/by-year': document.getElementById('by-year'),
    '/login':  document.getElementById('login'),
    '/register':  document.getElementById('register'),
    '/my-list':  document.getElementById('my-list'),
    '/profile':  document.getElementById('greeting'),
    '/create':  document.getElementById('create'),
    '/logout':  document.getElementById('logout')
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
        greetingElement.textContent=`Welcome ${ctx.user.username}`;

    } else {
        userLinks.style.display = 'none';
        guestLinks.style.display = '';
    }
    next();
}
