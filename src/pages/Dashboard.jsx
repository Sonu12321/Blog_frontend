import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import Dashbarsider from '../components/Dashbarsider'
import Dashprofile from '../components/Dashprofile'
import Dashposts from '../components/Dashposts'
// import DashUsers from '../components/DashOnlyusers'
import DashUserShow from '../components/DashUserShow'
import DashboardComp from '../components/DashboardComp'
import CreatePost from './CreatePost'



function Dashboard() {
  const location = useLocation()
  const [tab,setTab]=useState('')
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFormUrl = urlParams.get('tab')
    if(tabFormUrl){
      setTab(tabFormUrl)
    }
  },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className="m-w-46">
        <Dashbarsider/>
        {/* {sidebar} */}
      </div>
        {tab === 'Profile' && <Dashprofile/> }
        {/* {profile} */}
        {/* {dashposts} */}
        {tab === 'posts' && <Dashposts/>}
        {/* {dashboardUSers} */}
        {tab === 'users' && <DashUserShow/>}
        {/*dashboard*/ }
        {tab === 'dash' && <DashboardComp />}
        {/* Posting */}
        {tab === 'Posting' && <CreatePost/>}

        </div>

  )
}

export default Dashboard