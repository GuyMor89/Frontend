import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CHANGE_FILTER_BY, SET_MODAL } from "../store/reducers/toy.reducer"
import { Box, Slider } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from "react"
import { utilService } from "../services/util.service"
import { Formik, Form, Field, ErrorMessage } from 'formik'

export function ToyFilter() {

    const dispatch = useDispatch()

    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    const debouncedSetFilterRef = useRef(utilService.debounce(handleInputsFormik, 500))

    // function handleInputs(event) {
    //     let keyword = ''
    //     let minPrice = ''

    //     if (event.target.name === 'search') {
    //         keyword = event.target.value
    //         dispatch({ type: CHANGE_FILTER_BY, filterBy: { name: keyword } })
    //     }
    //     if (event.target.name === 'min-price') {
    //         minPrice = event.target.value
    //         dispatch({ type: CHANGE_FILTER_BY, filterBy: { minPrice } })
    //     }
    // }

    function handleInputsFormik(input, value) {
        if (input === 'search') dispatch({ type: CHANGE_FILTER_BY, filterBy: { name: value } })
        if (input === 'min-price') dispatch({ type: CHANGE_FILTER_BY, filterBy: { minPrice: value } })
    }

    return (
        <section className='info-actions'>
            <fieldset>
                <legend>Filter</legend>
                <Formik
                    initialValues={{ search: '', minPrice: filterBy.minPrice }}
                >
                    {({ handleChange, setFieldValue }) => (
                        <Form>
                            <div>
                                <Field
                                    type="search"
                                    name="search"
                                    placeholder="Search.."
                                    onChange={(e) => {
                                        handleChange(e)
                                        debouncedSetFilterRef.current(e.target.name, e.target.value)
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="min-price">Min Price</label>
                                <Box sx={{ width: 150 }}>
                                    <Slider
                                        onChange={(e, value) => {
                                            setFieldValue('minPrice', value)
                                            debouncedSetFilterRef.current(e.target.name, value)
                                        }}
                                        defaultValue={filterBy.minPrice}
                                        name='min-price'
                                        aria-label="Default"
                                        valueLabelDisplay="auto" />
                                </Box>
                            </div>

                        </Form>
                    )}
                </Formik>
                {user && <button className='add-button' onClick={() => { dispatch({ type: SET_MODAL, modal: { open: true, type: 'add', toy: null } }) }}><FontAwesomeIcon style={{ fontSize: '2em' }} icon={faPlus} /></button>}
            </fieldset>
        </section>
    )
}