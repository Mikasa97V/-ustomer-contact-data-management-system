import {createContactTooltip} from "../../Utils/Html-utils/html-contact-tootip.js";
import {vkIcon, fbIcon, phoneIcon, mailIcon, defaultIcon} from "../../Utils/Html-utils/html-icons.js";

const headingsTooltip = {
    'vk': {title: 'Vkontakte: ', icon: vkIcon},
    'fb': {title: 'Facebook: ', icon: fbIcon},
    'phone': {title: 'Телефон: ', icon: phoneIcon},
    'mail': {title: 'Email: ', icon: mailIcon},
    'def': {title: 'Другое: ', icon: defaultIcon},
}

export default function createContacts(list, parentWrap) {
    for (const item of list) {
        let contactIcon = headingsTooltip[item.type].icon;
        const title = headingsTooltip[item.type].title;
        let contactTooltip = createContactTooltip(item, title);

        const contact = `
            <div class="contacts-icon">${contactTooltip} ${contactIcon}</div>
        `;
        parentWrap.insertAdjacentHTML('beforeend', contact);
    }

    if (list.length > 5) {
        const $showMoreContactsBtn = `
            <div class="show-more-contacts-btn">+${list.length - 4}</div>
        `;
        parentWrap.insertAdjacentHTML('beforeend', $showMoreContactsBtn);
        const $contactsIcon = parentWrap.querySelectorAll('.contacts-icon');
        for (let i = 4; i < $contactsIcon.length; i++) {
            $contactsIcon[i].classList.add('contacts-icon-hidden');
        }
    }

}
