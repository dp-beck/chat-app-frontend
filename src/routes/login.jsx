import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';

const backendDev = 'http://localhost:3000';
const backendProd = 'https://chat-app-backend-o1po.onrender.com';

function Login() {

    const [user, setUser] = useState();
  
    const loginUser = (e) => {
      fetch(backendDev + '/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
          user_name: e.target[0].value,
          password: e.target[1].value,
        }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }).then((res) => {
        return res.json()
      }).then((data) => {
        setUser(e.target[0].value);
        localStorage.setItem('token', data.token);
        console.log("You are Logged in");
        console.log(`User: ${user}`);
        console.log(data.token);
      })
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      loginUser(e);
    }
  
    return (
      <div className='login'> 
        <h1>Chat!</h1>
        <form onSubmit={handleSubmit} className='login_form'>

          <h2>Welcome Back!</h2>
          <label htmlFor="user_name">Username:</label>
          <input type="text" name="user_name" id="user_name" />
  
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" />
  
          <input type="submit" value="Log In" />
        </form>
        {/* eslint-disable-next-line react/no-unescaped-entities*/}
        <p>Don't have an account? <Link to='/signup'>Sign up here</Link></p>
        <p>You can also log in as our test account. Username is 'test.' Password is 'testtest.' </p>
        {user && (<Navigate to='/' replace={true} />)}
      </div>
    )
  }
  
  export default Login
  