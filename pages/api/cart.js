import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
    await mongooseConnect();
    const ids = req.body.ids;

    try {
        const products = await Product.find({ _id: { $in: ids } });
        res.json(products);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


// import { getSession } from "next-auth/react";
// import { mongooseConnect } from "@/lib/mongoose";
// import { Product } from "@/models/Product";
// import Cart from "@/models/Cart";

// export default async function handle(req, res) {
//     await mongooseConnect();
//     const session = await getSession({ req });

//     if (!session) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     const userEmail = session.user.email;
//     const { method } = req;

//     switch (method) {
//         case 'POST':
//             const { ids } = req.body;
//             try {
//                 const cart = await Cart.findOneAndUpdate(
//                     { user: userEmail },
//                     { products: ids },
//                     { new: true, upsert: true }
//                 );
//                 const products = await Product.find({ _id: { $in: cart.products } });
//                 res.json(products);
//             } catch (error) {
//                 console.error("Error:", error);
//                 res.status(500).json({ error: "Internal Server Error" });
//             }
//             break;
//         case 'GET':
//             try {
//                 const cart = await Cart.findOne({ user: userEmail });
//                 const productIds = cart ? cart.products : [];
//                 const products = await Product.find({ _id: { $in: productIds } });
//                 res.json(products);
//             } catch (error) {
//                 console.error("Error:", error);
//                 res.status(500).json({ error: "Internal Server Error" });
//             }
//             break;
//         default:
//             res.setHeader('Allow', ['GET', 'POST']);
//             res.status(405).end(`Method ${method} Not Allowed`);
//     }
// }
