import {getDateAndTime} from "../../Utils/Get-utils/get-date.js";
import createContacts from "./create-contact-icon.js";
import {createActionButtons, createClientLinkTooltip} from "../../Utils/Html-utils/html-components.js";

export function createNewClientsRecord(newClientsRecord) {
    const $table = document.querySelector('.table-body');
    const clientLink = `customer.html?customer=${newClientsRecord.id}`;
    const tooltipLink = createClientLinkTooltip(clientLink);
    const {date, time} = getDateAndTime(newClientsRecord.createdAt);
    const {date: upDate, time: upTime} = getDateAndTime(newClientsRecord.updatedAt);

    const fio = newClientsRecord.surname + ' ' + newClientsRecord.name + ' ' + newClientsRecord.lastName;

    const $clientTableRow = document.createElement('tr');
    const $clientID = `<td class="client-id">${newClientsRecord.id}</td>`;
    const $clientFIO = `
                    <td class="client-fio">
                        <div class="client-link-wrap">
                            ${tooltipLink}
                            <a href=${clientLink} class="client-link">${fio}</a>
                        </div>
                    </td>`;
    const $clientCreateDate = `
            <td class="date-cell">
                <span class="date">${date}</span>    
                <span class="time">${time}</span>    
            </td>`;
    const $clientLastEditDate = `
            <td class="date-cell">
                <span class="date">${upDate}</span>    
                <span class="time">${upTime}</span>    
            </td>`;
    const $clientContacts = document.createElement('td');
    const $contactsIconWrap = document.createElement('div');
    $clientContacts.classList.add('contacts-cell');
    $contactsIconWrap.classList.add('contacts-icon-wrap');
    $clientContacts.append($contactsIconWrap);

    createContacts(newClientsRecord.contacts, $contactsIconWrap);

    const $clientActions = document.createElement('td');
    $clientActions.classList.add('action-btn-td');

    $clientTableRow.classList.add('list-row');
    $clientTableRow.dataset.rowId = newClientsRecord.id;

    const $buttons = createActionButtons(newClientsRecord.id);



    $clientTableRow.insertAdjacentHTML('beforeend', $clientID);
    $clientTableRow.insertAdjacentHTML('beforeend', $clientFIO);
    $clientTableRow.insertAdjacentHTML('beforeend', $clientCreateDate);
    $clientTableRow.insertAdjacentHTML('beforeend', $clientLastEditDate);
    $clientTableRow.append($clientContacts);
    $clientActions.append($buttons);
    $clientTableRow.append($clientActions);
    $table.append($clientTableRow);
}
