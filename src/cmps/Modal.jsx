import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toyActions } from "../store/actions/toy.actions"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"
import { SET_MODAL } from "../store/reducers/toy.reducer"

export function Modal({ handleChange }) {
    const dispatch = useDispatch()

    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const modalOpen = useSelector(storeState => storeState.toyModule.modal.open)
    const modalType = useSelector(storeState => storeState.toyModule.modal.type)
    const toyToEdit = useSelector(storeState => storeState.toyModule.modal.toy)

    const [toyData, setToyData] = useState(null)

    useEffect(() => {
        if (modalType === 'edit') setToyData({ toyName: toyToEdit?.name, toyPrice: toyToEdit?.price })
    }, [toyToEdit])

    function handleChange({ target }) {
        const { name: field, value } = target
        setToyData(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function closeModal(event) {
        event.stopPropagation()
        if (event.currentTarget.className === 'modal-overlay overlay-on') dispatch({ type: SET_MODAL, modal: { open: false, toy: null } })
    }

    function onAddToy() {
        const toy = {
            name: toyData.toyName,
            price: +toyData.toyPrice,
            owner: {
                fullname: user.fullname,
                _id: user._id
            }
        }

        if (!toy.name || !toy.price) return
        
        try {
            toyActions.saveToy(toy)
            showSuccessMsg('Toy added')
            dispatch({ type: SET_MODAL, modal: { open: false, toy: null } })
        } catch (err) {
            console.log('Error from onAddToy ->', err)
            showErrorMsg('Cannot add toy')
        }
    }

    async function onEditToy() {
        const name = toyData.toyName
        const price = toyData.toyPrice

        const toyToSave = { ...toyToEdit, price, name }

        try {
            await toyActions.saveToy(toyToSave)
            showSuccessMsg('Toy updated')
            dispatch({ type: SET_MODAL, modal: { open: false, toy: null } })
        } catch (err) {
            console.log('Error from onEditToy ->', err)
            showErrorMsg('Cannot update toy')
        }
    }

    async function onAddMsg() {
        try {
            await toyActions.saveToyMsg(toyToEdit._id, toyData.toyMsg)
            showSuccessMsg('Toy message added')
            dispatch({ type: SET_MODAL, modal: { open: false, toy: null } })
        } catch (err) {
            console.log('Error from onAddMsg ->', err)
            showErrorMsg('Cannot add message to toy')
        }
    }

    function handleTitle() {
        if (modalType === 'add') return <div>Add Toy</div>
        if (modalType === 'edit') return <div>Edit Toy</div>
        if (modalType === 'msg') return <div>Add Message to Toy</div>
    }

    function handleButton() {
        if (modalType === 'add') return <button onClick={onAddToy}>Add</button>
        if (modalType === 'edit') return <button onClick={onEditToy}>Edit</button>
        if (modalType === 'msg') return <button onClick={onAddMsg}>Add</button>
    }

    function handleInputs() {
        if (modalType === 'add' || modalType === 'edit') return (<>
            <input onChange={handleChange} defaultValue={toyToEdit && toyToEdit.name} type='text' name='toyName' placeholder='Toy name..'></input>
            <input onChange={handleChange} defaultValue={toyToEdit && toyToEdit.price} type='text' name='toyPrice' placeholder='Toy price..'></input>
        </>)
        if (modalType === 'msg') return <input onChange={handleChange} type='text' name='toyMsg' placeholder='Toy message..'></input>
    }

    return (
        <div className={modalOpen ? 'modal-overlay overlay-on' : 'modal-overlay'} onClick={closeModal}>
            {modalOpen && <div className='modal-container' onClick={closeModal} >
                <div className='modal'>
                    {handleTitle()}
                    {handleInputs()}
                    {handleButton()}
                </div>
            </div>}
        </div>
    )
}