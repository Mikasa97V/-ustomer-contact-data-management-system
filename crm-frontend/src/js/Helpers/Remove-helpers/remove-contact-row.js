import {hideTooltip} from "../../Utils/Html-utils/tooltip.js";
import {errorMessageArray, validateSelectBlockInputFields} from "../../Utils/validations.js";
import {showFormErrors} from "../../Utils/Custom-utils/show-errors.js";

export function removeContactRow(event) {
    const $contactSelectWrap = document.querySelector('.add-contact-wrap');
    const contactRows = $contactSelectWrap.children.length;
    const $addContactBtn = document.querySelector('.add-new-contacts-block');
    const $addCustomerContactBtn = document.querySelector('.add-new-contacts-block-customer');

    const contactRowId = event.target.closest('button').dataset.id;
    const $contactRow = document.getElementById('contact-row-' + contactRowId);

    event.target.removeEventListener('click', removeContactRow);
    $contactRow.remove();

    delete errorMessageArray[$contactRow.id];
    const $selectInputs = document.querySelectorAll('.select-input');
    const errors = validateSelectBlockInputFields($selectInputs);
    showFormErrors(errors);


    hideTooltip();

    if (contactRows <= 10) {
        if ($addContactBtn) $addContactBtn.style.display = 'flex';
        if ($addCustomerContactBtn) $addCustomerContactBtn.style.display = 'flex';
    }
}
