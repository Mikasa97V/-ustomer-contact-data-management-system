import {getElementCenterCoordinates} from "../Get-utils/get-element-center-coordinates.js";

const $tooltipDeleteBtn = document.querySelector('.tooltip-delete-contact-btn');

export function showTooltip(it) {
    const {centerX, centerY} = getElementCenterCoordinates(it);
    $tooltipDeleteBtn.style.opacity = '1';
    $tooltipDeleteBtn.style.visibility = 'visible';
    $tooltipDeleteBtn.style.top = (centerY - 60) + 'px';
    $tooltipDeleteBtn.style.left = centerX + 'px';
}

export function hideTooltip() {
    $tooltipDeleteBtn.style.opacity = '0';
    $tooltipDeleteBtn.style.visibility = 'hidden';
}
