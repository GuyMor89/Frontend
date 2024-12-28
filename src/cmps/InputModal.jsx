import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toyActions } from "../store/actions/toy.actions"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"
import { SET_MODAL } from "../store/reducers/toy.reducer"
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { reviewActions } from "../store/actions/reviews.actions"

export function InputModal() {
    const dispatch = useDispatch()

    const modalOpen = useSelector(storeState => storeState.toyModule.modal.open)
    const modalType = useSelector(storeState => storeState.toyModule.modal.type)
    const toyToEdit = useSelector(storeState => storeState.toyModule.modal.toy)

    function closeModal(event) {
        event.stopPropagation()
        if (event.currentTarget.className === 'modal-overlay overlay-on') dispatch({ type: SET_MODAL, modal: { open: false, toy: null } })
    }

    function onAddToy(toyData) {
        const toy = {
            name: toyData.toyName,
            price: +toyData.toyPrice,
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

    async function onEditToy(toyData) {
        const { toyName, toyPrice } = toyData

        const toyToSave = { ...toyToEdit, name: toyName, price: toyPrice }

        try {
            await toyActions.saveToy(toyToSave)
            showSuccessMsg('Toy updated')
            dispatch({ type: SET_MODAL, modal: { open: false, toy: null } })
        } catch (err) {
            console.log('Error from onEditToy ->', err)
            showErrorMsg('Cannot update toy')
        }
    }

    async function onAddMsg(toyData) {
        try {
            await toyActions.saveToyMsg(toyToEdit._id, toyData.toyMsg)
            showSuccessMsg('Toy message added')
            dispatch({ type: SET_MODAL, modal: { open: false, toy: null } })
        } catch (err) {
            console.log('Error from onAddMsg ->', err)
            showErrorMsg('Cannot add message to toy')
        }
    }

    async function onAddReview(reviewData) {
        const toyID = toyToEdit._id
        const review = reviewData.toyReview

        try {
            await reviewActions.addReview(toyID, review)
            showSuccessMsg('Toy review added')
            dispatch({ type: SET_MODAL, modal: { open: false, toy: null } })
        } catch (err) {
            console.log('Error from onAddReview ->', err)
            showErrorMsg('Cannot add review to toy')
        }
    }

    function handleTitle() {
        if (modalType === 'add') return <div>Add Toy</div>
        if (modalType === 'edit') return <div>Edit Toy</div>
        if (modalType === 'msg') return <div>Add Message to Toy</div>
        if (modalType === 'review') return <div>Add Review to Toy</div>
    }

    function handleButton() {
        if (modalType === 'add' || modalType === 'msg' || modalType === 'review') return <button type="submit">Add</button>
        if (modalType === 'edit') return <button type="submit">Edit</button>
    }

    function handleSubmit(formData) {
        if (modalType === 'add') return onAddToy(formData)
        if (modalType === 'edit') return onEditToy(formData)
        if (modalType === 'msg') return onAddMsg(formData)
        if (modalType === 'review') return onAddReview(formData)
    }

    const validationSchema = (modalType) => {
        return Yup.object({
            toyName: modalType === 'add' || modalType === 'edit'
                ? Yup.string()
                    .required('Name is required')
                    .min(3, 'At least 3 characters')
                : Yup.mixed().notRequired(),
            toyPrice: modalType === 'add' || modalType === 'edit'
                ? Yup.number()
                    .required('Price is required')
                : Yup.mixed().notRequired(),
            toyMsg: modalType === 'msg'
                ? Yup.string()
                    .required('Message is required')
                : Yup.mixed().notRequired(),
            toyReview: modalType === 'review'
                ? Yup.string()
                    .required('Review is required')
                : Yup.mixed().notRequired(),
        })
    }


    function addFormikField(errors, touched, options) {
        const { fieldName, type, placeholder, focus } = options

        return (
            <div
                className={errors[fieldName] && touched[fieldName] ? 'error-input' : ''}
                data-error={errors[fieldName] && touched[fieldName] ? errors[fieldName] : ''}
            >
                <Field
                    type={type}
                    name={fieldName}
                    placeholder={placeholder}
                    required
                    autoFocus={focus === 'autoFocus'}
                />
            </div>
        )
    }

    return (
        <div className={modalOpen ? 'modal-overlay overlay-on' : 'modal-overlay'} onClick={closeModal}>
            {modalOpen && <div className='modal-container' onClick={closeModal} >
                <div className='modal'>
                    {handleTitle()}
                    <Formik
                        initialValues={{
                            toyName: modalType === 'edit' ? toyToEdit.name : '',
                            toyPrice: modalType === 'edit' ? toyToEdit.price : '',
                            toyMsg: '',
                            toyReview: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log('Submitting form with modalType:', modalType)
                            handleSubmit(values)
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                {(modalType === 'edit' || modalType === 'add') && <>
                                    {addFormikField(errors, touched, { fieldName: 'toyName', type: 'text', placeholder: 'Toy name..', focus: 'autoFocus' })}
                                    {addFormikField(errors, touched, { fieldName: 'toyPrice', type: 'number', placeholder: 'Toy price..', focus: 'none' })}
                                </>
                                }
                                {modalType === 'msg' && <>
                                    {addFormikField(errors, touched, { fieldName: 'toyMsg', type: 'text', placeholder: 'Toy message..', focus: 'autoFocus' })}
                                </>
                                }
                                {modalType === 'review' && <>
                                    {addFormikField(errors, touched, { fieldName: 'toyReview', type: 'text', placeholder: 'Toy review..', focus: 'autoFocus' })}
                                </>
                                }
                                {handleButton()}
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>}
        </div >
    )
}