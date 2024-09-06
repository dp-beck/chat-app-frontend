import { useState } from "react";
import { Navigate } from "react-router-dom";
import url from "../devState";

function Signup() {
  const [userCreated, setUserCreated] = useState(false);
  const [signupErrors, setSignupErrors] = useState([]);

  const createUser = (e) => {
    try {
      fetch(url + "/api/users/create", {
        method: "POST",
        body: JSON.stringify({
          user_name: e.target[0].value,
          password: e.target[1].value,
          first_name: e.target[2].value,
          last_name: e.target[3].value,
          email: e.target[4].value,
        }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.errors) {
            setSignupErrors(data.errors);
          } else {
            setUserCreated(true);
          }
        });
    } catch (error) {
      console.error("Fetch", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(e);
  };

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
            Sign up for Chat!
          </h1>
          <p className="col-lg-10 fs-4">
            Hey... You know the drill .. Just give us some of your deets, and
            soon you will be chatting it up with all your friends!
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

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                name="first_name"
                id="first_name"
                placeholder="first name"
              />
              <label htmlFor="first_name">First Name:</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                name="last_name"
                id="last_name"
                placeholder="last name"
              />
              <label htmlFor="last_name">Last Name:</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="email@example.com"
              />
              <label htmlFor="email">Email:</label>
            </div>

            <input
              className="w-100 btn btn-lg btn-primary"
              type="submit"
              value="Submit"
            />
          </form>
          <ul>
            {signupErrors.map((error) => (
              <li className="signupErrors" key={signupErrors.indexOf(error)}>
                {error.msg}
              </li>
            ))}
          </ul>
          {userCreated && <Navigate to="/login" replace={true} />}
        </div>
      </div>
    </div>
  );
}
export default Signup;
