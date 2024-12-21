import { httpService } from "./http.service.js"

const BASE_URL = 'users/'

export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser,
    remove,
    query,
    getById,
    getEmptyCredentials
}

function query() {
    return httpService.get('users')
}

function login({ username, password }) {
    return httpService.post('auth/login', { username, password })
}

function signup({ username, password, fullname }) {
    return httpService.post('auth/signup', { username, password, fullname })
}

function logout() {
    return httpService.post('auth/logout')
}

function getLoggedinUser() {
    // return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    return httpService.get('auth/verify')
}

function getById(userId) {
    return httpService.get(BASE_URL + userId)
}

function remove(userId) {
    return httpService.delete('userS/' + userId)
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return userToSave
}
