import {closeModal} from "../../Utils/Custom-utils/modal-actions.js";
import {isShowSpinner} from "../../Utils/Html-utils/spinner.js";
import {deleteClient} from "../../Utils/queries.js";
import {createClientsListById} from "../Create-helpers/create-client-list.js";


async function removeClient(event) {
    const $deleteClientModalBtn = document.querySelector('.delete-client-btn');
    const $deleteBtnIcon = document.querySelector('.delete-btn-icon');
    const currentElemDataset = event.target.dataset;

    closeModal();
    if ($deleteBtnIcon) $deleteBtnIcon.style.display = 'none';
    isShowSpinner(currentElemDataset.id, true, currentElemDataset.action);

    await deleteClient(currentElemDataset.id);

    isShowSpinner(currentElemDataset.id, false, currentElemDataset.action);
    if ($deleteBtnIcon) {
        $deleteBtnIcon.style.display = 'block';
        window.location.href = '../index.html';
    }

    await createClientsListById()
    $deleteClientModalBtn.removeEventListener('click', removeClient)
}

export function confirmDeletion(id, action) {
    const $deleteClientModalBtn = document.querySelector('.delete-client-btn');

    $deleteClientModalBtn.dataset.id = id;
    $deleteClientModalBtn.dataset.action = action;
    $deleteClientModalBtn.addEventListener('click', removeClient)
}
