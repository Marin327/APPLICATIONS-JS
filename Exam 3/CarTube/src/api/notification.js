const notificationElement = document.querySelector('.notification');
const messageElement = document.getElementById('message');
const timeout = 3000;

export function notify(message) {
    if (notificationElement) {
        messageElement.textContent = message;
        notificationElement.style.display = 'block';
        setTimeout(hideNotification, timeout)
    } else {
        alert(message);
    }
}

export function hideNotification() {
    notificationElement.style.display = '';
}
