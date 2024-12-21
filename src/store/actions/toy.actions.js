import { toyService } from "../../services/toy.service.js"
import { SET_TOYS, UPDATE_TOY, ADD_TOY, REMOVE_TOY, SET_IS_LOADING, SET_AMOUNT_OF_TOYS, ADD_TOY_MSG, REMOVE_TOY_MSG, SET_UNFILTERED_TOYS } from "../reducers/toy.reducer.js"
import { store } from "../store.js"

export const toyActions = {
    loadToys,
    saveToy,
    saveToyMsg,
    removeToy,
    removeToyMsg
}

async function loadToys(filterBy) {
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        const { filteredToys, amountOfToys, unfilteredToys } = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, filteredToys })
        store.dispatch({ type: SET_AMOUNT_OF_TOYS, amountOfToys })
        store.dispatch({ type: SET_UNFILTERED_TOYS, unfilteredToys })
        return filteredToys
    } catch (err) {
        console.log('Toy action -> Cannot load Toys', err)
        throw err
    }
    finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (err) {
        console.log('Toy action -> Cannot remove Toy', err)
        throw err
    }
}

async function saveToy(toy, user) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY

    try {
        const savedToy = await toyService.save(toy, user)
        store.dispatch({ type, toy: savedToy })
        return savedToy
    } catch (err) {
        console.log('Toy action -> Cannot save Toy', err)
        throw err
    }
}

async function saveToyMsg(toyID, msg) {
    try {
        const savedMsg = await toyService.saveMsg(toyID, msg)
        store.dispatch({ type: ADD_TOY_MSG, toyID, savedMsg })
        return savedMsg
    } catch (err) {
        console.log('Toy action -> Cannot save Toy message', err)
        throw err
    }
}

async function removeToyMsg(toyID, msgID) {
    try {
        const removedMsg = await toyService.removeMsg(toyID, msgID)
        store.dispatch({ type: REMOVE_TOY_MSG, toyID, msgID })
        return removedMsg
    } catch (err) {
        console.log('Toy action -> Cannot remove Toy message', err)
        throw err
    }
}