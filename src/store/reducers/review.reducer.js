export const SET_REVIEWS = 'SET_REVIEWS'
export const ADD_REVIEW = 'ADD_REVIEW'
export const REMOVE_REVIEW = 'REMOVE_REVIEW'
export const SET_FULL_REVIEWS = 'SET_FULL_REVIEWS'

const initialState = {
    reviews: [],
    fullReviews: []
}

export function reviewReducer(state = initialState, action) {
    switch (action.type) {

        case SET_REVIEWS:
            return { ...state, reviews: action.reviews }

        case SET_FULL_REVIEWS:
            return { ...state, fullReviews: action.fullReviews }

        case ADD_REVIEW:
            return { ...state, reviews: [...state.reviews, action.savedReview] }

        case REMOVE_REVIEW:
            return { ...state, reviews: state.reviews.filter(review => review._id !== action.reviewID) }

        default:
            return state
    }

}