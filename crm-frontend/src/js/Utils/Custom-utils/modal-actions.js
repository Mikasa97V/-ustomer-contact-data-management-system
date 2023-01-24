const $body = document.getElementsByTagName('body');
const $modalWrap = document.querySelector('.modal-wrap');


function clearInputs() {
    const $clientSurname = document.querySelector('#surname');
    const $clientName = document.querySelector('#name');
    const $clientLastname = document.querySelector('#lastname');
    const $contactSelectWrap = document.querySelector('.add-contact-wrap');
    const $errorsWrap = document.querySelector('.errors-message-block');
    const $formInputs = document.querySelectorAll('.form-wrap__field');

    $clientSurname.value = '';
    $clientName.value = '';
    $clientLastname.value = '';
    $contactSelectWrap.textContent = '';
    $errorsWrap.textContent = '';

    $formInputs.forEach((it) => {
        it.style.borderColor = 'var(--grey)';
    })
}

function removeDisplay() {
    for (let item of $modalWrap.children) {
        if (!item.classList.contains('modal-wrap-background')) {
            item.style.display = 'none';
        }
    }
}

export function closeModal() {
    const $modal = document.querySelector('.modal-open');
    const $closeBtn = document.querySelectorAll('.close-btn');

    if ($modal) $modal.classList.remove('animate__zoomIn','modal-open');
    clearInputs();
    $body[0].style.overflow = 'visible';
    $modalWrap.style.display = 'none';
    removeDisplay();

    $closeBtn.forEach((it) => {
        it.addEventListener('click', closeModal);
    })
}

export function openModal(modal) {
    const $errorMassageBlock = document.querySelector('.errors-message-block');
    const $addContactBtn = document.querySelector('.add-new-contacts-block');
    const $addContactBtnCustomer = document.querySelector('.add-new-contacts-block-customer');
    $body[0].style.overflow = 'hidden';
    $errorMassageBlock.textContent = '';
    $modalWrap.style.display = 'block';
    modal.classList.add('animate__zoomIn', 'modal-open');
    modal.style.display = 'block';

    if ($addContactBtn) $addContactBtn.style.display = 'flex';
    if ($addContactBtnCustomer) $addContactBtnCustomer.style.display = 'flex';

}
