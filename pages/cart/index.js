import Success from "@/components/Success";
import { CartContext } from "@/lib/CartContext";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function Cart() {
    const { cartProducts, removeProduct, addProduct, clearCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const { data: session } = useSession();
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids: cartProducts }).then(response => {
                setProducts(response.data);
            });
        } else {
            setProducts([]);
        }
    }, [cartProducts]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        if (window.location.href.includes('success')) {
            setIsSuccess(true);
            clearCart();
        }
    }, [clearCart]);

    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }

    async function midtransCheckout() {
        try {
            const response = await axios.post('/api/checkout', {
                email: session.user.email,
                name,
                address,
                state,
                zip,
                city,
                cartProducts
            });

            if (response.data.redirect_url) {

                clearCart();
                window.location = response.data.redirect_url;
            } else {
                toast.error('An error occurred');
            }
        } catch (error) {
            toast.error('An error occurred');
        }
    }

    if (isSuccess) {
        return <Success />;
    }

    function increaseProduct(id, stock) {
        if (cartProducts.filter(productId => productId === id).length < stock) {
            addProduct(id);
        } else {
            toast.error('Produk Mau Habis');
        }
    }
    

    function decreaseProduct(id) {
        removeProduct(id);
        toast.success('Removed product!!');
    }

    function deleteCart() {
        clearCart();
        toast.success('Cart cleared!!');
    }

    if (session) {
        return (
            <section className="flex justify-between max-md:flex-col space-x-4">
                <div className="md:w-2/3 px-4">
                    <div className="mt-16 md:mt-6">
                        <header className="text-center flex justify-between w-full">
                            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
                        </header>
                        {!products.length ? (
                            <p className="my-6 text-center">Your cart is empty</p>
                        ) : (
                            <>
                                {products.map(product => (
                                    <div key={product._id} className="mt-8">
                                        <ul className="space-y-4">
                                            <li className="flex items-center gap-4 justify-between">
                                                <img                                     

                                                    src={product.images[0]}
                                                    alt=""
                                                    className="h-16 w-16 rounded object-cover"
                                                />
                                                <div>
                                                    <h3 className="text-md text-text max-w-md">{product.title}</h3>
                                                    <dl className="mt-0.5 space-y-px text-[10px] text-text">
                                                        <p>Rp. {formatPrice(cartProducts.filter(id => id === product._id).length * product.price)}</p>
                                                        <p>Stok Product :{product.stock}</p>
                                                        {product.stock <= 2 && (
                                                            <p className="text-red-500">Produk Mau Habis</p>
                                                        )}
                                                    </dl>
                                                </div>
                                                <div>
                                                    <label htmlFor="Quantity" className="sr-only">Quantity</label>
                                                    <div className="flex items-center gap-1">

                                                        <button
                                                            type="button"
                                                            className="w-10 h-10 leading-10 text-text transition hover:opacity-75 border"
                                                            onClick={() => decreaseProduct(product._id)}
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="number"
                                                            id="Quantity"
                                                            value={cartProducts.filter(id => id === product._id).length}
                                                            className="h-10 w-16 rounded border border-secondary text-primary font-bold text-center [-moz-appearance:_textfield] sm:text-md [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                                            readOnly // Add readOnly attribute to disable manual input
                                                        />

                                                        <button
                                                            type="button"
                                                            className={`w-10 h-10 leading-10 text-text transition hover:opacity-75 border ${cartProducts.filter(id => id === product._id).length === product.stock ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                            onClick={() => increaseProduct(product._id, product.stock)}
                                                            disabled={cartProducts.filter(id => id === product._id).length === product.stock}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                ))}
                                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                                    <div className="max-w-md space-y-4">
                                        <dl className="space-y-0.5 text-md text-gray-700">
                                            <div className="flex justify-end text-red-400 border-b mb-3">
                                                <button onClick={deleteCart}>Clear Cart</button>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt>Subtotal</dt>
                                                <dd>Rp. {formatPrice(total)}</dd>
                                            </div>
                                            <div className="flex justify-between !text-base font-medium">
                                                <dt>Total</dt>
                                                <dd>Rp. {formatPrice(total)}</dd>
                                            </div>
                                        </dl>
                                        <div className="flex justify-end">
                                            <Link
                                                className="group flex items-center justify-between gap-4 rounded-lg border border-current px-4 py-2 text-orange-600 transition-colors hover:bg-orange-600 focus:outline-none focus:ring active:bg-orange-500"
                                                href="/products"
                                            >
                                                <span className="font-medium transition-colors group-hover:text-white">
                                                    Continue shopping
                                                </span>
                                                <span className="shrink-0 rounded-full border border-orange-600 bg-white p-2 group-active:border-orange-500">
                                                    <svg
                                                        className="h-4 w-4 rtl:rotate-180"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                        />
                                                    </svg>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                {products.length > 0 && (
                    <div className="md:1/3 mt-16 md:mt-6">
                        <header className="text-start flex flex-col w-full">
                            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Shipping details</h1>
                            <p className="mt-2 text-text text-lg">We use your account details for shipping.</p>
                        </header>
                        <div className="mx-auto max-w-xl p-4 border shadow-xl h-[400px] my-3">
                            <div className="space-y-5">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-6">
                                        <label className="mb-1 block text-sm font-medium text-text">Email</label>
                                        <input type="email" name="email" className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" value={session.user.email} disabled placeholder='Email' />
                                    </div>
                                    <div className="col-span-6">
                                        <label className="mb-1 block text-sm font-medium text-text">Full Name</label>
                                        <input type="text" name="name" className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" value={name} onChange={ev => setName(ev.target.value)} required/>
                                    </div>
                                    <div className="col-span-12">
                                        <label className="mb-1 block text-sm font-medium text-text">Address</label>
                                        <input type="text" name="address" className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50" placeholder="1864 Main Street" value={address} onChange={ev => setAddress(ev.target.value)} required />
                                    </div>
                                    <div className="col-span-6">
                                        <label className="mb-1 block text-sm font-medium text-text">City</label>
                                        <input type="text" name="city" className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50" placeholder="" value={city} onChange={ev => setCity(ev.target.value)} required />
                                    </div>
                                    <div className="col-span-4">
                                        <label className="mb-1 block text-sm font-medium text-text">State</label>
                                        <input type="text" name="state" className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50" placeholder="" value={state} onChange={ev => setState(ev.target.value)} required />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="mb-1 block text-sm font-medium text-text">Zip</label>
                                        <input type="text" name="zip" className="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50" placeholder="" value={zip} onChange={ev => setZip(ev.target.value)} required />
                                    </div>
                                    <div className="col-span-12 text-center w-full">
                                        <button onClick={midtransCheckout} className="block rounded bg-secondary px-5 py-3 text-md text-text transition hover:bg-purple-300 w-full">
                                            Checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        );
    }
    return (
        <div className="grid h-screen px-4 bg-white place-content-center">
            <div className="text-center">
                <p className="mt-4 text-text text-2xl">You should sign Up to view cart Items</p>
                <button onClick={() => signIn('google')} className="inline-block px-5 py-3 mt-6 text-sm font-medium text-text bg-primary rounded hover:bg-primary focus:outline-none focus:ring">
                    Login / Register
                </button>
            </div>
        </div>
    );
}

