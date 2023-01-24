import {getDataFromForm} from "../../Utils/Get-utils/get-data-form.js";
import {changeClient} from "../../Utils/queries.js";
import {closeModal} from "../../Utils/Custom-utils/modal-actions.js";
import {createClientsListById} from "../Create-helpers/create-client-list.js";
import {validateAllModalFields} from "../../Utils/validations.js";
import {showFormErrors, showServerError} from "../../Utils/Custom-utils/show-errors.js";
import {getClientData} from "../../customer/customer.js";

export async function saveUpdatedClient() {
    const $saveClientBtn = document.querySelector('.save-client');
    const btnId = $saveClientBtn.dataset.id;
    const dataClient = getDataFromForm();

    const $modalFields = document.querySelectorAll('.form-wrap__field');
    const $modalSelectFields = document.querySelectorAll('.select-input');

    const errors = validateAllModalFields($modalFields, $modalSelectFields);
    const noErrors = showFormErrors(errors);

    if (noErrors) {
        try {
            let $spinner = document.querySelector('.spinner-btn-save');
            const $spinnerCard = document.querySelector('.spinner-btn-save-customer');

            $spinner = $spinner ?? $spinnerCard;

            $spinner.style.display = 'block';
            await changeClient(btnId, dataClient);
            $spinner.style.display = 'none';
            closeModal();
            await getClientData();
            await createClientsListById()
        } catch (e) {
            showServerError(e);
        }

    }
}
