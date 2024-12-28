import { useState } from 'react'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { userActions } from '../store/actions/user.actions.js'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

export function LoginSignup() {

    const [isSignup, setIsSignUp] = useState(false)

    async function login(credentials) {
        try {
            await userActions.loginUser(credentials)
            showSuccessMsg('Logged in successfully')
        } catch {
            showErrorMsg('Oops try again')
        }
    }

    async function signup(credentials) {
        try {
            await userActions.signupUser(credentials)
            showSuccessMsg('Signed up successfully')
        } catch {
            showErrorMsg('Oops try again')
        }
    }

    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Username is required')
            .min(3, 'At least 3 characters'),
        password: Yup.string()
            .required('Password is required')
            .min(5, 'At least 5 characters'),
        fullname: isSignup
            ? Yup.string().required('Full name is required')
            : Yup.mixed().notRequired()
    })

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
        <div className="login-page">
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    fullname: isSignup ? '' : undefined
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    isSignup ? signup(values) : login(values)
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        {addFormikField(errors, touched, { fieldName: 'username', type: 'text', placeholder: 'Username', focus: 'autoFocus' })}
                        {addFormikField(errors, touched, { fieldName: 'password', type: 'text', placeholder: 'Password', focus: 'none' })}

                        {isSignup && (
                        addFormikField(errors, touched, { fieldName: 'fullname', type: 'text', placeholder: 'Full name', focus: 'none' })
                        )}

                        <button>{isSignup ? 'Signup' : 'Login'}</button>

                        <section className="btns">
                            <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                                {isSignup ?
                                    'Already a member? Login' :
                                    'New user? Signup here'
                                }
                            </a >
                        </section>
                    </Form>
                )}
            </Formik>
        </div >
    )
}
