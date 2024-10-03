import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateFailure,
  updateStart,
  updateSuccess,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  SignoutSuccess
} from '../Redux/user/userSlice';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreatePost from '../pages/CreatePost';
import { app } from '../firebase';

function Dashprofile() {
  const { currentUser, error } = useSelector((state) => state.user);
  const [formdata, setFormdata] = useState({});
  const [imagefile, setImagefile] = useState(null);
  const [imagefileUrl, setImagefileUrl] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showmodal, setShowmodal] = useState(false);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const imagePicker = useRef();
  const dispatch = useDispatch();

  const handlechange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formdata).length === 0) {
      setUpdateUserError('No changes to update');
      return;
    }

    try {
      dispatch(updateStart());

      const res = await axios.put(`/api/user/updates/${currentUser._id}`, formdata);
      const data = res.data;

      if (res.status !== 200) {
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
  };

  const handleDeleteUser = async () => {
    setShowmodal(false);
    try {
      dispatch(deleteUserStart());

      const res = await axios.delete(`/api/user/delete/${currentUser ? currentUser._id : 'data._id'}`);
      const data = res.data;

      if (res.status !== 200) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

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

  const handleImagechange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagefile(file);
      setImagefileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imagefile) {
      uploadfile();
    }
  }, [imagefile]);

  const uploadfile = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imagefile.name;
    const storageref = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageref, imagefile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError('Could not upload image (File must be less than 2MB)');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImagefileUrl(downloadURL);
          setFormdata({ ...formdata, profilePicture: downloadURL });
        });
      }
    );
  };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>

      <form className='flex flex-col' onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          onChange={handleImagechange}
          ref={imagePicker}
          hidden
        />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden mb-2 rounded-full'
          onClick={() => imagePicker.current.click()}
        >
          <img
            src={imagefileUrl || (currentUser ? currentUser.profilePicture : '/default-image.png')}
            alt='user'
            className='rounded-full w-full h-full object-cover border-4 border-[lightgray]'
          />
        </div>
        {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}

        <TextInput
          className='py-1'
          type='text'
          placeholder='username'
          id='username'
          defaultValue={currentUser ? currentUser.username : ''}
          onChange={handlechange}
        />
        <TextInput
          className='py-1'
          type='text'
          placeholder='email'
          id='email'
          defaultValue={currentUser ? currentUser.email : ''}
          onChange={handlechange}
        />
        <TextInput className='py-1' type='password' placeholder='*********' id='password' onChange={handlechange} />
        <br />
        <Button className='mt-2' type='submit' gradientDuoTone='purpleToBlue'>
          Update
        </Button>

        <Link to={'/create-post'}>
          <Button type='button' gradientDuoTone='purpleToPink' className='w-full mt-2'>
            Create a post
          </Button>
        </Link>
      </form>
      <div className='text-blue-600 flex justify-between mt-5'>
        <span onClick={() => setShowmodal(true)} className='cursor-pointer'>
          Delete Account
        </span>
        <span onClick={handlesignout} className='cursor-pointer'>
          Sign Out
        </span>
      </div>
      {updateUserSuccess && <Alert color='success' className='mt-5'>{updateUserSuccess}</Alert>}
      {updateUserError && <Alert color='failure' className='mt-5'>{updateUserError}</Alert>}
      {error && <Alert color='failure' className='mt-5'>{error}</Alert>}
      <Modal show={showmodal} onClose={() => setShowmodal(false)} popup size='md'>
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
  );
}

export default Dashprofile;
