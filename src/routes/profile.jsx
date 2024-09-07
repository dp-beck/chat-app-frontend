import { useState } from "react";
import { useLoaderData, Navigate } from "react-router-dom";
import url from "../devState";
function Profile() {
  const user = useLoaderData();

  const [isUpdated, setIsUpdated] = useState(false);

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);

  const updateUser = () => {
    fetch(url + `/api/users/${user._id}/update`, {
      method: "POST",
      body: JSON.stringify({
        user_name: user.user_name,
        first_name: firstName,
        last_name: lastName,
        email: email,
      }),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        setIsUpdated(true);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
  };

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
            User Profile: {user.user_name}
          </h1>
          <p className="col-lg-10 fs-4">
            Wanna update your deets? Go right ahead! Just hit submit to save
            your changes.
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
                name="first_name"
                id="first_name"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label htmlFor="first_name">First Name:</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                name="last_name"
                id="last_name"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label htmlFor="last_name">Last Name:</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email:</label>
            </div>

            <input
              className="w-100 btn btn-lg btn-primary"
              type="submit"
              value="Submit"
            />
          </form>
          {isUpdated && <Navigate to="/" replace={true} />}
        </div>
      </div>
    </div>
  );
}

export default Profile;
