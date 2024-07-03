// import { CartContext } from "@/lib/CartContext";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { Router, useRouter } from "next/router";
// import { useContext } from "react";

// export default function Settings() {
//     const router = useRouter();
//     const { pathname } = router;

//     const { cartProducts } = useContext(CartContext);

//     const active = 'p-2 text-primary bg-secondary rounded-lg'
//     const inActive = 'p-2'

//     const { data: session } = useSession()
//     return <>
//         <header className="bg-white sticky top-0 z-40 w-full px-2 md:px-4">
//             <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ">

//                 <nav className="flex items-center justify-between h-16 lg:h-20">
//                     <div className="hidden lg:flex lg:items-right lg:ml-1 lg:space-x-10">
//                         <Link className="flex gap-1 items-center text-text font-medium text-lg hover:text-primary " href="/">

//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//                                 <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
//                             </svg>
//                             <span> / MyShop</span>

//                         </Link>

//                         <Link className={`text-accent transition hover:text-accent/75 ${pathname === '/' ? 'text-primary' : ""} `} href="/"> Home </Link>

//                         <Link className={`text-accent transition hover:text-accent/75 ${pathname === '/products' ? 'text-primary' : ""} `} href="/products"> All Product </Link>
//                     </div>

//                     <div className="sm:flex sm:gap-2 ">
//                         {session ? (
//                             <div className="sm:flex sm:gap-2 border-r border-primary pr-4">
//                                 <div className="h-9 w-9">
//                                     <img className="h-full w-full rounded-full object-cover object-center" src={session.user.image} alt={session.user.email} />
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="sm:flex sm:gap-2 border-r border-primary pr-4">
//                                 <Link
//                                     className=" text-md font-medium text-text hidden md:flex"
//                                     href="/"
//                                 >
//                                     Login
//                                 </Link>
//                                 <Link
//                                     className=" text-md font-medium text-text hidden max-md:flex md:hidden"
//                                     href="/"
//                                 >
//                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//                                         <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
//                                     </svg>

//                                 </Link>
//                             </div>
//                         )}

//                         <Link
//                             className="group rounded-md font-medium text-md flex item-center transition p-2"
//                             href="/cart"
//                         >
//                             <svg fill="none" height="15" viewBox="0 0 15 15" width="15" xmlns="http://www.w3.org/2000/svg"><path d="M0.978822 0.356323L0.0209961 0.643671L3.12789 11H14.9999V4.5C14.9999 3.11929 13.8806 2 12.4999 2H1.47192L0.978822 0.356323Z" fill="black" /><path clip-rule="evenodd" d="M5.5 12C4.67157 12 4 12.6716 4 13.5C4 14.3284 4.67157 15 5.5 15C6.32843 15 7 14.3284 7 13.5C7 12.6716 6.32843 12 5.5 12ZM5 13.5C5 13.2239 5.22386 13 5.5 13C5.77614 13 6 13.2239 6 13.5C6 13.7761 5.77614 14 5.5 14C5.22386 14 5 13.7761 5 13.5Z" fill="black" fill-rule="evenodd" /><path clip-rule="evenodd" d="M12.5 12C11.6716 12 11 12.6716 11 13.5C11 14.3284 11.6716 15 12.5 15C13.3284 15 14 14.3284 14 13.5C14 12.6716 13.3284 12 12.5 12ZM12 13.5C12 13.2239 12.2239 13 12.5 13C12.7761 13 13 13.2239 13 13.5C13 13.7761 12.7761 14 12.5 14C12.2239 14 12 13.7761 12 13.5Z" fill="black" fill-rule="evenodd" />
//                             </svg>
//                             <span className="ml-2 text-primary font-bold group-hover:text-text">
//                                 {cartProducts.length}
//                             </span>

//                         </Link>
//                     </div>
//                 </nav>

//                 <nav className="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
//                     <div className="flow-root">
//                         <div className="flex flex-col px-6 -my-2 space-y-1">
//                             <a href="#" title="" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Features </a>

//                             <a href="#" title="" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Solutions </a>

//                             <a href="#" title="" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Resources </a>

//                             <a href="#" title="" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Pricing </a>
//                         </div>
//                     </div>

//                     <div className="px-6 mt-6">
//                         <Link
//                             className=" text-md font-medium text-text hidden md:flex"
//                             href="/"
//                         >
//                             Login
//                         </Link>
//                         <Link
//                             className=" text-md font-medium text-text hidden max-md:flex md:hidden"
//                             href="/"
//                         >
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//                                 <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
//                             </svg>

