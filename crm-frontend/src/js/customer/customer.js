import {getClientByID} from "../Utils/queries.js";
import {closeModal, openModal} from "../Utils/Custom-utils/modal-actions.js";
import {confirmDeletion} from "../Helpers/Remove-helpers/remove-client.js";
import {getModalContent} from "../Utils/Get-utils/get-modal-content.js";
import {createContactBlock} from "../Helpers/Create-helpers/create-contact-block.js";
import {isShowSpinner} from "../Utils/Html-utils/spinner.js";
import {fillFieldsWithData} from "./Customer-utils/fill-fields-with-data.js";
import {isGlobalSpinnerShow} from "../Utils/Html-utils/global-spinner.js";

const $deleteClientBtn = document.querySelector('.action-button-delete');
const $editClientBtn = document.querySelector('.action-button-edit');

const $editSpinner = document.querySelector('.spinner-btn-customer-edit');
const $deleteSpinner = document.querySelector('.spinner-btn-customer-delete');

const $modalConfirmDelete = document.querySelector('.delete-client-modal');
const $addNewClientModal = document.querySelector('.add-new-client-modal');
const $addContactBtn = document.querySelector('.add-new-contacts-block-customer');
const $modalWrapBG = document.querySelector('.modal-wrap-background');
const $closeBtn = document.querySelectorAll('.close-btn');



function getClientId() {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('customer');
}

export async function getClientData() {
    const clientId = getClientId();
    if (!clientId) return;
    const clientData = await getClientByID(clientId);
    fillFieldsWithData(clientData);
}

if ($deleteClientBtn) {
    $deleteClientBtn.addEventListener('click', () => {
        const id = $deleteClientBtn.dataset.id;
        $deleteSpinner.dataset.id = id;
        openModal($modalConfirmDelete);
        confirmDeletion(id, 'spinner-btn-customer-delete');
        isShowSpinner(id, false, 'spinner-btn-customer-delete');
    })
}

if ($editClientBtn) {
    $editClientBtn.addEventListener('click', async () => {
        const $editBtnIcon = document.querySelector('.edit-btn-icon');

        const clientId = $editClientBtn.dataset.id;
        $editBtnIcon.style.display = 'none';
        $editSpinner.dataset.id = clientId;

        isShowSpinner(clientId, true, 'spinner-btn-customer-edit');
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
        isShowSpinner(clientId, false, 'spinner-btn-customer-edit');
        $editBtnIcon.style.display = 'block';
    })
}

if ($addContactBtn) {
    $addContactBtn.addEventListener('click', () => {
            createContactBlock('', '');
    });
}

$modalWrapBG.addEventListener('click', closeModal);
$closeBtn.forEach((it) => {
    it.addEventListener('click', closeModal);
})

document.addEventListener('keydown', (e) => {
    const $openModal = document.querySelector('.modal-open');
    if ($openModal && e.key === 'Escape') {
        closeModal($openModal);
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const $globalSpinner = document.getElementById('global-spinner-customer');
    isGlobalSpinnerShow(true, $globalSpinner);
    await getClientData();
    isGlobalSpinnerShow(false, $globalSpinner);
});
