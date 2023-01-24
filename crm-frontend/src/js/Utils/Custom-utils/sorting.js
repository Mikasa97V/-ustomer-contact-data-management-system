import {getClients} from "../queries.js";

export async function getSortList(prop, dir) {
    const listCopy = await getClients();
    if (!Array.isArray(listCopy)) {
        return listCopy;
    }
    const listCopyMapped = listCopy.map((it) => ({
        ...it,
        fio: it.surname + ' ' + it.name + ' ' + it.lastName
    }))
    return listCopyMapped.sort((itFirst, itSecond) => {
        if (!dir === false ? itFirst[prop] < itSecond[prop] : itFirst[prop] > itSecond[prop]) {
            return -1;
        }
    })
}
