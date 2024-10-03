// // import React from 'react';
// import { Button } from 'flowbite-react';
// import { AiFillGoogleCircle } from 'react-icons/ai';
// import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
// import { app } from '../firebase';
// import { useDispatch } from 'react-redux';
// import { Signinsuccess } from '../Redux/user/userSlice.js'; // Ensure this matches your actual action
// import { useNavigate } from 'react-router-dom';

// function Oauth() {
//   const auth = getAuth(app);
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Use useNavigate hook for navigation

//   const handleGoogleClick = async () => {
//     const provider = new GoogleAuthProvider();
//     provider.setCustomParameters({ prompt: 'select_account' });

//     try {
//       const resultsFromGoogle = await signInWithPopup(auth, provider);
//       const res = await fetch('/api/auth/google', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name: resultsFromGoogle.user.displayName,
//           email: resultsFromGoogle.user.email,
//           googlePhotoUrl: resultsFromGoogle.user.photoURL,
//         }),
//       });

//       const text = await res.text();
//       console.log('Response text:', text);

//       const contentType = res.headers.get('content-type');
//       if (!contentType || !contentType.includes('application/json')) {
//         throw new Error('Response is not JSON');
//       }

//       const data = JSON.parse(text);
//       if (res.ok) {
//         dispatch(Signinsuccess(data));
//         navigate('/'); // Use navigate function for redirection
//       } else {
//         console.log('Server error:', data);
//       }
//     } catch (error) {
//       console.log('Error during Google sign-in:', error);
//     }
//   };

//   return (
//     <Button type='button' gradientDuoTone='tealToLime' outline onClick={handleGoogleClick}>
//       <AiFillGoogleCircle className='w-4 h-6 mr-2' />
//       Continue with Google
//     </Button>
//   );
// }

// export default Oauth;
