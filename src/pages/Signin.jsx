import React, { useState } from 'react';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Signinstart, Signinsuccess, Signinfailure } from '../Redux/user/userSlice';
// import Oauth from '../components/Oauth';

function Signin() {
    const [formdata, setFormdata] = useState({});
    const[loading,setLoading] = useState(false)
    const {  error: errorMessage } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormdata({ ...formdata, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formdata.email || !formdata.password) {
            return dispatch(Signinfailure('Please fill the required fields'));
        }

        try {
            setLoading(true)
            dispatch(Signinstart());
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formdata)
            });
            const data = await res.json();
console.log(data,"sdadsadf");
            if (data.success === false) {
                dispatch(Signinfailure(data.message));
                setLoading(false)
                
            } else if (res.ok) {
                // console.log({...data},"sdsd");
                
                dispatch(Signinsuccess(data.data));
                setLoading(false)
                navigate('/');
            }
        } catch (error) {
            setLoading(false)
            dispatch(Signinfailure(error.message || 'An error occurred during signin'));
        }
    };

    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
                <div className='flex-1'>
                    <Link to='/' className='font-bold text-4xl dark:text-white'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-700 to-fuchsia-800 rounded-lg text-white'>
                            Sonu's
                        </span>
                        Blog
                    </Link>
                    <p className='text-sm p-5'>This is the Signin page</p>
                </div>
                <div className='flex-1'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <Label value='Your email' />
                            <TextInput
                                type='text'
                                placeholder='Enter your email'
                                id='email'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value='Your password' />
                            <TextInput
                                type='password'
                                placeholder='Enter your password'
                                id='password'
                                onChange={handleChange}
                            />
                        </div>
                        <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner size='sm' />
                                    <span className='pl-3'>Loading...</span>
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                        {/* <Oauth /> */}
                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Do you need an account?</span>
                        <Link to='/sign-up' className='text-blue-500 text-sm'>
                            Signup
                        </Link>
                    </div>
                    {errorMessage && (
                        <Alert className='mt-5' color='failure'>
                            {errorMessage}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Signin;
