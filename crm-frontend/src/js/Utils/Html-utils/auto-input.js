export function getRecordsMatchingQuery(clientsList, currentInputValue) {
    let newArrayList = [];
    const inputValue = currentInputValue.trim().toLowerCase();
    clientsList.forEach((it) => {
        it.fio = it.surname + ' ' + it.name + ' ' + it.lastName;
        if (it.fio.trim().toLowerCase().includes(inputValue)) {
            newArrayList.push(it);
        }
        if (inputValue === '') {
            newArrayList = [];
        }
    })
    return newArrayList;
}

export function clearQueryInput(inputValue, dropDownList) {
    const $closeBtn = document.querySelector('.close-input-query');
    let $input = document.querySelector('.input-query');

    if (inputValue !== '') {
        $closeBtn.style.display = 'flex';
        $closeBtn.addEventListener('click', () => {
            dropDownList.textContent = '';
            $input.value = '';
            highlightRecord();
            $closeBtn.style.display = 'none';
        })
    } else {
        $closeBtn.style.display = 'none'
    }

}


export function highlightRecord(id) {
    const $rowClient = document.querySelectorAll(`.list-row`);
    $rowClient.forEach((row) => {
        row.style.outline = 'none';
        if (row.dataset.rowId === id) {
            row.style.outline = '1px solid #bfacef';
        }
    })
}


export function showQueryRecords(records) {
    if (records.length === 0) {
        const recordText = 'По вашему запросу ничего не найдено';
        createDropDownRecord('noRecords', "remaining-records", recordText);
    } else if (records.length <= 3) {
        for (const dropDownListElement of records) {
            createDropDownRecord(dropDownListElement.id, "drop-down-list-item", dropDownListElement.fio);
        }
    } else {
        for (let i = 0; i < 3; i++) {
            createDropDownRecord(records[i].id, "drop-down-list-item", records[i].fio)

        }
        const recordText = `Найдено ${records.length - 3} совпадений`;
        createDropDownRecord('remainingRecords', "remaining-records", recordText);
    }
}

function createDropDownRecord(recordId, className, recordText) {
    const $dropDownList = document.querySelector('.drop-down-list');

    const $record = `<div class=${className} id=${recordId}>${recordText}</div>`;
    $dropDownList.insertAdjacentHTML('beforeend', $record);
}
