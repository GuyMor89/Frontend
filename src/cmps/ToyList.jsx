import { useNavigate } from 'react-router-dom'

import { ToyPreview } from './ToyPreview.jsx'
import React, { useEffect, useState } from 'react'
import { InputModal } from './InputModal.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { SET_MODAL } from '../store/reducers/toy.reducer.js'

export function ToyList({ toys, user, onRemoveToy }) {

    const [loaderDuration, setLoaderDuration] = useState(250)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const toy = useSelector(storeState => storeState.toyModule.modal.toy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    function handleButtons(toy) {
        if (!user) return false
        if (user.isAdmin) return true
        if (toy.owner && toy.owner.fullname === user.fullname) return true
    }

    useEffect(() => {
        setTimeout(() => {
            const [navigationTiming] = performance.getEntriesByType('navigation')
            if (navigationTiming) {
                const loadTime = navigationTiming.loadEventEnd - navigationTiming.startTime
                console.log(loadTime)
                setLoaderDuration(loadTime)
            }
        }, 0)
    }, [])

    if (isLoading) return <div className='loader-big'></div>
    // if (isLoading) return <div className='progress' style={{ animationDuration: `${loaderDuration}ms` }}></div>

    return (
        <ul className="toy-list">
            <InputModal type={'edit'} toy={toy} />
            {toys.map((toy) => (
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div className='preview-buttons'>
                        <button onClick={() => navigate(`/toy/${toy._id}`)}><i className="fa-solid fa-book-open"></i></button>
                        {handleButtons(toy) && <React.Fragment>
                            <button onClick={() => onRemoveToy(toy._id)}><i className="fa-regular fa-trash-can"></i></button>
                            <button onClick={() => dispatch({ type: SET_MODAL, modal: { open: true, type: 'msg', toy } })}><i className="fa-solid fa-envelope"></i></button>
                            <button onClick={() => dispatch({ type: SET_MODAL, modal: { open: true, type: 'edit', toy } })}><i className="fa-regular fa-pen-to-square"></i></button>
                        </React.Fragment>}
                    </div>
                </li>
            ))
            }
        </ul >
    )
}
