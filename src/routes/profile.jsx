import { useState } from "react";
import { useLoaderData, Navigate } from "react-router-dom";

const backendDev = 'http://localhost:3000';
const backendProd = 'https://chat-app-backend-o1po.onrender.com';

function Profile() {

    const user = useLoaderData();

    const [isUpdated, setIsUpdated] = useState(false);

    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);

    const updateUser = () => {
        fetch(backendProd + `/api/users/${user._id}/update`, {
            method: 'POST',
            body: JSON.stringify({
              user_name: user.user_name,
              first_name: firstName,
              last_name: lastName,
              email: email,
            }),
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          }).then((res) => {
            return res.json();
          }).then(() => {
            setIsUpdated(true);
          })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser();
    }

    return (
        <div className="user_profile">
            <h1>User Profile: {user.user_name}</h1>
            <form onSubmit={handleSubmit} className="manage_profile_form">
              
              <div className="manage_profile_form_entry">
                <label htmlFor="first_name">First Name:</label>
                <input type="text" name="first_name" id="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
              </div>
              
              <div className="manage_profile_form_entry">
                <label htmlFor="last_name">Last Name:</label>
                <input type="text" name="last_name" id="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
              </div>
              
              <div className="manage_profile_form_entry">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>

                <input type="submit" value="Submit" />
                <p>Hit Submit to save changes your information.</p>
            </form>
            {isUpdated && (<Navigate to='/' replace={true} />)}
        </div>
    );
}

export default Profile;