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
        <div className="container">
          <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <h1 className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
              Welcome to Chat, {user.user_name}!
            </h1>
            <ul className="nav nav-pills">
              <li className="nav-item">
                <button onClick={signOut} className="nav-link">
                  Sign Out
                </button>
              </li>
              <li className="nav-item">
                <Link to={`user/${user._id}`} className="nav-link">
                  Manage Profile
                </Link>
              </li>
            </ul>
          </header>
        </div>
        <main className="container">
          <div className="row">
            <div
              className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary"
              style={{ width: "280px" }}
            >
              <h2 className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                Who do you want to chat with?
              </h2>
              <hr />
              <ul className="nav nav-pills flex-column mb-auto">
                {userList.map((user) => (
                  <li key={user._id} className="nav-item">
                    <Link
                      to={`chatroom/${user._id}`}
                      state={{ otherUser: user }}
                      className="nav-link"
                    >
                      {user.user_name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="col bg-body-tertiary">
                <Outlet context={user} />
            </div>

          </div>

        </main>

        {signedOut && <Navigate to="/" replace={true} />}
      </div>
    );
  }