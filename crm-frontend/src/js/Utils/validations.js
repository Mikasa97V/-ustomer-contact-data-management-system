export const errorMessageArray = {};
const emptyFieldText = 'Заполните поле';

const fieldRange = {
    'surname': {minLength: 4, maxLength: 25},
    'name': {minLength: 2, maxLength: 15},
    'lastname': {minLength: 5, maxLength: 25},
}

function validateSimpleField(field, fieldId, fieldValue, exceptLetterReg, letterReg, minLength, maxLength) {
    if (fieldValue.length === 0) {
        errorMessageArray[fieldId] = 'ok';
    } else {
        if (fieldValue.match(exceptLetterReg)) {
            errorMessageArray[fieldId] = ('Ошибка! Поле должно содержать только буквы');
        } else if (!fieldValue.match(letterReg)) {
            errorMessageArray[fieldId] = (`Ошибка! Длина поля от ${minLength} до ${maxLength}`);
        } else {
            errorMessageArray[fieldId] = 'ok';
        }
    }
    isValidField(errorMessageArray[fieldId], field)
}

function validateRequiredField(field, fieldId, fieldValue, exceptLetterReg, letterReg, minLength, maxLength) {
    if (fieldValue.length === 0) {
        errorMessageArray[fieldId] = emptyFieldText;
    } else if (fieldValue.match(exceptLetterReg)) {
        errorMessageArray[fieldId] = ('Ошибка! Поле должно содержать только буквы');
    } else if (!fieldValue.match(letterReg)) {
        errorMessageArray[fieldId] = (`Ошибка! Длина поля от ${minLength} до ${maxLength}`);
    } else {
        errorMessageArray[fieldId] = 'ok';
    }
    isValidField(errorMessageArray[fieldId], field)
}

function validateInputField(field) {
    const fieldId = field.id;
    if (!fieldRange[fieldId]) return;
    const minLength = fieldRange[fieldId].minLength;
    const maxLength = fieldRange[fieldId].maxLength;
    const fieldValue = field.value.trim();
    const isFieldRequired = field.hasAttribute('required');
    const letterReg = new RegExp(`^[a-zA-Zа-яА-Я]{${minLength},${maxLength}}$`);
    const exceptLetterReg = new RegExp(`[^a-zA-Zа-яА-Я]{1,}`);

    if (isFieldRequired) {
        validateRequiredField(field, fieldId, fieldValue, exceptLetterReg, letterReg, minLength, maxLength);
    } else  {
        validateSimpleField(field, fieldId, fieldValue, exceptLetterReg, letterReg, minLength, maxLength);
    }
}

function validateSelectInputField(field) {
    const fieldValue = field.value.trim();
    if (fieldValue.length === 0) {
        errorMessageArray[field.id] = emptyFieldText;
    } else {
        errorMessageArray[field.id] = 'ok';
    }
    isValidField(errorMessageArray[field.id], field)
}

export function isValidField(errors, field) {
    if (errors !== 'ok') {
        field.style.borderColor = 'var(--red)';
    } else  {
        field.style.borderColor = 'var(--grey)';
    }
}

export function validateAllModalFields(modalFields, modalSelectFields) {
    for (const input of modalFields) {
        validateInputField(input);
    }
    for (const selectInput of modalSelectFields) {
        validateSelectInputField(selectInput);

    }
    return errorMessageArray
}

export function validateInputFields(fields) {
    for (const input of fields) {
        validateInputField(input);
    }
    return errorMessageArray
}

export function validateSelectBlockInputFields(fields) {
    for (const selectInput of fields) {
        validateSelectInputField(selectInput);
    }
    return errorMessageArray
}
