import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';

const backendDev = 'http://localhost:3000';
const backendProd = 'https://chat-app-backend-o1po.onrender.com';

const wrongInfoMsgStyle = {
  color: 'red',
  fontWeight: 600,
};

function Login() {

    const [user, setUser] = useState();
    const [wrongInfoMsg, setWrongInfoMsg] = useState(false);
  
    const loginUser = (e) => {
      try {
        fetch(backendProd + '/api/users/login', {
          method: 'POST',
          body: JSON.stringify({
            user_name: e.target[0].value,
            password: e.target[1].value,
          }),
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }).then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            if (res.status === 400) {setWrongInfoMsg(true)};
            if (res.status === 404) throw new Error('404, Not found');
            if (res.status === 500) throw new Error('500, internal server error');
            throw new Error(res.status);
          }
        }).then((data) => {
          setUser(e.target[0].value);
          localStorage.setItem('token', data.token);
        })
      }
      catch (error) {
        console.error('Fetch', error);
      }
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
        {wrongInfoMsg && (<p style={wrongInfoMsgStyle}>Wrong username or password entered.</p>)}
        {/* eslint-disable-next-line react/no-unescaped-entities*/}
        <p>Don't have an account? <Link to='/signup'>Sign up here</Link></p>
        <p>You can also log in as our test account. Username is 'test.' Password is 'testtest.' </p>
        {user && (<Navigate to='/' replace={true} />)}
      </div>
    )
  }
  
  export default Login
  