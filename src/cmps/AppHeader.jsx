import { LoginSignup } from './LoginSignup.jsx'
import { userActions } from '../store/actions/user.actions.js'

import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export function AppHeader() {

	const user = useSelector(storeState => storeState.userModule.loggedInUser)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		verifyUser()
	}, [])

	async function verifyUser() {
		try {
			await userActions.loadLoggedInUser()
		} catch (err) {
			console.log('Cannot verify user')
		} finally {
			setIsLoading(false)
		}
	}

	function onLogout() {
		userActions.logoutUser()
	}

	function handleLoading() {
		if (isLoading) return <div className='loader-small'></div>
		if (!isLoading && user) return (
			<section className='logged-in'>
				<Link to={`/user/${user._id}`}>Hello, <span>{user.fullname}</span></Link>
				<button onClick={onLogout}>Logout</button>
			</section>
		)
		if (!isLoading && !user) return <LoginSignup />
	}

	return (
		<header className='header'>
			<nav>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/toy">Toys</NavLink>
				{user && user.isAdmin && <NavLink to="/users">Users</NavLink>}
				<NavLink to="/reviews">Reviews</NavLink>
				<NavLink to="/dashboard">Dashboard</NavLink>
				<NavLink to="/chat">Chat</NavLink>
				<NavLink to="/about">About</NavLink>
			</nav>
			{handleLoading()}
		</header>
	)
}
