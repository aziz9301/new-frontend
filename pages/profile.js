// pages/profile.js

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Profile() {
    const { data: session } = useSession();
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: session.user.email,
                fullName,
                address,
                phoneNumber,
            }),
        });

        if (res.ok) {
            alert('Profile updated successfully');
            router.push('/');
        } else {
            alert('Failed to update profile');
        }
    };

    if (!session) {
        return <div>Please log in to view this page</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Save Profile
                </button>
            </form>
        </div>
    );
}