//                         </Link>
//                     </div>
//                 </nav>
//             </div>
//         </header>

//     </>
// }


import { CartContext } from "@/lib/CartContext";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function Settings() {
    const router = useRouter();
    const { pathname } = router;

    const { cartProducts } = useContext(CartContext);

    const active = 'p-2 text-primary bg-secondary rounded-lg';
    const inActive = 'p-2';

    const { data: session } = useSession();

    return (
        <>
            <header className="bg-white sticky top-0 z-40 w-full px-2 md:px-4">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-between h-16 lg:h-20">
                        <div className="hidden lg:flex lg:items-right lg:ml-1 lg:space-x-10">
                            <Link className="flex gap-1 items-center text-text font-medium text-lg hover:text-primary" href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                                </svg>
                                <span> / MyShop</span>
                            </Link>

                            <Link className={`text-accent transition hover:text-accent/75 ${pathname === '/' ? 'text-primary' : ""}`} href="/">Home</Link>

                            <Link className={`text-accent transition hover:text-accent/75 ${pathname === '/products' ? 'text-primary' : ""}`} href="/products">All Product</Link>
                        </div>

                        <div className="sm:flex sm:gap-2">
                            {session ? (
                                <div className="sm:flex sm:gap-2 border-r border-primary pr-4">
                                    <div className="h-9 w-9 cursor-pointer" onClick={() => router.push('/profile')}>
                                        <img className="h-full w-full rounded-full object-cover object-center" src={session.user.image} alt={session.user.email} />
                                    </div>
                                    <button
                                        className="text-md font-medium text-text hidden md:flex mt-2"
                                        onClick={() => signOut()}
                                    >
                                        Logout
                                    </button>
                                    <button
                                        className="text-md font-medium text-text hidden max-md:flex md:hidden"
                                        onClick={() => signOut()}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <div className="sm:flex sm:gap-2 border-r border-primary pr-4">
                                    <button
                                        className="text-md font-medium text-text hidden md:flex"
                                        onClick={() => router.push('/auth/signin')}
                                    >
                                        Login
                                    </button>
                                    <button
                                        className="text-md font-medium text-text hidden max-md:flex md:hidden"
                                        onClick={() => router.push('/auth/signin')}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </button>
                                </div>
                            )}

                            <Link className="group rounded-md font-medium text-md flex item-center transition p-2" href="/cart">
                                <svg fill="none" height="15" viewBox="0 0 15 15" width="15" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.978822 0.356323L0.0209961 0.643671L3.12789 11H14.9999V4.5C14.9999 3.11929 13.8806 2 12.4999 2H1.47192L0.978822 0.356323Z" fill="black" />
                                    <path clipRule="evenodd" d="M5.5 12C4.67157 12 4 12.6716 4 13.5C4 14.3284 4.67157 15 5.5 15C6.32843 15 7 14.3284 7 13.5C7 12.6716 6.32843 12 5.5 12ZM5 13.5C5 13.2239 5.22386 13 5.5 13C5.77614 13 6 13.2239 6 13.5C6 13.7761 5.77614 14 5.5 14C5.22386 14 5 13.7761 5 13.5Z" fill="black" fillRule="evenodd" />
                                    <path clipRule="evenodd" d="M12.5 12C11.6716 12 11 12.6716 11 13.5C11 14.3284 11.6716 15 12.5 15C13.3284 15 14 14.3284 14 13.5C14 12.6716 13.3284 12 12.5 12ZM12 13.5C12 13.2239 12.2239 13 12.5 13C12.7761 13 13 13.2239 13 13.5C13 13.7761 12.7761 14 12.5 14C12.2239 14 12 13.7761 12 13.5Z" fill="black" fillRule="evenodd" />
                                </svg>
                                <span className="ml-2 text-primary font-bold group-hover:text-text">{cartProducts.length}</span>
                            </Link>
                        </div>
                    </nav>

                    <nav className="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
                        <div className="flow-root">
                            <div className="flex flex-col px-6 -my-2 space-y-1">
                                <a href="#" title="" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">Features</a>
                                <a href="#" title="" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">Solutions</a>
                                <a href="#" title="" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">Resources</a>
                                <a href="#" title="" className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">Pricing</a>
                            </div>
                        </div>

                        <div className="px-6 mt-6">
                            <button className="text-md font-medium text-text hidden md:flex" onClick={() => router.push('/auth/signin')}>
                                Login
                            </button>
                            <button className="text-md font-medium text-text hidden max-md:flex md:hidden" onClick={() => router.push('/auth/signin')}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
}
