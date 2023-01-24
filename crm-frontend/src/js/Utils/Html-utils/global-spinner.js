export function isGlobalSpinnerShow(isShow, spinner) {
    if (!spinner) return;
    const $body = document.getElementsByTagName('body');
    if (isShow) {
        $body[0].style.overflow = 'hidden';
        spinner.style.display = 'block';
    } else {
        $body[0].style.overflow = 'visible';
        spinner.style.display = 'none';
    }
}
