export function getElementCenterCoordinates(elem) {
    const width = elem.offsetWidth;
    const height = elem.offsetHeight;

    const rect = elem.getBoundingClientRect();
    const left = rect.left + window.scrollX;
    const top = rect.top + window.scrollY;

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    return {centerX, centerY}
}
