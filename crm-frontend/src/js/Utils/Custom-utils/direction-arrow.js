export function changeDirectionArrow(sortColumn) {
    const $arrow = sortColumn.querySelector('.header-row-item__icon');
    if ($arrow.dataset.dir === 'false') {
        $arrow.classList.add('header-row-item__icon-reverse');
        $arrow.dataset.dir = 'true';
    } else {
        $arrow.classList.remove('header-row-item__icon-reverse');
        $arrow.dataset.dir = 'false';
    }
}
