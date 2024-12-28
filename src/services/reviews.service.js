import { httpService } from "./http.service.js"

const BASE_URL = 'reviews/'

export const reviewService = {
    get,
    getFull,
    save,
    remove
}

function get() {
    return httpService.get(BASE_URL)
}

function getFull() {
    return httpService.get(BASE_URL + 'full')
}

function save(toyID, review) {
    return httpService.post(BASE_URL + toyID, {review})
}

function remove(reviewID) {
    return httpService.delete(BASE_URL + reviewID)
}