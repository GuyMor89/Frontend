import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { socketService } from '../services/socket.service'

export function Chat() {
    const [msg, setMsg] = useState({ text: '' })
    const [msgs, setMsgs] = useState([])
    const [room, setRoom] = useState('Love')
    const [isBotMode, setIsBotMode] = useState(false)
    const [whoIsTyping, setWhoIsTyping] = useState(null)

    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    const botTimeoutRef = useRef()
    const whoIsTypingTimeout = useRef()

    useEffect(() => {
        socketService.on('msg-from-server', renderMsg)
        socketService.on('user-is-typing', handleTyping)

        return () => {
            socketService.off('msg-from-server', renderMsg)
            botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
            socketService.off('user-is-typing', handleTyping)
        }
    }, [])

    useEffect(() => {
        socketService.emit('set-room', room)
        setMsgs([])
    }, [room])

    useEffect(() => {
        if (msg.text === '') return
        socketService.emit('user-is-typing', {user: loggedInUser.fullname, userID: loggedInUser._id})
    }, [msg])

    function renderMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function handleTyping(user) {
        setWhoIsTyping(user)

        whoIsTypingTimeout.current && clearTimeout(whoIsTypingTimeout.current)
        whoIsTypingTimeout.current = setTimeout(() => {
            setWhoIsTyping(null)
        }, 500);
    }

    function sendBotResponse() {
        // Handle case: send single bot response (debounce).
        botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
        botTimeoutRef.current = setTimeout(() => {
            setMsgs(prevMsgs => ([...prevMsgs, { from: 'Bot', text: 'You are amazing!' }]))
        }, 1250)
    }

    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Me'
        const newMsg = { from, text: msg.text }
        socketService.emit('msg-from-socket', newMsg)
        if (isBotMode) sendBotResponse()
        // while dummy sockets - we add the msg ourself
        // addMsg(newMsg)
        setMsg({ text: '' })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    return (
        <section className="chat">
            <h2>Lets Chat about</h2>
            <h3>{room}</h3>

            <label className='bot-mode'>
                <input type="checkbox" name="isBotMode" checked={isBotMode}
                    onChange={({ target }) => setIsBotMode(target.checked)} />
                Bot Mode
            </label>

            <div>
                <label>
                    <input type="radio" name="room" value="Love"
                        checked={room === 'Love'} onChange={({ target }) => setRoom(target.value)} />
                    Love
                </label>

                <label>
                    <input
                        type="radio" name="room" value="Politics"
                        checked={room === 'Politics'} onChange={({ target }) => setRoom(target.value)} />
                    Politics
                </label>

            </div>

            <form onSubmit={sendMsg}>
                <input
                    type="text" value={msg.text} onChange={handleFormChange}
                    name="text" autoComplete="off" />
                <button>Send</button>
            </form>

            <main>
                <section>{whoIsTyping ? `${whoIsTyping} is typing..` : ''}</section>
                {msgs.map((msg, idx) => (<div key={idx}><h5>{msg.from}:</h5> <h6>{msg.text}</h6></div>))}
            </main>
        </section>
    )
}