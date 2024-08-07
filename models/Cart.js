import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true,
    },
    products: {
        type: [String],
        required: true,
    },
});

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);



