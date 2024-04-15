import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';

function Login() {

    const [user, setUser] = useState();
  
    const loginUser = (e) => {
      fetch('https://chat-app-backend-o1po.onrender.com/api/users/login', {
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
        <h1>Welcome to Chat!</h1>
        <p>Please Log in</p>
        <form onSubmit={handleSubmit} className='login_form'>
          <label htmlFor="user_name">Username:</label>
          <input type="text" name="user_name" id="user_name" />
  
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" />
  
          <input type="submit" value="Log In" />
        </form>
        {/* eslint-disable-next-line react/no-unescaped-entities*/}
        <p>Don't have an account? <Link to='/signup'>Sign up here</Link></p>
        {user && (<Navigate to='/' replace={true} />)}
      </div>
    )
  }
  
  export default Login
  