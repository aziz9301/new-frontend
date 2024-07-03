// pages/auth/signin.js
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { data: session, status } = useSession();
    const router = useRouter();

    // Redirect to home page if already authenticated
    if (status === 'authenticated' && session) {
        router.replace('/');
        return null; // Prevent rendering anything if redirecting
    }

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
            {error && <p className="text-red-500">{error}</p>}
            <p className="text-center">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-blue-500">
                    Sign up here
                </Link>
            </p>
        </div>
    );
}
