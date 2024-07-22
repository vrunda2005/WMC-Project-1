import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import  './index.css'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import About from './components/About/About'
import Donate from './components/Donate/Donate'
import Signup from './components/Signup/SignUp'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import Quiz from './components/Quiz/Quiz.jsx'
import Admin from './components/Admin.jsx'
import MembershipPage from './components/Membership/membership_temp.jsx'
import MembershipLayout from './components/Membership/MembershipLayout.jsx'
import MembershipTier from './components/Membership/epsilon_program_membership.jsx'
import { AuthProvider } from './creatContext.jsx'
import StoryPage from './components/stories/storyPage.jsx'




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
        element:<MembershipPage/>
      },
      {
        path:"Donate",
        element:<Donate/>
      },
      {
        path:"Quiz",
        element:<Quiz/>
      },
      {
        path:"Admin",
        element:<Admin/>
      },
      {
        path:"createEvent",
        element:<createEvent/>
      },
      {
        path:"MembershipLayout/:membership_id",
        element:<MembershipLayout/>
      },
      {
        path:"/epsilon_program_membership/:membership_id",
        element:<MembershipTier/>
      },
      {
        path:"storyPage",
        element:<StoryPage/>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
