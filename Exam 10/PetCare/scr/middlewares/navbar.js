const userLinks = document.querySelectorAll('.user')
const guestLinks = document.querySelectorAll('.guest')
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

    if (ctx.user) {
        userLinks.forEach(l => l.style.display = 'block');
        guestLinks.forEach(l => l.style.display = 'none');
        //greetingElement.textContent=`Welcome, ${ctx.user.email}`;
    } else {
        userLinks.forEach(l => l.style.display = 'none');
        guestLinks.forEach(l => l.style.display = 'block');
    }
    next();
}
