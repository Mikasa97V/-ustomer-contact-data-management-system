export function getDataFromForm() {
    const contacts = [];
    const $contactSelectWrap = document.querySelector('.add-contact-wrap');
    const $clientSurname = document.querySelector('#surname');
    const $clientName = document.querySelector('#name');
    const $clientLastname = document.querySelector('#lastname');

    for (const contactElem of $contactSelectWrap.children) {
        const type = contactElem.children[0].getElementsByTagName('select')[0].value;
        const value = contactElem.children[1].value;
        contacts.push({type, value});
    }

    return {
        name: $clientName.value,
        surname: $clientSurname.value,
        lastName: $clientLastname.value,
        contacts,
    }

}
