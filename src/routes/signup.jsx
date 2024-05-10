import { useState } from "react";
import { Navigate } from "react-router-dom";

const backendDev = 'http://localhost:3000';
const backendProd = 'https://chat-app-backend-o1po.onrender.com';

function Signup() {

    const [userCreated, setUserCreated] = useState(false);
    const [signupErrors, setSignupErrors] = useState([]);

    const createUser = (e) => {
      try {
        fetch(backendProd + '/api/users/create', {
              method: 'POST',
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
            }).then((res) => {
              return res.json();
            }).then((data) => {
              if (data.errors) {
                setSignupErrors(data.errors);
              } else {
                setUserCreated(true);
              }
            })
          } catch (error) {
            console.error('Fetch', error);
          }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser(e);
    }

    return (
        <div className="signup">
            <h1> Chat! </h1>
                <form onSubmit={handleSubmit} className="signup_form">
                    <h2>Sign Up!</h2>
                    <div className="signup_entry">
                      <label htmlFor="user_name">Username:</label>
                      <input type="text" name="user_name" id="user_name" />
                    </div>
                    
                    <div className="signup_entry">
                      <label htmlFor="password">Password:</label>
                      <input type="password" name="password" id="password" />
                    </div>

                    <div className="signup_entry">
                      <label htmlFor="first_name">First Name:</label>
                      <input type="text" name="first_name" id="first_name" />
                    </div>

                    <div className="signup_entry">                    
                      <label htmlFor="last_name">Last Name:</label>
                      <input type="text" name="last_name" id="last_name" />
                    </div>
                    
                    <div className="signup_entry">
                      <label htmlFor="email">Email:</label>
                      <input type="email" name="email" id="email" />
                    </div>
                    
                    <input type="submit" value="Submit" />
                </form>
                <ul>
                  {signupErrors.map(error => <li className="signupErrors" key={signupErrors.indexOf(error)}>{error.msg}</li>)}
                </ul>
                {userCreated && <Navigate to='/login' replace={true}/>}
        </div>
    )
}
export default Signup;