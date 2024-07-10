import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import  './index.css'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import About from './components/About/About'
import Donate from './components/Donate/Donate'
import Membership from './components/Membership/Membership'
import Signup from './components/Signup/SignUp'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import Quiz from './components/Quiz/Quiz.jsx'


const router=createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        path:"",
        element:<Home />
      },
      {
        path:"Signup",
        element:<Signup />
      },
      {
        path:"Login",
        element:<Login />
      },
      {
        path:"About",
        element:<About/>
      },
      {
        path:"Membership",
        element:<Membership/>
      },
      {
        path:"Donate",
        element:<Donate/>
      },
      {
        path:"quiz",
        element:<Quiz/>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
