import {createContactLink} from "../../Utils/Html-utils/html-contact-tootip.js";
import {defaultIcon, fbIcon, mailIcon, phoneIcon, vkIcon} from "../../Utils/Html-utils/html-icons.js";

export function createClientContactRow(data) {
    const $contactListWrap = document.querySelector('.contact-list-wrap');
    const contactIcons = {
        'vk': vkIcon,
        'fb': fbIcon,
        'phone': phoneIcon,
        'mail': mailIcon,
        'def': defaultIcon,
    }

    const link = createContactLink(data);

    const $contactRow = `
            <div class="contact-row-items">
                <div class="contacts-row-icon">${contactIcons[data.type]}</div>
                <div class="contacts-row-link"><a href=${link} class="contact-link" target="_blank">${data.value}</a></div>
            </div>`;

    $contactListWrap.insertAdjacentHTML('beforeend', $contactRow);
}
