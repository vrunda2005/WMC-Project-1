import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import  './index.css'
import Home from './components/Home/Home'
import About from './components/About/About'
import Donate from './components/Donate/Donate'
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
        path:"About",
        element:<About/>
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
