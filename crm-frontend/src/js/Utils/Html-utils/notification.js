let notificationTimerId;

function hideNotification() {
    const $notification = document.querySelector('.notification-wrap');
    $notification.style.opacity = '0';
    clearTimeout(notificationTimerId);
}

export function showNotification(notificationText) {
    const $notification = document.querySelector('.notification-wrap');
    $notification.textContent = '';
    $notification.textContent = notificationText;
    $notification.style.opacity = '1';
    notificationTimerId = setTimeout(hideNotification, 2000);
}


