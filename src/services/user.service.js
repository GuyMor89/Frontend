import { httpService } from "./http.service.js"

const BASE_URL = 'user/'

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
    return httpService.get('/api/user')
        .then(res => res.data)
}

function login({ username, password }) {
    return httpService.post('/api/auth/login', { username, password })
        .then(res => res.data)
}

function signup({ username, password, fullname }) {
    return httpService.post('/api/auth/signup', { username, password, fullname })
        .then(res => res.data)
}

function logout() {
    return httpService.post('/api/auth/logout')
        .then(res => res.data)
}

function getLoggedinUser() {
    // return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    return httpService.get('/api/auth/verify')
        .then(res => res.data)
}

function getById(userId) {
    return httpService.get(BASE_URL + userId)
        .then(res => res.data)
}

function remove(userId) {
    return httpService.delete('/api/user/' + userId)
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
