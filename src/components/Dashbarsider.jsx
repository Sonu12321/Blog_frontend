import React, { useEffect, useState } from 'react'
import {Sidebar} from 'flowbite-react'
import { HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SignoutSuccess } from '../Redux/user/userSlice.js'



function Dashbarsider() {
    const location = useLocation()
    const dispatch = useDispatch()
  const [tab,setTab]=useState('')
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFormUrl = urlParams.get('tab')
    if(tabFormUrl){
      setTab(tabFormUrl)
    }
  },[location.search])

  const handlesignout = async()=>{
    try {
      const res = await fetch('/api/user/Signout',{
        method:'POST'
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data.message);
      }else{
        dispatch(SignoutSuccess())
      }
      
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
        <Sidebar className='w-full md:w-56'>
        <Sidebar.Items >
            <Sidebar.ItemGroup className='flex flex-col gap-1'> 
                <Link to='/dashboard?tab=Profile'>
                <Sidebar.Item active={tab === 'Profile'} icon={HiUser} label={'User'} labelColor='dark' as='div'>
                    Profile
                </Sidebar.Item>
                </Link>

                <Link to='/dashboard?tab=posts'>
                  <Sidebar.Item
                  active={tab === 'posts'}
                  icon={HiDocumentText}
                  as='div'
                  >post</Sidebar.Item>
                </Link>
                <Link to='/dashboard?tab=users'>
                  <Sidebar.Item
                  active={tab === 'users'}
                  icon={HiOutlineUserGroup}
                  as='div'
                  >Users</Sidebar.Item>
                </Link>
                <Sidebar.Item 
                 icon={HiArrowSmRight} 
                 className='cursor-pointer' 
                 onClick={handlesignout}>
                    Sign-out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
    </>
  )
}

export default Dashbarsider