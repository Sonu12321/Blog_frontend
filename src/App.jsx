import React from 'react'
import { BrowserRouter ,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import Signup from './pages/Signup'
import Header from './components/Header'
import Footerdown from './components/Footer.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Signin from './pages/Signin.jsx'
// import OnlyPrivateRoute from './components/OnlyPrivateRoute.jsx'
import CreatePost from './pages/CreatePost.jsx'
import UpdatePost from './pages/UpdatePost.jsx'
import OnlyPrivateRoute from './components/OnlyPrivateRoute.jsx'

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route element={<PrivateRoute/>} >
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route element={<OnlyPrivateRoute/>} >
      <Route path="/create-post" element={<CreatePost />} />
      <Route path='/update-post/:postId' element={<UpdatePost />} />
      </Route>
      {/* <Route path="/create-post" element={<CreatePost />} /> */}

      
      {/* <Route path="/updatepost/:postId" element={<UpdatePost />} /> */}
      
      <Route path="/project" element={<Project/>}/>
      <Route path="/sign-in" element={<Signin/>}/>
      <Route path="/sign-up" element={<Signup/>}/>
    </Routes>
    <Footerdown/>
    </BrowserRouter>
  )
}

export default App