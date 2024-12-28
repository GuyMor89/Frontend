import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reviewActions } from '../store/actions/reviews.actions'
import { userActions } from '../store/actions/user.actions'

export function Reviews() {

    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const fullReviews = useSelector(storeState => storeState.reviewModule.fullReviews)
    const users = useSelector(storeState => storeState.userModule.users)

    const [selectedUser, setSelectedUser] = useState(null)
    const [filteredReviews, setFilteredReviews] = useState(null)

    useEffect(() => {
        reviewActions.getFullReviews()
        if (users.length === 0) userActions.loadUsers()
    }, [reviews])

    useEffect(() => {
        if (selectedUser === null) setFilteredReviews(fullReviews)
        else setFilteredReviews(fullReviews.filter(review => review.user.fullname === selectedUser?.fullname))
    }, [fullReviews, selectedUser])

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
                    return <div className={`reviewer ${user?.fullname === selectedUser?.fullname ? 'selected' : ''}`} onClick={() => handleSelectedUser(user)}>
                        <img src={user.imgURL}></img>
                    </div>
                })}
            </div>
            <div className="reviews">
                {filteredReviews?.map(review => {
                    return <div className='review'>
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