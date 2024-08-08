// pages/profile.js

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function Profile() {
    const { data: session } = useSession();
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [zip, setZip] = useState('');
    const [provinsi, setProvinsi] = useState('');
    const [state, setState] = useState('');
    // const [photo, setPhoto] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // if (!session) {
        //     router.push('/auth/signin');
        //     return;
        // }
        // Fetch the user's current profile data
        axios.get('/api/profile').then(response => {
            const userData = response.data;
            setUser(userData);
            setName(userData.name);
            setAddress(userData.address);
            setPhone(userData.phone);
            setZip(userData.zip);
            setProvinsi(userData.provinsi);
            setState(userData.state);

        });
    }, [session, router]);

    // const handlePhotoChange = (e) => {
    //     setPhoto(e.target.files[0]);
    // };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('phone', phone);
        formData.append('zip', zip);
        formData.append('provinsi', provinsi);
        formData.append('state', state);
        // if (photo) {
        //     formData.append('photo', photo);
        // }

        try {
            await axios.post('/api/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <form onSubmit={handleProfileUpdate}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Full Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Address
                    </label>
                    <input
                        id="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        id="phone"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zip">
                        Kode Pos
                    </label>
                    <input
                        id="zip"
                        type="text"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zip">
                        Provinsi
                    </label>
                    <input
                        id="provinsi"
                        type="text"
                        value={provinsi}
                        onChange={(e) => setProvinsi(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zip">
                        Negara
                    </label>
                    <input
                        id="state"
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
}


// pages/profile.js

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import toast from 'react-hot-toast';
// import { uploadFile } from '@/utils/upload';

// // Profile component definition
// export default function Profile() {
//   const { data: session } = useSession();
//   const [user, setUser] = useState(null);
//   const [name, setName] = useState('');
//   const [address, setAddress] = useState('');
//   const [phone, setPhone] = useState('');
//   const [photo, setPhoto] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (!session) {
//       router.push('/auth/signin');
//       return;
//     }
//     axios.get('/api/profile').then((response) => {
//       const userData = response.data;
//       setUser(userData);
//       setName(userData.name);
//       setAddress(userData.address);
//       setPhone(userData.phone);
//       setPhoto(userData.photo);
//     });
//   }, [session, router]);

//   const handlePhotoChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       try {
//         const photoUrl = await uploadFile(file, '/api/upload'); // Use the shared upload function
//         setPhoto(photoUrl);
//       } catch (error) {
//         toast.error(error.message);
//       }
//     }
//   };

//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();

//     const formData = {
//       name,
//       address,
//       phone,
//       photo, // Updated photo URL
//     };

//     try {
//       const response = await axios.post('/api/profile', formData);
//       setUser(response.data);
//       toast.success('Profile updated successfully');
//     } catch (error) {
//       toast.error('Failed to update profile');
//     }
//   };

//   if (!user) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Profile</h1>
//       <form onSubmit={handleProfileUpdate}>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//             Full Name
//           </label>
//           <input
//             id="name"
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
//             Address
//           </label>
//           <input
//             id="address"
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
//             Phone Number
//           </label>
//           <input
//             id="phone"
//             type="text"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
//             Profile Photo
//           </label>
//           <input
//             id="photo"
//             type="file"
//             onChange={handlePhotoChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//           {photo && (
//             <img src={photo} alt="Profile" className="mt-4 w-32 h-32 rounded-full" />
//           )}
//         </div>
//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Update Profile
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
