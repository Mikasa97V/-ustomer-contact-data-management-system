export function isShowSpinner(id, isActive, action) {
    const $spinner = document.querySelectorAll(`.spinner-btn-wrap.${action}`);

    $spinner.forEach((it) => {
        if (it.dataset.id === id) {
            isActive ? it.style.display = 'block' : it.style.display = 'none';
        }
    })
}
