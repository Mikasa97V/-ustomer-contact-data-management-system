import {emptyListIcon} from "./html-icons.js";

export function createEditBtn(id) {
    return `
            <button class="edit-btn action-client-btn" data-id=${id}>
                <div class="spinner-btn-wrap edit spinner-btn-wrap-edit" data-id=${id}>
                    <svg class="spinner-btn" viewBox="0 0 50 50">
                        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                    </svg>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.7" clip-path="url(#clip0_121_2458)">
                    <path d="M2 11.5002V14.0002H4.5L11.8733 6.62687L9.37333 4.12687L2 11.5002ZM13.8067 4.69354C14.0667 4.43354 14.0667 4.01354 13.8067 3.75354L12.2467 2.19354C11.9867 1.93354 11.5667 1.93354 11.3067 2.19354L10.0867 3.41354L12.5867 5.91354L13.8067 4.69354Z" fill="#9873FF"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_121_2458">
                    <rect width="16" height="16" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
                Изменить
            </button>`;
}

export function createDeleteBtn(id) {
    return `
            <button class="delete-record-btn action-client-btn" data-id='${id}'>
                <div class="spinner-btn-wrap delete spinner-btn-wrap-delete" data-id=${id}>
                    <svg class="spinner-btn" viewBox="0 0 50 50">
                        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                    </svg>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.7" clip-path="url(#clip0_121_2468)">
                    <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_121_2468">
                    <rect width="16" height="16" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
                Удалить
            </button>`;
}

export function createSelect(data) {
    const {contactId, contactRowId, contactSelectOption, value} = data;
    return `
            <div class="contact-wrap-items" data-id=${contactId} id=${contactRowId}>
                <div>
                <select name="select" class="CustomSelect">
                    <option value="phone" class=${contactSelectOption}>Телефон</option>
                    <option value="def" class=${contactSelectOption}>Другое</option>
                    <option value="mail" class=${contactSelectOption}>Email</option>
                    <option value="vk" class=${contactSelectOption}>Vk</option>
                    <option value="fb" class=${contactSelectOption}>Facebook</option>
                </select>
                </div>
                <input class="inputs select-input" id=${contactRowId} placeholder="Введите данные контакта" value=${value}>
                <button class="delete-contact-btn" data-id=${contactId}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_121_2516)">
                        <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_121_2516">
                        <rect width="16" height="16" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>`;
}

export function createActionButtons(id) {
    const $actionButtonsWrap = document.createElement('div');
    $actionButtonsWrap.classList.add('action-buttons');

    const $editButton = createEditBtn(id);
    const $deleteButton = createDeleteBtn(id);


    $actionButtonsWrap.insertAdjacentHTML('beforeend', $editButton);
    $actionButtonsWrap.insertAdjacentHTML('beforeend', $deleteButton);


    return $actionButtonsWrap;
}

export function createClientLinkTooltip(link) {
    const clientLink = `http://localhost:63342/crm-frontend/src/${link}`;
    return `
            <div class="tooltip-wrap client-link-tooltip" data-link=${clientLink}>
                <div class="tooltip-content-block">
                    <div class="tooltip-text-content-wrap">
                         <div class="tooltip-triangle"></div>
                        <span class="tooltip-text-content-title zIndex2">Нажмите, чтобы скопировать ссылку на карточку клиента</span>
                    </div>
                </div>
            </div>`;
}

export function createEmptyListTable() {
    return `
            <td colspan="6">
               <div class="empty-list-wrap">
                    ${emptyListIcon}
                    <div>Список пуст</div>
                </div>
            </td>`;
}
