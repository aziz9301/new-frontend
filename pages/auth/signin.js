// // pages/auth/signin.js
// import { signIn, useSession } from 'next-auth/react';
// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';

// export default function SignIn() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const { data: session, status } = useSession();
//     const router = useRouter();

//     // Redirect to home page if already authenticated
//     if (status === 'authenticated' && session) {
//         router.replace('/');
//         return null; // Prevent rendering anything if redirecting
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const res = await signIn('credentials', {
//             redirect: false,
//             email,
//             password
//         });
//         if (res.error) {
//             setError(res.error);
//         } else {
//             // Redirect to home page after successful login
//             router.replace('/');
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto p-4 border rounded shadow-lg mt-20">
//             <h1 className="text-2xl font-bold text-center mb-10 mt-10">Login</h1>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                     required
//                     className="w-full p-2 border rounded"
//                 />
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                     required
//                     className="w-full p-2 border rounded"
//                 />
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//                 >
//                     Sign In
//                 </button>
//             </form>
//             {error && <p className="text-red-500">{error}</p>}
//             <p className="text-center">
//                 Don't have an account?{' '}
//                 <Link href="/auth/signup" className="text-blue-500">
//                     Sign up here
//                 </Link>
//             </p>
//         </div>
//     );
// }


import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    // Redirect to home page if already authenticated
    if (router.isFallback || router.query.error) {
        // Handle potential errors during sign in, if any
        setError(router.query.error);
    }

    const handleGoogleSignIn = async () => {
        try {
            const result = await signIn('google', {
                redirect: false, // Prevent automatic redirection
            });
            if (result.error) {
                setError(result.error);
            } else {
                // Handle successful Google sign in (e.g., redirect to profile)
                router.replace('/profile');
            }
        } catch (error) {
            console.error('Error signing in with Google:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signIn('credentials', {
            redirect: false,
            email,
            password
        });
        if (res.error) {
            setError(res.error);
        } else {
            // Redirect to home page after successful login
            router.replace('/');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded shadow-lg mt-20">
            <h1 className="text-2xl font-bold text-center mb-10 mt-10">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Sign In
                </button>
            </form>
            <form onSubmit={handleSubmit} className="space-y-4">
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="inline-flex items-center w-full py-2 mt-3 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

                >

                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>

                    <span className="flex-grow text-center">Sign in with Google</span>
                </button>
            </form>
            {/* ... (rest of the form and error handling remain the same) */}
            {error && <p className="text-red-500">{error}</p>}
            <p className="text-center">
                Don&apos;t have an account?{''}
                <Link href="/auth/signup" className="text-blue-500">
                    Sign up here
                </Link>
            </p>
        </div>
    );
}
