// pages/api/profile.js

import { getSession } from "next-auth/react";
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    if (req.method === 'POST') {
        const { email, fullName, address, phoneNumber } = req.body;

        const client = await clientPromise;
        const db = client.db();

        await db.collection('users').updateOne(
            { email },
            { $set: { fullName, address, phoneNumber } },
            { upsert: true }
        );

        return res.status(200).json({ message: "Profile updated" });
    }

    return res.status(405).json({ message: "Method not allowed" });
}
