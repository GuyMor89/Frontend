import { LoginSignup } from './LoginSignup.jsx'
import { userActions } from '../store/actions/user.actions.js'

import { Link, NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export function AppHeader() {

	const user = useSelector(storeState => storeState.userModule.loggedInUser)

	useEffect(() => {
		userActions.loadLoggedInUser()
	}, [])

	function onLogout() {
		userActions.logoutUser()
	}

	return (
		<header className='header'>
			<nav>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/toy">Toys</NavLink>
				{user && user.isAdmin && <NavLink to="/users">Users</NavLink>}
				<NavLink to="/dashboard">Dashboard</NavLink>
				<NavLink to="/about">About</NavLink>
			</nav>
			{user ? (
				<section className='logged-in'>
					<Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
					<button onClick={onLogout}>Logout</button>
				</section>
			) : (
				<LoginSignup />
			)}
		</header>
	)
}
