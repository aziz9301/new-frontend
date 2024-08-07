// // pages/api/profile.js

// import { getSession } from 'next-auth/react';
// import formidable from 'formidable';
// import fs from 'fs';
// import path from 'path';
// import clientPromise from '@/lib/mongodb';


// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   const session = await getSession({ req });
//   if (!session) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   if (req.method === 'GET') {
//     try {
//       const client = await clientPromise;
//       const db = client.db();
//       const user = await db.collection('users').findOne({ email: session.user.email });
//       return res.status(200).json(user);
//     } catch (err) {
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   }

//   if (req.method === 'POST') {
//     const form = new formidable.IncomingForm({
//       uploadDir: path.join(process.cwd(), 'public/uploads'),
//       keepExtensions: true,
//     });

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         return res.status(500).json({ message: 'Form parse error' });
//       }

//       const { name, address, phone } = fields;
//       const photo = files.photo ? `/uploads/${path.basename(files.photo.path)}` : null;

//       try {
//         const client = await clientPromise;
//         const db = client.db();
//         const updateData = { name, address, phone, photo };
//         // if (photo) {
//         //   updateData.photo = photo;
//         // }

//         await db.collection('users').updateOne(
//           { email: session.user.email },
//           { $set: updateData }
//         );

//         return res.status(200).json({ message: 'Profile updated successfully' });
//       } catch (err) {
//         return res.status(500).json({ message: 'Internal server error' });
//       }
//     });
//   }
// }

import { getSession } from 'next-auth/react';
import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';
import clientPromise from '@/lib/mongodb';
import cloudinary from 'cloudinary';

// Disable bodyParser to handle files directly
export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public/uploads');
const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

// Configure Cloudinary
cloudinary.v2.config(cloudinaryConfig);

// Function to parse the form and handle files
const parseForm = (req) =>
  new Promise((resolve, reject) => {
    const form = formidable({
      uploadDir,
      keepExtensions: true,
      filter: ({ mimetype }) => mimetype && mimetype.startsWith('image/'), // Ensure only images are processed
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

// Function to save the file to Cloudinary
const saveFile = async (file) => {
  const data = await fs.readFile(file.filepath);
  const uploadResponse = await cloudinary.v2.uploader.upload(file.filepath, {
    resource_type: 'image', // Specify image type
  });

  await fs.unlink(file.filepath); // Remove the file from local storage
  return uploadResponse.secure_url; // Return secure URL
};

// Main handler function for API requests
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
    try {
      const { fields, files } = await parseForm(req);
      const { name, address, phone, zip, provinsi, state } = fields;
      let photoUrl;
      // if (files.photo) {
      //   photoUrl = await saveFile(files.photo); // Save the image and get the URL
      // }

      const client = await clientPromise;
      const db = client.db();
      const updateData = { name, address, phone, zip, provinsi, state };
      // if (photoUrl) {
      //   updateData.photo = photoUrl; // Add the photo URL to the update data
      // }

      await db.collection('users').updateOne(
        { email: session.user.email },
        { $set: updateData }
      );

      const updatedUser = await db.collection('users').findOne({ email: session.user.email });
      return res.status(200).json(updatedUser); // Return updated user data
    } catch (err) {
      console.error('Error processing form:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
