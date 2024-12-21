export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_AMOUNT_OF_TOYS = 'SET_AMOUNT_OF_TOYS'
export const SET_MODAL = 'SET_MODAL'
export const SET_IS_LOADING = 'IS_LOADING'
export const CHANGE_FILTER_BY = 'CHANGE_FILTER_BY'
export const ADD_TOY_MSG = 'ADD_TOY_MSG'
export const REMOVE_TOY_MSG = 'REMOVE_TOY_MSG'
export const SET_UNFILTERED_TOYS = 'SET_UNFILTERED_TOYS'

const initialState = {
    toys: [],
    amountOfToys: null,
    unfilteredToys: null,
    modal: {open: false, type: 'add'},
    isLoading: false,
    filterBy: { name: '', minPrice: 0, page: 0, sort: { price: '', name: '', createdAt: '' } }
}

export function toyReducer(state = initialState, action) {
    switch (action.type) {

        case SET_TOYS:
            return { ...state, toys: action.filteredToys }

        case REMOVE_TOY:
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== action.toyId)
            }
        case ADD_TOY:
            return {
                ...state,
                toys: [...state.toys, action.toy]
            }
        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            }
        case ADD_TOY_MSG:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === action.toyID ? { ...toy, msgs: [...(toy.msgs || []), action.savedMsg] } : toy)
            }
        case REMOVE_TOY_MSG:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === action.toyID ? { ...toy, msgs: toy.msgs.filter(msg => msg.id !== action.msgID) } : toy)
            }
        case SET_AMOUNT_OF_TOYS:
            return { ...state, amountOfToys: action.amountOfToys }
        case SET_UNFILTERED_TOYS:
            return { ...state, unfilteredToys: action.unfilteredToys }
        case SET_MODAL:
            return {
                ...state,
                modal: {...state.modal, ...action.modal}
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case CHANGE_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy }
            }

        default:
            return state
    }
}
