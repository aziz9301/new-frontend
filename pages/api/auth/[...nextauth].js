// import NextAuth from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google'

// export default NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID,
//             clientSecret: process.env.GOOGLE_SECRET
//         }),
//     ]
// })


// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { MongoClient } from 'mongodb';
// import bcrypt from 'bcryptjs';
// import clientPromise from '../../../lib/mongodb';

// export default NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID,
//             clientSecret: process.env.GOOGLE_SECRET
//         }),
//         CredentialsProvider({
//             name: 'Credentials',
//             credentials: {
//                 email: { label: "Email", type: "email" },
//                 password: { label: "Password", type: "password" }
//             },
//             async authorize(credentials) {
//                 const client = await clientPromise;
//                 const db = client.db();
//                 const user = await db.collection('users').findOne({ email: credentials.email });

//                 if (user && bcrypt.compareSync(credentials.password, user.password)) {
//                     return { id: user._id, name: user.name, email: user.email };
//                 } else {
//                     throw new Error('Invalid email or password');
//                 }
//             }
//         })
//     ],
//     pages: {
//         signIn: '/auth/signin',
//         error: '/auth/error'
//     },
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.id = user.id;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             if (token) {
//                 session.id = token.id;
//             }
//             return session;
//         }
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     database: process.env.MONGODB_URI
// });


// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import bcrypt from 'bcryptjs';
// import clientPromise from '../../../lib/mongodb';

// export default NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         }),
//         CredentialsProvider({
//             name: 'Credentials',
//             credentials: {
//                 email: { label: "Email", type: "email" },
//                 password: { label: "Password", type: "password" }
//             },
//             async authorize(credentials) {
//                 const client = await clientPromise;
//                 const db = client.db();
//                 const user = await db.collection('users').findOne({ email: credentials.email });

//                 if (user && bcrypt.compareSync(credentials.password, user.password)) {
//                     return { id: user._id, name: user.name, email: user.email };
//                 } else {
//                     throw new Error('Invalid email or password');
//                 }
//             }
//         })
//     ],
//     pages: {
//         signIn: '/auth/signin',
//         error: '/auth/error',
//     },
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.id = user.id;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             if (token) {
//                 session.id = token.id;
//             }
//             return session;
//         }
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     session: {
//         jwt: true,
//     },
//     debug: process.env.NODE_ENV === 'development',
// });





// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import bcrypt from 'bcryptjs';
// import clientPromise from '../../../lib/mongodb';

// export default NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         }),
//         CredentialsProvider({
//             name: 'Credentials',
//             credentials: {
//                 email: { label: "Email", type: "email" },
//                 password: { label: "Password", type: "password" }
//             },
//             async authorize(credentials) {
//                 const client = await clientPromise;
//                 const db = client.db();
//                 const user = await db.collection('users').findOne({ email: credentials.email });

//                 if (user && bcrypt.compareSync(credentials.password, user.password)) {
//                     return { id: user._id, name: user.name, email: user.email };
//                 } else {
//                     throw new Error('Invalid email or password');
//                 }
//             }
//         })
//     ],
//     pages: {
//         signIn: '/auth/signin',
//         error: '/auth/error',
//     },
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.id = user.id;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             if (token) {
//                 session.user.id = token.id;
//             }
//             return session;
//         }
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     session: {
//         jwt: true,
//     },
//     debug: process.env.NODE_ENV === 'development',
// });

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import clientPromise from '../../../lib/mongodb';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const client = await clientPromise;
                const db = client.db();
                const user = await db.collection('users').findOne({ email: credentials.email });

                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    return { id: user._id, name: user.name, email: user.email };
                } else {
                    throw new Error('Invalid email or password');
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        jwt: true,
    },
    debug: process.env.NODE_ENV === 'development',
});
