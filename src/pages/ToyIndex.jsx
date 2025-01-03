import { toyActions } from '../store/actions/toy.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { CHANGE_FILTER_BY, SET_MODAL } from '../store/reducers/toy.reducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { ToyFilter } from '../cmps/ToyFilter.jsx'


export function ToyIndex() {

    const dispatch = useDispatch()

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const amountOfToys = useSelector(storeState => storeState.toyModule.amountOfToys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    useEffect(() => {
        loadToys()
    }, [filterBy])

    function loadToys() {
        toyActions.loadToys(filterBy)
    }

    function sortToys(event) {
        let label = event.currentTarget.id
        dispatch({ type: CHANGE_FILTER_BY, filterBy: { sort: { price: '', name: '', createdAt: '', [label]: filterBy.sort[label] === 1 ? -1 : 1 } } })
    }

    async function onRemoveToy(toyID) {
        try {
            await toyActions.removeToy(toyID)
            showSuccessMsg('Toy removed')
        } catch {
            console.log('Error from onRemoveToy ->', err)
            showErrorMsg('Cannot remove toy')
        }
    }

    function handlePageSwitching(diff) {
        dispatch({ type: CHANGE_FILTER_BY, filterBy: { page: filterBy.page + diff } })
    }

    function handlePageNumbers() {
        const startNum = (filterBy.page * 4) + 1
        const endNum = amountOfToys < (filterBy.page * 4) + 4 ? amountOfToys : (filterBy.page * 4) + 4
        return { startNum, endNum }
    }

    const { startNum, endNum } = handlePageNumbers()
    const { price, name, createdAt } = filterBy.sort

    return (
        <>
            <ToyFilter />
            <div className="toy-list-counter">
                <div id={'price'} onClick={sortToys}>
                    <i className={price === '' || price === -1 ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}></i>
                    <span>Price</span>
                </div>
                <div id={'createdAt'} onClick={sortToys}>
                    <i className={createdAt === '' || createdAt === -1 ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}></i>
                    <span>Created At</span>
                </div>
                <div id={'name'} onClick={sortToys}>
                    <i className={name === '' || name === -1 ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}></i>
                    <span>Name</span>
                </div>
            </div>
            <div className='pagination'>
                <span>{startNum} - {endNum} of {amountOfToys}</span>
                <i className={filterBy.page === 0 ? "fa-solid fa-angle-left faint" : "fa-solid fa-angle-left"} onClick={() => handlePageSwitching(-1)}></i>
                <i className={endNum === amountOfToys ? "fa-solid fa-angle-right faint" : "fa-solid fa-angle-right"} onClick={() => handlePageSwitching(1)}></i>
            </div>
            <ToyList toys={toys} user={user} onRemoveToy={onRemoveToy} />
        </>
    )
}
