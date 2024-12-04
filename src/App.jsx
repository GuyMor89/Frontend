import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { Route, BrowserRouter as Router , Routes } from 'react-router-dom'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx'
import { BugIndex } from './pages/BugIndex.jsx'
import { BugDetails } from './pages/BugDetails.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { UserList } from './pages/UserList.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'


export function App() {
    return (
        <Provider store={store}>
            <Router>
                <UserMsg />
                <div className='main-app'>
                    <AppHeader />
                    <main className='container'>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/bug" element={<BugIndex />} />
                            <Route path="/bug/:bugId" element={<BugDetails />} />
                            <Route path="/users" element={<UserList />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/user/:userID" element={<UserDetails />} />
                        </Routes>
                    </main>
                    <AppFooter />
                </div>
            </Router>
        </Provider>
    )
}