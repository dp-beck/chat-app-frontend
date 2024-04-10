import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import Root from './routes/root.jsx';
import Login from './routes/login.jsx';
import Chatroom from './routes/chatroom.jsx';
import Signup from './routes/signup.jsx';
import Profile from './routes/profile.jsx';

const loader = async () => {
  const response = await fetch('http://localhost:3000/api/protected', {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    }
  });
  if (response.status === 401) {
    return redirect("/login");
  }
  const user = await response.json();
  return user;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: loader,
    children: [
      {
        path: "/chatroom/:id",
        element: <Chatroom />
      },
    ],
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: "user/:id",
    element: <Profile />,
    loader: loader,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
