import {createSelect} from "../../Utils/Html-utils/html-components.js";
import {hideTooltip, showTooltip} from "../../Utils/Html-utils/tooltip.js";
import {removeContactRow} from "../Remove-helpers/remove-contact-row.js";
import {errorMessageArray, isValidField, validateSelectBlockInputFields} from "../../Utils/validations.js";
import {showFormErrors} from "../../Utils/Custom-utils/show-errors.js";
import {ContactMask, undoPhoneMask} from "../../Utils/Custom-utils/phone-imask.js";


export function createContactBlock(type, value) {
    const $contactSelectWrap = document.querySelector('.add-contact-wrap');
    const $addContactBtn = document.querySelector('.add-new-contacts-block');
    const $addCustomerContactBtn = document.querySelector('.add-new-contacts-block-customer');

    const contactRows = $contactSelectWrap.children.length;
    const contactId = Math.floor(Math.random() * 1000000);
    const contactRowId = 'contact-row-' + contactId;
    const contactSelectOption = 'contact-select-' + contactId;

    const selectData = {
        contactId,
        contactRowId,
        contactSelectOption,
        value: type === 'phone' ? undoPhoneMask(value) : value,
    }

    let $select = createSelect(selectData);

    $contactSelectWrap.insertAdjacentHTML('beforeend', $select);


    const $customSelect = document.getElementsByClassName(contactSelectOption);

    for (const customSelectElement of $customSelect) {
        if (customSelectElement.value === type) {
            customSelectElement.setAttribute('selected', 'true');
        }
    }

    const $customSelectLastChild = document.querySelector('.CustomSelect:last-child');

    const modalContactInputs = document.querySelectorAll('.select-input');
    modalContactInputs.forEach((it) => {
        it.addEventListener('input', () => {
            errorMessageArray[it.id] = 'ok';
            const selectInputs = document.querySelectorAll('.select-input');
            const errors = validateSelectBlockInputFields(selectInputs);
            showFormErrors(errors);
            isValidField(errorMessageArray[it.id], it);
        })
    });


    new Choices($customSelectLastChild, {
        searchEnabled: false,
        shouldSort: false,
        allowHTML: true,
        itemSelectText: '',
        position: 'bottom',
    });

    if (contactRows === 8) {
        if ($addContactBtn) $addContactBtn.style.display = 'flex';
        if ($addCustomerContactBtn) $addCustomerContactBtn.style.display = 'flex';
    }
    if (contactRows === 9) {
        if ($addContactBtn) $addContactBtn.style.display = 'none';
        if ($addCustomerContactBtn) $addCustomerContactBtn.style.display = 'none';
    }

    const $deleteContactBtn = document.querySelectorAll('.delete-contact-btn');
    $deleteContactBtn.forEach((it) => {
        it.addEventListener('click', removeContactRow)
        it.addEventListener('mouseover', () => {
            showTooltip(it);
        })
        it.addEventListener('mouseout', hideTooltip);
    })

    const $customInputLastChild = document.querySelector('.contact-wrap-items:last-child').getElementsByTagName('input')[0];
    const $selectRow = document.getElementById(`${contactRowId}`);
    const $contactBlocSelect = $selectRow.getElementsByTagName('select')[0];
    const contactMask = new ContactMask($customInputLastChild, $contactBlocSelect);
    $contactBlocSelect.addEventListener('change', contactMask.getInputMask.bind(contactMask));
}
