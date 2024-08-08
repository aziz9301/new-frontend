// // pages/auth/signup.js
// import { useState } from 'react';
// import { useRouter } from 'next/router';

// export default function SignUp() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const router = useRouter();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');

//         const res = await fetch('/api/auth/signup', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ name, email, password })
//         });

//         const data = await res.json();

//         if (res.ok) {
//             router.push('/auth/signin');
//         } else {
//             setError(data.message);
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
//                 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
//                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
//                 <button type="submit">Sign Up</button>
//             </form>
//             {error && <p>{error}</p>}
//         </div>
//     );
// }


// pages/auth/signup.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        if (res.ok) {
            router.push('/auth/signin');
        } else {
            setError(data.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded shadow-lg mt-20">
            <h1 className="text-2xl font-bold text-center mb-10">Daftar Sekarang</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full p-2 border rounded"
                />
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="w-full p-2 border rounded"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />} { }
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Sign Up
                </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}
