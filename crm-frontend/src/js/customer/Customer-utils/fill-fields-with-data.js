import {getDateAndTime} from "../../Utils/Get-utils/get-date.js";
import {createClientContactRow} from "./create-client-contact-row.js";

export function fillFieldsWithData(data) {
    const $dataFieldsToBeFilledIn = document.querySelectorAll('.filled-field[data-fill]');
    const $dateFieldsToBeFilledIn = document.querySelectorAll('.filled-field-date[data-fill]');
    const $contactListTitle = document.querySelector('.client-contact-list-title');
    const $contactListWrap = document.querySelector('.contact-list-wrap');
    const $editClientBtn = document.querySelector('.action-button-edit');
    const $deleteClientBtn = document.querySelector('.action-button-delete');


    const {date, time} = getDateAndTime(data.createdAt);
    const {date: upDate, time: upTime} = getDateAndTime(data.updatedAt);

    const dateData = {date, time, upDate, upTime,};

    $dataFieldsToBeFilledIn.forEach((it) => {
        it.textContent = data[it.dataset.fill] ? data[it.dataset.fill] : 'не указано';
    });

    $dateFieldsToBeFilledIn.forEach((it) => {
        it.textContent = dateData[it.dataset.fill];
    });

    const clientContacts = data.contacts;
    if (clientContacts.length === 0) {
        $contactListTitle.textContent = 'Список контактов пуст.';
    } else {
        $contactListTitle.textContent = 'Список контактов';
        $contactListWrap.textContent = '';
        clientContacts.forEach((it) => {
            createClientContactRow(it);
        })
    }

    $editClientBtn.dataset.id = data.id;
    $deleteClientBtn.dataset.id = data.id;
}
