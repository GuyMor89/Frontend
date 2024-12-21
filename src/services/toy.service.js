import { httpService } from "./http.service.js"

const BASE_URL = 'toys/'

export const toyService = {
    query,
    getById,
    save,
    saveMsg,
    remove,
    removeMsg,
    downloadPDF
}

function query(filterBy) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyID) {
    return httpService.get(BASE_URL + toyID)
}

function remove(toyID) {
    return httpService.delete(BASE_URL + toyID)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function saveMsg(toyID, msg) {
    return httpService.post(BASE_URL + toyID + '/msg', {msg})
}

function removeMsg(toyID, msgID) {
    return httpService.delete(BASE_URL + toyID + '/msg/' + msgID)
}

function downloadPDF() {
    return httpService.get(BASE_URL + 'pdf')
}

