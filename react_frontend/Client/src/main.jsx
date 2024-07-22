import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import  './index.css'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import About from './components/About/About'
import Donate from './components/Donate/Donate'
import Signup from './components/Signup/SignUp'
import Events from './components/Events/Events.jsx'
import Blog from './components/Blog/Blog.jsx'
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
<<<<<<< HEAD
        path:"Events",
        element:<Events/>
      },
      {
        path:"Blog",
        element:<Blog/>
=======
        path:"createEvent",
        element:<createEvent/>
>>>>>>> 62676a2baba6396a450c520ba0e0475926f09ad1
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
