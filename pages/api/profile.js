// pages/api/profile.js

import { getSession } from 'next-auth/react';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import clientPromise from '@/lib/mongodb';


export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db();
      const user = await db.collection('users').findOne({ email: session.user.email });
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    const form = new formidable.IncomingForm({
      uploadDir: path.join(process.cwd(), 'public/uploads'),
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: 'Form parse error' });
      }

      const { name, address, phone } = fields;
      const photo = files.photo ? `/uploads/${path.basename(files.photo.path)}` : null;

      try {
        const client = await clientPromise;
        const db = client.db();
        const updateData = { name, address, phone };
        if (photo) {
          updateData.photo = photo;
        }

        await db.collection('users').updateOne(
          { email: session.user.email },
          { $set: updateData }
        );

        return res.status(200).json({ message: 'Profile updated successfully' });
      } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    });
  }
}
