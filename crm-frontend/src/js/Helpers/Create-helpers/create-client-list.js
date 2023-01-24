import {getClientByID} from "../../Utils/queries.js";
import {createNewClientsRecord} from "./create-new-client-record.js";
import {openModal} from "../../Utils/Custom-utils/modal-actions.js";
import {isShowSpinner} from "../../Utils/Html-utils/spinner.js";
import {confirmDeletion} from "../Remove-helpers/remove-client.js";
import {getModalContent} from "../../Utils/Get-utils/get-modal-content.js";
import {getSortList} from "../../Utils/Custom-utils/sorting.js";
import {showNotification} from "../../Utils/Html-utils/notification.js";
import {createEmptyList} from "./create-empty-list.js";

export function createClientsList(list) {
    if (!list) return;
    const $table = document.querySelector('.table-body');
    const $modalConfirmDelete = document.querySelector('.delete-client-modal');
    const $addNewClientModal = document.querySelector('.add-new-client-modal');

    $table.textContent = '';
    for (const dataElement of list) {
        createNewClientsRecord(dataElement);
    }

    const clientLinks = document.querySelectorAll('.client-link');
    clientLinks.forEach((it) => {
        it.addEventListener('click', () => {
            window.location.href = `${it.href}`;
        })
    })

    const clientLinkTooltips = document.querySelectorAll('.client-link-tooltip');
    clientLinkTooltips.forEach((it) => {
        it.addEventListener('click', () => {
            const clientLink = it.dataset.link;
            navigator.clipboard.writeText(clientLink)
                .then(() => showNotification('Ссылка скопирована в буфер обмена'))
                .catch(() => showNotification('Ошибка копирования'));
        })
    })

    const $deleteButtons = document.querySelectorAll('.delete-record-btn');
    const $editButtons = document.querySelectorAll('.edit-btn');

    $deleteButtons.forEach((it) => {
        it.addEventListener('click', () => {
            openModal($modalConfirmDelete);
            confirmDeletion(it.dataset.id, 'delete');
            isShowSpinner(it.dataset.id, false, 'delete');
        });

    });

    $editButtons.forEach((it) => {
        it.addEventListener('click', async (e) => {
            isShowSpinner(it.dataset.id, true, 'edit');
            const clientId = it.dataset.id;
            const client = await getClientByID(clientId);
            openModal($addNewClientModal);
            const clientData = {
                id: clientId,
                surname: client.surname,
                name: client.name,
                lastName: client.lastName,
                contacts: client.contacts,
            }
            const modalData = {
                title: 'Изменить данные',
                client: clientData,
                btnName: 'Удалить клиента',
                btnType: 'delete',
                primaryBtnType: 'save-updated-client',
            }

            getModalContent(modalData);
            isShowSpinner(it.dataset.id, false, 'edit');

        });

    });

    const $showMoreContactsBtn = document.querySelectorAll('.show-more-contacts-btn');
    $showMoreContactsBtn.forEach((it) => {
        it.addEventListener('click', (e) => {
            const $hiddenContacts = e.target.parentNode.querySelectorAll('.contacts-icon-hidden');
            const $hiddenContactsBtn = e.target.parentNode.querySelector('.show-more-contacts-btn');
            $hiddenContacts.forEach((it) => {
                it.classList.remove('contacts-icon-hidden');
            })
            $hiddenContactsBtn.remove();
        })
    })
}



export async function createClientsListById() {
    let sortedList = await getSortList('id', true);
    if (!Array.isArray(sortedList) || sortedList.length === 0) createEmptyList(sortedList);
    else createClientsList(sortedList);
}
