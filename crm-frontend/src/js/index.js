import {getSortList} from "./Utils/Custom-utils/sorting.js";
import {changeDirectionArrow} from "./Utils/Custom-utils/direction-arrow.js";
import {closeModal, openModal} from "./Utils/Custom-utils/modal-actions.js";
import {
    createClientsList,
    createClientsListById
} from "./Helpers/Create-helpers/create-client-list.js";
import {getModalContent} from "./Utils/Get-utils/get-modal-content.js";
import {createContactBlock} from "./Helpers/Create-helpers/create-contact-block.js";
import {
    clearQueryInput,
    getRecordsMatchingQuery,
    highlightRecord,
    showQueryRecords
} from "./Utils/Html-utils/auto-input.js";
import {getElementCenterCoordinates} from "./Utils/Get-utils/get-element-center-coordinates.js";
import {getClients} from "./Utils/queries.js";
import {isGlobalSpinnerShow} from "./Utils/Html-utils/global-spinner.js";


const $modalWrapBG = document.querySelector('.modal-wrap-background');
const $addNewClientModal = document.querySelector('.add-new-client-modal');
const $listHeaderSort = document.querySelectorAll('.header-row-table th[data-sort]');
const $autoInput = document.querySelector('.input-query');
const $dropDownWrap = document.querySelector('.drop-down-list');

const $closeQueryInputBtn = document.querySelector('.close-input-query');
const $addNewClientBtn = document.querySelector('.js-add-person-btn');
const $addContactBtn = document.querySelector('.add-new-contacts-block');


let column = 'id';
let columnDir = true;
let timerId;

$addContactBtn.addEventListener('click', () => {
    createContactBlock('', '');
});

$modalWrapBG.addEventListener('click', closeModal);

$addNewClientBtn.addEventListener('click', () => {
    openModal($addNewClientModal);
    const modalData = {
        title: 'Новый клиент',
        client: {},
        btnName: 'Отмена',
        btnType: 'close',
        primaryBtnType: 'save-new-client',
    }
    getModalContent(modalData);
});


$listHeaderSort.forEach((it) => {
    it.addEventListener('click', async function () {
        changeDirectionArrow(it);
        column = this.dataset.sort;
        columnDir = this.dataset.dir === 'true';
        this.dataset.dir = this.dataset.dir === 'true' ? 'false' : 'true';
        const sortedList = await getSortList(column, columnDir);
        createClientsList(sortedList);
    })
})


document.addEventListener('click', (e) => {
    const currentElementClass = e.target.className;
    if (currentElementClass !== 'drop-down-list' && currentElementClass !== 'input-query') {
        $dropDownWrap.textContent = '';
        $autoInput.value = '';
        $closeQueryInputBtn.style.display = 'none';
    }
});

document.addEventListener('keydown', (e) => {
    const $openModal = document.querySelector('.modal-open');
    if ($openModal && e.key === 'Escape') {
        closeModal($openModal);
    }
});


function manageAutoInputByKeyboard($autoInput) {
    const $dropDownItems = document.querySelectorAll('.drop-down-list-item');
    let currentItemIdx = -1;
    const maxCount = $dropDownItems.length;
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Enter') return;
        e.preventDefault()
        if (e.key === 'Enter') {
            $dropDownItems.forEach((it) => {
                if (it.classList.contains('hover')) showDesiredClient(it.id);
            })
            return;
        }
        if (currentItemIdx === 0 && e.key === 'ArrowUp') {
            $autoInput.focus();
            $dropDownItems[0].classList.remove('hover');
            return;
        }
        if (currentItemIdx === maxCount - 1 && e.key === 'ArrowDown') return;
        e.key === 'ArrowDown' ? currentItemIdx++ : currentItemIdx--;
        $dropDownItems.forEach((it, idx) => {
            if (idx === currentItemIdx) it.classList.add('hover');
            else it.classList.remove('hover');
        })
    })
}

$autoInput.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowDown') return;
    $autoInput.blur();
    manageAutoInputByKeyboard($autoInput);
})


function showDesiredClient(elemId) {
    const $allClients = document.querySelectorAll('.client-id');
    $allClients.forEach((el) => {
        if (el.textContent === elemId) {
            highlightRecord(elemId);
            const {centerY} = getElementCenterCoordinates(el);
            const topY = centerY - 245;
            scrollTo({
                top: topY,
                behavior: 'smooth',
            })
        }
    })
}


$autoInput.addEventListener('input', (e) => {
    clearTimeout(timerId);
    timerId = setTimeout(async () => {
        const currentInputValue = e.target.value;
        const $dropDownList = document.querySelector('.drop-down-list');
        const clientsList = await getClients();

        $dropDownList.textContent = '';

        clearQueryInput(currentInputValue, $dropDownList);

        const recordsMatchingQuery = getRecordsMatchingQuery(clientsList, currentInputValue);
        showQueryRecords(recordsMatchingQuery);


        const $dropDownRecords = $dropDownList.querySelectorAll('.drop-down-list-item');
        $dropDownRecords.forEach((it) => {
            it.addEventListener('click', () => {
                showDesiredClient(it.id)
            })
            it.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    showDesiredClient(it.id);
                }
            })
        })

        if ($autoInput.value.trim().length === 0) {
            $dropDownList.textContent = '';
        }
    }, 300);
})


document.addEventListener('DOMContentLoaded', async () => {
    const $globalSpinner = document.getElementById('global-spinner-index');
    isGlobalSpinnerShow(true, $globalSpinner);
    await createClientsListById();
    isGlobalSpinnerShow(false, $globalSpinner);
});
