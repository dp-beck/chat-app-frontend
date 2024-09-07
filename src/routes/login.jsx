import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import url from "../devState";

const wrongInfoMsgStyle = {
  color: "red",
  fontWeight: 600,
};

function Login() {
  const [user, setUser] = useState();
  const [wrongInfoMsg, setWrongInfoMsg] = useState(false);

  const loginUser = (user_name, password) => {
    try {
      fetch(url + "/api/users/login", {
        method: "POST",
        body: JSON.stringify({
          user_name: user_name,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            if (res.status === 400) {
              setWrongInfoMsg(true);
            }
            if (res.status === 404) throw new Error("404, Not found");
            if (res.status === 500)
              throw new Error("500, internal server error");
            throw new Error(res.status);
          }
        })
        .then((data) => {
          setUser(user_name);
          localStorage.setItem("token", data.token);
        });
    } catch (error) {
      console.error("Fetch", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(e.target[0].value, e.target[1].value);
  };

  const testLogIn = () => {
    loginUser("TestGuy98", "testtest");
  };

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
            Welcome to Chat!
          </h1>
          <p className="col-lg-10 fs-4">
            A simple realtime chat application that you can use
            to chat with any user at any time. Log in or sign up to get started
            and start Chatting!
          </p>
        </div>

        <div className="col-md-10 mx-auto col-lg-5">
          <form
            onSubmit={handleSubmit}
            className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
          >
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                name="user_name"
                id="user_name"
                placeholder="name"
              />
              <label htmlFor="user_name">Username:</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="password"
              />
              <label htmlFor="password">Password:</label>
            </div>

            <input
              className="w-100 btn btn-lg btn-primary"
              type="submit"
              value="Log In"
            />

            <hr className="my-4" />
            {/* eslint-disable-next-line react/no-unescaped-entities*/}
            <small className="text-body-secondary">
              Don't have an account? <Link to="/signup">Sign up here</Link>
            </small>
            <hr />
            <small className="text-body-secondary">
              Want to use a test account to explore?
              <button className="btn btn-link" onClick={testLogIn}>Click here</button>
            </small>
          </form>
          {wrongInfoMsg && (
            <p style={wrongInfoMsgStyle}>Wrong username or password entered.</p>
          )}

          {user && <Navigate to="/" replace={true} />}
        </div>
      </div>
    </div>
  );
}

export default Login;
