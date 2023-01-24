export function createModalContent(data) {
    const {title, client, btnName, btnType, primaryBtnType} = data;
    const $saveClientBtn = document.querySelector('.save-client');

    const $modalTitle = document.querySelector('.modal-title');
    const $clientId = document.querySelector('.modal-client-id');
    const $surnameField = document.getElementById('surname');
    const $nameField = document.getElementById('name');
    const $lastnameField = document.getElementById('lastname');
    const $btn = document.querySelector('.btn-modal');

    let clientIdText = '';
    if (client.id) clientIdText = 'id: ' + client.id;

    $modalTitle.textContent = title;
    $clientId.textContent = clientIdText || '';
    $surnameField.value = client.surname || '';
    $nameField.value = client.name || '';
    $lastnameField.value = client.lastName || '';
    $btn.textContent = btnName;
    $btn.dataset.type = btnType;
    $saveClientBtn.dataset.type = primaryBtnType;
    $saveClientBtn.dataset.id = client.id;
}
