import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { UserList } from './pages/UserList.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { About } from './pages/About.jsx'
import { InputModal } from './cmps/InputModal.jsx'
import { Reviews } from './pages/Reviews.jsx'
import { Chat } from './pages/Chat.jsx'

export function App() {
    return (
        <Provider store={store}>
            <Router>
                <UserMsg />
                <InputModal />
                <div className='main-app'>
                    <AppHeader />
                    <main className='main-container'>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/toy" element={<ToyIndex />} />
                            <Route path="/toy/:toyId" element={<ToyDetails />} />
                            <Route path="/users" element={<UserList />} />
                            <Route path="/user/:userID" element={<UserDetails />} />
                            <Route path="reviews" element={<Reviews />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="chat" element={<Chat />} />
                            <Route path="/about" element={<About />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                    <AppFooter />
                </div>
            </Router>
        </Provider>
    )
}
