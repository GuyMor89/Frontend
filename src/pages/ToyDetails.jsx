import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { toyActions } from '../store/actions/toy.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { SET_MODAL } from '../store/reducers/toy.reducer.js'

export function ToyDetails() {

    const { toyId } = useParams()
    const dispatch = useDispatch()

    const toy = useSelector(storeState =>
        storeState.toyModule.toys.find(toy => toy._id === toyId)
    )
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    useEffect(() => {
        if (!toy) toyActions.loadToys(filterBy)
    }, [])

    async function removeToyMsg(msgID) {
        try {
            await toyActions.removeToyMsg(toy._id, msgID)
            showSuccessMsg('Toy message removed')
        } catch (err) {
            console.log('Error from removeToyMsg ->', err)
            showErrorMsg('Cannot remove message from toy')
        }
    }

    if (!toy) return <h1>loading....</h1>

    const { name, price, msgs } = toy

    return (<div className='toy-details'>
        <h3>{name}</h3>
        <img src={`https://api.dicebear.com/9.x/bottts/svg?seed=${toy._id}`}></img>
        <h6>Price: <span>{price}</span></h6>

        <div className='toy-msgs'>
            <h4>Messages</h4>
            {user && <button className='add-button' onClick={() => { dispatch({ type: SET_MODAL, modal: { open: true, type: 'msg', toy: toy } }) }}><FontAwesomeIcon style={{ fontSize: '1.5em' }} icon={faPlus} /></button>}
            {msgs && msgs.map(msg => {
                return <div className='toy-msg'>
                    <h5>{msg.txt}</h5>
                    <button onClick={() => removeToyMsg(msg.id)}><FontAwesomeIcon icon={faXmark} /></button>
                </div>
            })}
        </div>
        <Link to="/toy">Back to List</Link>
    </div>)

}

