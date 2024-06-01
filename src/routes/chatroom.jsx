import { useState, useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { io } from "socket.io-client";
import url from '../devState';

const socket = io(url);

export default function Chatroom() {
    
    let { state } = useLocation();
    const user = useOutletContext();

    const [chatroomMessages, setChatroomMessages ] = useState([]);
    const [ chatroomID, setChatroomID ] = useState();

    useEffect(() => {
        fetch(url + `/api/chatrooms/${user.user_name}/${state.otherUser.user_name}`)
            .then((res) => {
                if (res.status === 404) {
                    setChatroomMessages([]);
                    fetch(url + `/api/chatrooms/create`, {
                        method: 'POST',
                        body: JSON.stringify({
                            user1: user._id,
                            user2: state.otherUser._id,
                        }),
                        headers: {
                            "Content-Type": "application/json;charset=utf-8",
                          },
                    })
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                setChatroomID(data._id);
                const newMessages = [];
                data.messages.map((message) => {
                    newMessages.push({
                        id: message._id,
                        timeStamp: message.updatedAt,
                        author: message.author.user_name, 
                        message: message.message });
                });
                setChatroomMessages(newMessages);
            })
    }, [user.user_name, state.otherUser.user_name]);

    const createNewMessage = (e) => {
        fetch(url + `/api/messages/create`, {
            method: 'POST',
            body: JSON.stringify({
                message: e.target[0].value,
                author: user._id,
            }),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return data._id;
        })
        .then((messageID) => {
            fetch(url + `/api/chatrooms/${chatroomID}/update`, {
                method: 'POST',
                body: JSON.stringify({
                    newMessage: messageID,
                }),
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
            })
            socket.emit("chat message", {id: messageID, timeStamp:new Date(), message: e.target[0].value, author: user.user_name});
            e.target[0].value = '';
        })
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createNewMessage(e);
    };

    socket.on('chat message', (arg) => {
        setChatroomMessages([...chatroomMessages, arg]);
    });

    return (
        <div id="chatroom">
            <h2>Chatroom: {user.user_name} & {state.otherUser.user_name}</h2>
            <ul className="chat_list">
                {chatroomMessages.map((message) => 
                    <li key={message.id}><span className="msg_author">{message.author}:</span> {message.message} <span className="time">{` (${message.timeStamp.slice(0,9)})`}</span></li>)}
            </ul>
            <form onSubmit={handleSubmit} className="send_message">
                <label htmlFor="new_message"></label>
                <input type="text" name="new_message" id="new_message" />
    
                <input type="submit" value="Send" />
            </form>
        </div>
    );
  }