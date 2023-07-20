const userLinks = document.querySelectorAll('.user')
const guestLinks =  document.querySelectorAll('.guest')


export function updateNav(ctx, next) {
    if(ctx.user) {
        userLinks.forEach(l=>l.style.display = '');
        guestLinks.forEach(l=>l.style.display = 'none');
        //greetingElement.textContent=`Welcome, ${ctx.user.email}`;

    } else {
        userLinks.forEach(l=>l.style.display = 'none');
        guestLinks.forEach(l=>l.style.display = '');
    }
    next();
}
