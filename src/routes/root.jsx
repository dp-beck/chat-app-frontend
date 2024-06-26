import { useState, useEffect } from "react";
import { useLoaderData, Outlet, Link, Navigate } from "react-router-dom";
import url from '../devState';

export default function Root() {
    
    const user = useLoaderData();

    const [userList, setUserList] = useState([]);
    const [signedOut, setSignedOut ] = useState(false);

    useEffect(() => {
        fetch(url + '/api/users')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                const userList = data.filter((entry) => entry.user_name !== user.user_name);
                setUserList(userList);
            })
    }, []);

    const signOut = () => {
        localStorage.removeItem("token");
        setSignedOut(true);
    };

    return (
        <div className="root">
            <h1>Welcome to Chat App, {user.user_name}!</h1>
            <h2>Who do you want to chat with?</h2>
            <ul className="user_list">
                {userList.map((user) => <li key={user._id}>
                        <Link to={`chatroom/${user._id}`} state={{otherUser: user}}>{user.user_name}</Link>
                    </li>)}
            </ul>
            <div>
                <Outlet context={user}/>
            </div>
            <button onClick={signOut} className="signout_button">Sign Out</button>
            {signedOut && (<Navigate to='/' replace={true}/>)}
            <Link to={`user/${user._id}`}>Manage Profile</Link>
        </div>
    );
  }