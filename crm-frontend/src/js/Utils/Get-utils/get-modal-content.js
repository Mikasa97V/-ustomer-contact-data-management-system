import {closeModal, openModal} from "../Custom-utils/modal-actions.js";
import {confirmDeletion} from '../../Helpers/Remove-helpers/remove-client.js';
import {createContactBlock} from "../../Helpers/Create-helpers/create-contact-block.js";
import {saveNewClient} from "../../Helpers/Save-helpers/save-new-client.js";
import {saveUpdatedClient} from "../../Helpers/Save-helpers/save-updated-client.js";
import {errorMessageArray, isValidField, validateInputFields} from "../validations.js";
import {showFormErrors} from "../Custom-utils/show-errors.js";
import {createModalContent} from "../../Helpers/Create-helpers/create-modal-content.js";


export function getModalContent(data) {
    const $saveClientBtn = document.querySelector('.save-client');
    const $modalConfirmDelete = document.querySelector('.delete-client-modal');
    const {client} = data;
    createModalContent(data);

    const $closeModalBtn = document.querySelectorAll('.close-btn[data-type="close"]');
    const $deleteClientModalBtn = document.querySelectorAll('.close-btn[data-type="delete"]');


    $closeModalBtn.forEach((it) => {
        it.addEventListener('click', () => {
            closeModal();
        })
    });

    $deleteClientModalBtn.forEach((it) => {
        it.addEventListener('click', () => {
            openModal($modalConfirmDelete);
            confirmDeletion(client.id, 'delete');
        })
    });

    if (client.id) {
        for (const contactItem of client.contacts) {
            createContactBlock(contactItem.type, contactItem.value, client.contacts.length);

        }
    }

    const $modalFields = document.querySelectorAll('.form-wrap__field');
    $modalFields.forEach((it) => {
        it.addEventListener('input', () => {
            errorMessageArray[it.id] = 'ok';
            const $selectInputs = document.querySelectorAll('.select-input');
            const errors = validateInputFields($selectInputs);
            showFormErrors(errors);
            isValidField(errorMessageArray[it.id], it);
        })
    })

    $saveClientBtn.removeEventListener('click', saveNewClient);
    $saveClientBtn.removeEventListener('click', saveUpdatedClient);

    if ($saveClientBtn.dataset.type === 'save-new-client') $saveClientBtn.addEventListener('click', saveNewClient);
    if ($saveClientBtn.dataset.type === 'save-updated-client') $saveClientBtn.addEventListener('click', saveUpdatedClient);

}
