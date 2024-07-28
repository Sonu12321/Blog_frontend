import React from 'react'
import {Avatar, Button, Dropdown, Navbar, TextInput} from 'flowbite-react'
import { Link,useLocation } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon,FaSun} from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux'
import { changeTheme } from '../Redux/theme/ThemeSlice.js'
import { SignoutSuccess } from '../Redux/user/userSlice.js'

function Header() {
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state=>state.user)
    const {theme} = useSelector(state=>state.theme)

    console.log(currentUser,"asdnasdn");
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

    <Navbar className='border-b-2 '>
        <Link to='/' className='self-center font-semibold whitespace-nowrap text-sm sm:text-xl dark:text-white '>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-700 to-fuchsia-800 rounded-lg text-white'>Sonu's</span>
        Blog
        </Link>
        <form>
            <TextInput 
            type='text'
            placeholder='search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
            />
        </form>
            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch/>
            </Button>
            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={()=>dispatch(changeTheme())}>
                    {theme === 'light'? <FaSun/>:<FaMoon/>}
                    
                </Button>
                {currentUser ?(
                    <Dropdown
                    gradientDuoTone='greenToBlue'
                    >
                        <Avatar 
                        alt='user'
                        />
                        <Dropdown.Header>
                            {/* <span className='block text-sm'>@{currentUser?.data?.username ? currentUser?.data?.username  : currentUser?.username }</span> */}
                            <span className='block text-sm font-medium truncate'>{currentUser?.email ? currentUser?.email : currentUser?.email}</span>
                        </Dropdown.Header>
                        <Link to='/dashboard?tab=profile'>
                        <Dropdown.Item>
                            Profile
                        </Dropdown.Item>
                        </Link>
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={handlesignout}>
                            Sign-out
                        </Dropdown.Item>
                    </Dropdown>
                ):
                
            (    <Link to='/sign-in' >
                <Button gradientDuoTone='purpleToBlue' outline>Sign-in</Button>
                </Link>)
            }
                <Navbar.Toggle/>
            </div>
                <Navbar.Collapse>
                    <Navbar.Link active={path === '/'} as={'div'}>
                        <Link to='/'>
                        Home
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === '/About'} as={'div'}>
                        <Link to='/About'>
                        About
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === '/Project'}as={'div'}>
                        <Link to='/Project'>
                        Project
                        </Link>
                    </Navbar.Link>
                </Navbar.Collapse>
    </Navbar>
  )
}

export default Header