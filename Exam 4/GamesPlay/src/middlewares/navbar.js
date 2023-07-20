const userLinks = document.querySelector('#user')
const guestLinks =  document.querySelector('#guest')
//const greetingElement = document.getElementById('greeting');
//
// const links = {
//     '/': document.getElementById('logo'),
//     '/dashboard': document.getElementById('dashboard'),
//     '/search': document.getElementById('search'),
//     '/add': document.getElementById('add'),
//     '/login':  document.getElementById('login'),
//     '/register':  document.getElementById('register')
// }

export function updateNav(ctx, next) {
    // Object.values(links).forEach(l => l.classList.remove('active'))
    // let current = links[ctx.pathname];
    // if(current) {
    //     current.classList.add('active')
    // }

    if(ctx.user) {
        userLinks.style.display = 'block';
        guestLinks.style.display = 'none';
        //greetingElement.textContent=`Welcome, ${ctx.user.email}`;

    } else {
        userLinks.style.display = 'none';
        guestLinks.style.display = 'block';
    }
    next();
}
