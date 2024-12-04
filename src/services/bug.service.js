import { httpService } from "./http.service.js"

const BASE_URL = 'bug/'

export const bugService = {
    query,
    getById,
    save,
    remove,
    downloadPDF
}

function query(filterBy) {
    return httpService.get(BASE_URL, { params: filterBy })
        .then(res => res.data)
}

function getById(bugID) {
    return httpService.get(BASE_URL + bugID)
        .then(res => res.data)
        .catch(err => {
            if (err.response && err.response.status === 401) {
                console.log('Wait for a bit')
            }
            throw err
        })
}

function remove(bugID) {
    return httpService.delete(BASE_URL + bugID)
        .then(res => res.data)
}

function save(bug) {
    // return httpService.get(BASE_URL + 'save' + `?title=${encodeURIComponent(bug.title)}&severity=${bug.severity}&_id=${bug._id || ''}&description=${bug.description}`)
    if (bug._id) {
        return httpService.put(BASE_URL + bug._id, bug)
            .then(res => res.data)
            .catch(err => {
                console.log('err:', err)
                throw err
            })
    } else {
        return httpService.post(BASE_URL, bug)
            .then(res => res.data)
            .catch(err => {
                console.log('err:', err)
                throw err
            })
    }

}

function downloadPDF() {
    return httpService.get(BASE_URL + 'pdf')
        .then(res => res.data)
}

