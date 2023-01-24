import {undoPhoneMask} from "../Custom-utils/phone-imask.js";

export function createContactLink(item) {
    const linkType = {
        'phone': 'tel:',
        'mail': 'mailto:',
    }
    let linkPrefix = '';
    let linkValue = item.value;
    for (const linkTypeKey in linkType) {
        if (item.type === linkTypeKey) {
            linkPrefix = linkType[linkTypeKey]
        }
    }
    if (item.type === 'phone') {
        linkValue = undoPhoneMask(item.value);
    }
    return `${linkPrefix}${linkValue}`;
}

export function createContactTooltip(item, title) {
    const linkHref = createContactLink(item);

    return `
            <div class="tooltip-wrap">
                <div class="tooltip-content-block">
                    <div class="tooltip-text-content-wrap">
                         <div class="tooltip-triangle"></div>
                        <span class="tooltip-text-content-title zIndex2">${title}</span>
                        <span class="tooltip-text-content tooltip-text-link zIndex2">
                            <a href=${linkHref} class="tooltip-text-link" target="_blank">${item.value}</a>
                        </span>
                    </div>
                </div>
            </div>`;
}
