  import { Alert, Button, Dropdown, Modal, TextInput } from 'flowbite-react'
  import React, { useState } from 'react'
  import { useDispatch, useSelector } from 'react-redux'
  import { updateFailure,
    updateStart,
    updateSuccess,
    deleteUserFailure,
    deleteUserSuccess,
    deleteUserStart,
    SignoutSuccess
    
  } from '../Redux/user/userSlice'
  import { HiOutlineExclamationCircle } from 'react-icons/hi';
  import {Link } from 'react-router-dom'

  function Dashprofile() {
      
      const {currentUser,error} = useSelector((state)=>state.user)
      const [formdata,setFormdata] = useState({})
      const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
      const [updateUserError, setUpdateUserError] = useState(null);
      const [showmodal, setShowmodal] = useState(false);

      const dispatch = useDispatch();

      console.log(currentUser._id)
      
      const handlechange=(e)=>{
        setFormdata({...formdata,[e.target.id]:e.target.value})
      }
      console.log(formdata)
      
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        if (Object.keys(formdata).length === 0) {
          return;
        }
        try {
          dispatch(updateStart());
          let userId = currentUser._id
          console.log(userId);
          const res = await fetch(`/api/user/updates/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            
            body: JSON.stringify(formdata),
            
          });
          
             
            const data = await res.json();
            
        if (!res.ok) {
          dispatch(updateFailure(data.message));
          setUpdateUserError(data.message);
        } else {
          dispatch(updateSuccess(data));
          setUpdateUserSuccess("User's profile updated successfully");
        }
      } catch (error) {
        dispatch(updateFailure(error.message));
        setUpdateUserError(error.message);
      }
      }
      const handleDeleteUser = async () => {
        setShowmodal(false);
        try {
          dispatch(deleteUserStart());
          const res = await fetch(`/api/user/delete/${currentUser._id}`, {
            method: 'DELETE',
          });
          const data = await res.json();
          if (!res.ok) {
            dispatch(deleteUserFailure(data.message));
          } else {
            dispatch(deleteUserSuccess(data));
          }
        } catch (error) {
          dispatch(deleteUserFailure(error.message));
        }
      };

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
  <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className="flex flex-col " >
    <div  className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
      <img src={currentUser.profilePicture} alt='user' className='rounded-full w-full h-full object-cover border-8 border-[lightgray] 
            '           />
          </div>

      <TextInput className='py-1' type='text' placeholder='username' id='username' defaultValue={currentUser.username}onChange={handlechange}/>
      <TextInput className='py-1' type='text' placeholder='email' id='email' defaultValue={currentUser.email}onChange={handlechange}/>
      <TextInput className='py-1' type='text' placeholder='*********' id='password'onChange={handlechange}/>
      <br/>
      <Button className='mt-2 ' type='submit' gradientDuoTone='purpleToBlue' onClick={handleSubmit}>
          Update
      </Button>
      
       <br/>
          <Link to={'/createpost'}>
            <Button
            
            type='button'
            gradientDuoTone='purpleToPink'
            className='w-full mt-2'
            >
              Create a post
            </Button>
          </Link>
        
      

      </form>
      <div className="text-blue-600 flex justify-between mt-5">
          <span onClick={()=>setShowmodal(true)} className='cursor-pointer'>Delete Account</span>
          <span onClick={handlesignout} className='cursor-pointer'>Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}
      <Modal
        show={showmodal}
        onClose={() => setShowmodal(false)}
        popup
        size='md'
        >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowmodal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      </div>
    )
  }

  export default Dashprofile