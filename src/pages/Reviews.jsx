import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reviewActions } from '../store/actions/reviews.actions'
import { userActions } from '../store/actions/user.actions'
import { socketService } from '../services/socket.service'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { ADD_REVIEW, REMOVE_REVIEW } from '../store/reducers/review.reducer'

export function Reviews() {

    const dispatch = useDispatch()

    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const fullReviews = useSelector(storeState => storeState.reviewModule.fullReviews)
    const users = useSelector(storeState => storeState.userModule.users)

    const [selectedUser, setSelectedUser] = useState(null)
    const [filteredReviews, setFilteredReviews] = useState(null)

    useEffect(() => {
        if (reviews.length === 0) reviewActions.getReviews()
        reviewActions.getFullReviews()
    }, [reviews])

    useEffect(() => {
        if (users.length === 0) userActions.loadUsers()
    }, [users])

    useEffect(() => {
        if (selectedUser === null) setFilteredReviews(fullReviews)
        else setFilteredReviews(fullReviews.filter(review => review.user.fullname === selectedUser?.fullname))
    }, [fullReviews, selectedUser])

    useEffect(() => {

        socketService.on('user-added-review', review => {
            console.log('GOT from socket', review)
            dispatch({ type: ADD_REVIEW, savedReview: review })
        })

        socketService.on('user-removed-review', reviewId => {
            console.log('GOT from socket', reviewId)
            dispatch({ type: REMOVE_REVIEW, reviewId })
        })

        return () => {
            socketService.off('user-added-review')
            socketService.off('user-removed-review')
        }
    }, [])

    async function removeToyReview(reviewID) {
        try {
            await reviewActions.removeReview(reviewID)
            showSuccessMsg('Toy review removed')
        } catch (err) {
            console.log('Error from removeToyReview ->', err)
            showErrorMsg('Cannot remove review from toy')
        }
    }

    function handleSelectedUser(user) {
        if (selectedUser?.fullname === user.fullname) setSelectedUser(null)
        else setSelectedUser(user)
    }

    return (
        <>
            <h2 className='review-title'>Toy Reviews</h2>

            <h3> Filter by User</h3>
            <div className='reviewer-list'>
                {users?.map(user => {
                    return <div key={user._id} className={`reviewer ${user?.fullname === selectedUser?.fullname ? 'selected' : ''}`} onClick={() => handleSelectedUser(user)}>
                        <img src={user.imgURL}></img>
                    </div>
                })}
            </div>
            <div className="reviews">
                {filteredReviews?.map(review => {
                    return <div className='review' key={review._id}>
                        <h4>For: <span>{review.toy.name}</span></h4>
                        <button onClick={() => removeToyReview(review._id)}><FontAwesomeIcon icon={faXmark} /></button>
                        <h4>Left by: <span>{review.user.fullname}</span></h4>
                        <h5><span>{review.text}</span></h5>
                    </div>
                })}
            </div>
        </>
    )
}