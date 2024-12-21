import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { ToyList } from '../cmps/ToyList.jsx'
import { userActions } from '../store/actions/user.actions.js'
import { toyActions } from '../store/actions/toy.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function UserDetails() {

    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const [ownedToys, setOwnedToys] = useState(null)

    useEffect(() => {
        userActions.loadLoggedInUser()
    }, [])

    useEffect(() => {
        loadToys()
    }, [user])

    async function loadToys() {
        if (!user) return
        try {
            const toys = await toyActions.loadToys(filterBy)
            setOwnedToys(toys.filter(toy => toy.owner && toy.owner.fullname === user.fullname))
        } catch (err) {
            showErrorMsg('Couldn\'t load toys')
        }
    }

    if (!user) return

    const { _id, fullname, isAdmin } = user

    return (
        <div className='user-details'>
            <h2>Name: {fullname}</h2>
            <h3>ID: {_id}</h3>
            <h3>Is Admin: {isAdmin ? 'Yes' : 'No'}</h3>
            {ownedToys && ownedToys.length > 0 ? <ToyList toys={ownedToys} user={user} /> : 'You don\'t own any toys'}
        </div>
    )
}