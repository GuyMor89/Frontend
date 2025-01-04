import { reviewService } from '../../services/reviews.service.js'
import { SET_REVIEWS, ADD_REVIEW, REMOVE_REVIEW, SET_FULL_REVIEWS } from '../reducers/review.reducer.js'
import { store } from '../store.js'

export const reviewActions = {
    getReviews,
    getFullReviews,
    addReview,
    removeReview
}

async function getReviews() {
    try {
        const reviews = await reviewService.get()
        store.dispatch({ type: SET_REVIEWS, reviews })
        return reviews
    } catch (err) {
        console.log('Review action -> Cannot get reviews', err)
        throw err
    }
}

async function getFullReviews() {
    try {
        const fullReviews = await reviewService.getFull()
        store.dispatch({ type: SET_FULL_REVIEWS, fullReviews })
        return fullReviews
    } catch (err) {
        console.log('Review action -> Cannot get full reviews', err)
        throw err
    }
}

async function addReview(toyID, review) {
    try {
        const savedReview = await reviewService.save(toyID, review)
        store.dispatch({ type: ADD_REVIEW, savedReview })
        return savedReview
    } catch (err) {
        console.log('Review action -> Cannot save review', err)
        throw err
    }
}

async function removeReview(reviewID) {
    try {
        await reviewService.remove(reviewID)
        store.dispatch({ type: REMOVE_REVIEW, reviewID })
    } catch (err) {
        console.log('Review action -> Cannot remove review', err)
        throw err
    }
}