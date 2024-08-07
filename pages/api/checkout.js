import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
// const stripe = require('stripe')(process.env.STRIPE_KEY);
const midtransClient = require('midtrans-client');

const midtrans = new midtransClient.Snap({
    isProduction: false, // Set to true for production
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.NEXT_PUBLIC_CLIENT,
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.json('Should be a post request');
        return;
    }


// batas

// const { email, name, address, city, state, zip, cartProducts } = req.body;

// await mongooseConnect();

// const productIds = cartProducts;
// const uniqueIds = [... new Set(productIds)];
// const productsInfo = await Product.find({ _id: uniqueIds });

// let line_items = [];

// for (const productId of uniqueIds) {
//     const productInfo = productsInfo.find(p => p._id.toString() === productId);

//     const quantity = productIds.filter(id => id === productId)?.length || 0;

//     if (quantity > 0 && productInfo) {
//         line_items.push(
//             {
//                 quantity,
//                 price_data: {
//                     currency: 'IDR',
//                     product_data: { name: productInfo.title },
//                     unit_amount: quantity * productInfo.price * 100,
//                 },

//             }
//         )
//     }
// }

// const orderDoc = await Order.create({
//     line_items, email, name, address, city, state, zip, paid: false
// })

// const session = await stripe.checkout.sessions.create({
//     line_items,
//     mode: 'payment',
//     customer_email: email,
//     success_url: process.env.SUCCESS_URL + '/cart?success=1',
//     cancel_url: process.env.SUCCESS_URL + '/cart?canceled=1',
//     metadata: { orderId: orderDoc._id.toString(), test: 'ok' }
// })

// res.json({
//     url: session.url,
// })

// File path: /pages/api/checkout.js



// batas

    const { email, name, address, city, state, zip, cartProducts } = req.body;

    if (!email || !name || !address || !city || !state || !zip || !cartProducts) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
    }

    try {
        await mongooseConnect();

        const productIds = cartProducts;
        const uniqueIds = [...new Set(productIds)];
        const productsInfo = await Product.find({ _id: { $in: uniqueIds } });

        let line_items = [];

        for (const productId of uniqueIds) {
            const productInfo = productsInfo.find(p => p._id.toString() === productId);
            const quantity = productIds.filter(id => id === productId)?.length || 0;

            if (quantity > 0 && productInfo) {
                line_items.push({
                    quantity,
                    price: productInfo.price * 100, // Price in smallest currency unit
                    product_data: { name: productInfo.title },
                });
            }
        }

        const orderDoc = await Order.create({
            line_items,
            email,
            name,
            address,
            city,
            state,
            zip,
            paid: false
        });

        let parameter = {
            transaction_details: {
                order_id: orderDoc._id.toString(),
                gross_amount: line_items.reduce((total, item) => total + (item.price * item.quantity / 100), 0), // Convert back to IDR
            }

        };

        const transaction = await midtrans.createTransaction(parameter);
        res.json({
            token: transaction.token,
            redirect_url: transaction.redirect_url
        });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}




//new


// import { mongooseConnect } from "@/lib/mongoose";
// import { Order } from "@/models/Order";
// import { Product } from "@/models/Product";
// import { getSession } from "next-auth/react";
// import Cart from "@/models/Cart"; // Assuming you have a Cart model
// const midtransClient = require('midtrans-client');

// const midtrans = new midtransClient.Snap({
//     isProduction: false, // Set to true for production
//     serverKey: process.env.MIDTRANS_SERVER_KEY,
//     clientKey: process.env.NEXT_PUBLIC_CLIENT,
// });

// export default async function handler(req, res) {
//     const session = await getSession({ req });

//     if (!session) {
//         return res.status(401).json({ message: 'Not authenticated' });
//     }

//     if (req.method !== 'POST') {
//         res.json('Should be a post request');
//         return;
//     }

//     const { address, city, state, zip } = req.body;
//     const { email, name, id: userId } = session.user;

//     if (!address || !city || !state || !zip) {
//         res.status(400).json({ message: 'Missing required fields' });
//         return;
//     }

//     try {
//         await mongooseConnect();

//         const userCart = await Cart.findOne({ user: userId });
//         const productIds = userCart ? userCart.products : [];
//         const uniqueIds = [...new Set(productIds)];
//         const productsInfo = await Product.find({ _id: { $in: uniqueIds } });

//         let line_items = [];

//         for (const productId of uniqueIds) {
//             const productInfo = productsInfo.find(p => p._id.toString() === productId);
//             const quantity = productIds.filter(id => id === productId)?.length || 0;

//             if (quantity > 0 && productInfo) {
//                 line_items.push({
//                     quantity,
//                     price: productInfo.price * 100, // Price in smallest currency unit
//                     product_data: { name: productInfo.title },
//                 });
//             }
//         }

//         const orderDoc = await Order.create({
//             line_items,
//             email,
//             name,
//             address,
//             city,
//             state,
//             zip,
//             userId, // Associate order with user ID
//             paid: false
//         });

//         let parameter = {
//             transaction_details: {
//                 order_id: orderDoc._id.toString(),
//                 gross_amount: line_items.reduce((total, item) => total + (item.price * item.quantity / 100), 0), // Convert back to IDR
//             }
//         };

//         const transaction = await midtrans.createTransaction(parameter);

//         // Clear the user's cart after checkout
//         await Cart.updateOne({ userId }, { $set: { products: [] } });

//         res.json({
//             token: transaction.token,
//             redirect_url: transaction.redirect_url
//         });
//     } catch (error) {
//         console.error('Error creating transaction:', error);
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// }
