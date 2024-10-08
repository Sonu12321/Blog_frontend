import React, { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SignoutSuccess } from '../Redux/user/userSlice.js';
import axios from 'axios';

function Dashbarsider() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handlesignout = async () => {
    try {
      const res = await axios.post('/api/user/Signout');
      const data = res.data;

      if (res.status !== 200) {
        console.log(data.message);
      } else {
        dispatch(SignoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
          <Sidebar.ItemGroup className='flex flex-col gap-1'>
            {currentUser && currentUser.isAdmin && (
              <Link to='/dashboard?tab=dash'>
                <Sidebar.Item
                  active={tab === 'dash' || !tab}
                  icon={HiChartPie}
                  as='div'
                >
                  Dashboard
                </Sidebar.Item>
              </Link>
            )}
            <Link to='/dashboard?tab=Profile'>
              <Sidebar.Item
                active={tab === 'Profile'}
                icon={HiUser}
                label={currentUser.isAdmin ? 'Admin' : 'User'}
                labelColor='dark'
                as='div'
              >
                Profile
              </Sidebar.Item>
            </Link>

            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as='div'>
                Post
              </Sidebar.Item>
            </Link>
            <Sidebar.Items>
          <Sidebar.ItemGroup className='flex flex-col gap-1'>
            {currentUser && currentUser.isAdmin && (
              <Link to='/dashboard?tab=dash'>
                <Sidebar.Item
                  active={tab === 'dash' || !tab}
                  icon={HiChartPie}
                  as='div'
                >
                  users
                </Sidebar.Item>
              </Link>
            )}
            </Sidebar.ItemGroup>
            </Sidebar.Items>


          <Link to='/create-post '>
              <Sidebar.Item active={tab === 'create-post'} icon={HiOutlineUserGroup} as='div'>
                Create Post
              </Sidebar.Item>
            </Link>

            <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handlesignout}>
              Sign-out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
}

export default Dashbarsider;
