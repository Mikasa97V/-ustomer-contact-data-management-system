export function showFormErrors(errors) {

    const errorFieldNames = {
        'surname': '"Фамилия"',
        'name': '"Имя"',
        'lastname': '"Отчество"',
    }

    const $errorMassageBlock = document.querySelector('.errors-message-block');
    $errorMassageBlock.textContent = '';

    const isOk = Object.values(errors).every((it) => {
        return it === 'ok';
    })

    if (!isOk) {
        const errorsArray = Object.entries(errors).filter((it) => {
            return it[1] !== 'ok';
        })

        errorsArray.forEach((it) => {
            let errorName = errorFieldNames[it[0]];
            let $errorText;
            const $inputSelectError = $errorMassageBlock.querySelector('#input-select-error');
            if (it[0].includes('contact-row-')) {
                if (!$inputSelectError) {
                    $errorText = `<span id="input-select-error">Все поля контактов должны быть заполнены</span>`;
                    $errorMassageBlock.insertAdjacentHTML('beforeend', $errorText);
                }
            } else {
                $errorText = `<span>Поле ${errorName}: ${it[1]}</span>`;
                $errorMassageBlock.insertAdjacentHTML('beforeend', $errorText);
            }

        })
    }

    return isOk;
}

export function showServerError(errorText = 'Что-то пошло не так...') {
    const $errorMassageBlock = document.querySelector('.errors-message-block');
    $errorMassageBlock.textContent = '';

    $errorMassageBlock.insertAdjacentHTML('beforeend', errorText);

}
