import {validateAllModalFields} from "../../Utils/validations.js";
import {getDataFromForm} from "../../Utils/Get-utils/get-data-form.js";
import {createClient} from "../../Utils/queries.js";
import {closeModal} from "../../Utils/Custom-utils/modal-actions.js";
import {createClientsListById} from "../Create-helpers/create-client-list.js";
import {showFormErrors, showServerError} from "../../Utils/Custom-utils/show-errors.js";

export async function saveNewClient() {
    const $modalFields = document.querySelectorAll('.form-wrap__field');
    const $modalSelectFields = document.querySelectorAll('.select-input');

    const errors = validateAllModalFields($modalFields, $modalSelectFields);
    const noErrors = showFormErrors(errors);

    if (noErrors) {
        try {
            const $spinner = document.querySelector('.spinner-btn-save');
            $spinner.style.display = 'block';
            const dataClient = getDataFromForm();
            await createClient(dataClient);
            $spinner.style.display = 'none';
            closeModal();
            await createClientsListById()
        } catch (e) {
            showServerError(e);
        }

    }
}
