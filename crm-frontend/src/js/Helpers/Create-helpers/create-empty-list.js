import {createEmptyListTable} from "../../Utils/Html-utils/html-components.js";

export function createEmptyList(errorCode) {
    const $table = document.querySelector('.table-body');
    $table.textContent = '';
    if (errorCode === 500 || errorCode.length === 0) {
        const icon = createEmptyListTable();
        $table.insertAdjacentHTML('beforeend', icon);
    }
}
