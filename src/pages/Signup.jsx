import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Oauth from '../components/Oauth'

function Signup() {
  const [formdata, setFormdata] = useState({})
  const [errormessage, setErrormessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value.trim() })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrormessage(null) // Reset error message
    setLoading(true) // Set loading state

    if (!formdata.username || !formdata.email || !formdata.password) {
      setLoading(false)
      return setErrormessage('Please fill the required fields')
    }

    try {
      setLoading(true)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata)
      })
      const data = await res.json()

      if (data.success === false) {
        setLoading(false)
        return setErrormessage(data.message)
      }
      if(res.ok){
        navigate('/sign-in')
      }

      // Handle successful signup (e.g., redirect to another page)
    } catch (error) {
      setLoading(false)
      setErrormessage('we try the message as it something is same.')
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
        {/* {to left} */}
        <div className='flex-1'>
          <Link to='/' className='font-bold text-4xl dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-700 to-fuchsia-800 rounded-lg text-white'>
              Sonu's
            </span>
            Blog
          </Link>
          <p className='text-sm p-5 '>This is the Signup page</p>
        </div>
        {/* {to right} */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your username' />
              <TextInput
                type='text'
                placeholder='Enter your username'
                id='username'
                onChange={handleChange}
              />
              <Label value='Your email' />
              <TextInput
                type='text'
                placeholder='Enter your email'
                id='email'
                onChange={handleChange}
              />
              <Label value='Your password' />
              <TextInput
                type='password' // Changed to 'password' type
                placeholder='Enter your password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {loading ?(
              <>
              <Spinner size='sm'/>
              <span className='pl-3'>its loading ....</span>
              </>
              )
              : ('Signup'

              )}
            </Button>
            <Oauth/>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Do you have an account?</span>
            <Link to='/sign-in' className='text-blue-500 text-sM'>
              Signin
            </Link>
          </div>
          {errormessage && (
            <Alert className='mt-5' color='failure'>
              {errormessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}

export default Signup
