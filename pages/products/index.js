
// import Spinner from "@/components/Spinner";
// import { CartContext } from "@/lib/CartContext";
// import { mongooseConnect } from "@/lib/mongoose";
// import { Product } from "@/models/Product";
// import Link from "next/link";
// import { useContext, useEffect, useState } from "react";
// import { useSession, signIn } from "next-auth/react";
// import toast from "react-hot-toast";

// // Utility function to format price with a comma for thousands
// const formatPrice = (price) => {
//   return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };

// export default function Products({ allProducts }) {
//   const { addProduct } = useContext(CartContext);
//   const { data: session } = useSession();

//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState(allProducts);

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//   }, []);

//   const filterProducts = () => {
//     if (searchQuery === "") {
//       setFilteredProducts(allProducts);
//     } else {
//       const lowerCaseQuery = searchQuery.toLowerCase();
//       const filtered = allProducts.filter((product) =>
//         product.title.toLowerCase().includes(lowerCaseQuery)
//       );
//       setFilteredProducts(filtered);
//     }
//   };

//   useEffect(() => {
//     filterProducts();
//   }, [searchQuery]);

//   const handleAddToCart = (productId) => {
//     if (session) {
//       addProduct(productId);
//       toast.success('Item added to cart!');
//     } else {
//       toast.error('You must be logged in to add items to the cart');
//       signIn();  // Redirect to sign-in page
//     }
//   };

//   return (
//     <div className="flex justify-center min-h-screen w-full">
//       {loading ? (
//         <div className="flex justify-center items-center min-h-screen w-full">
//           <Spinner />
//         </div>
//       ) : (
//         <div className="mt-14 md:mt-6 w-full px-4 md:p-0">
//           <input
//             type="text"
//             placeholder="Search products"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="mb-4 px-4 py-2 rounded-lg border border-gray-300 w-full"
//           />

//           {filteredProducts.length === 0 ? (
//             <p className="text-center text-gray-600">
//               No matching products found.
//             </p>
//           ) : (
//             <div className="grid grid-cols-2 gap-x-3 md:gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 xl:gap-x-8 px-2">
//               {filteredProducts.map((product) => (
//                 <div key={product._id}>
//                   <div className="group block overflow-hidden border border-accent rounded-xl border-opacity-10">
//                     <div className="">
//                       <div className="relative md:h-[300px] h-[200px]">
//                         <img
//                           src={product.images[0]}
//                           alt=""
//                           className="absolute inset-0 h-full w-full object-contain opacity-100 group-hover:opacity-0"
//                         />
//                         <img
//                           src={product.images[1]}
//                           alt=""
//                           className="absolute inset-0 h-full w-full object-contain opacity-0 group-hover:opacity-100"
//                         />
//                       </div>

//                       <div className="relative p-3 border-t">
//                         <Link href={"/products/" + product._id}>
//                           <h3 className="text-md text-gray-700 group-hover:underline group-hover:underline-offset-4 truncate">
//                             {product.title}
//                           </h3>
//                         </Link>

//                         <div className="mt-1.5 flex flex-col items-center justify-between text-text">
//                           <p className="tracking-wide text-primary text-sm md:text-md">
//                             Rp. {formatPrice(product.price)}
//                           </p>

//                           <div className="col-span-12 text-center w-full mt-3">
//                             <button
//                               onClick={() => handleAddToCart(product._id)}
//                               className="disabled block rounded bg-secondary px-5 py-3 text-md text-text w-full transition hover:bg-purple-300"
//                             >
//                               Add to cart
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export async function getServerSideProps() {
//   await mongooseConnect();
//   const allProducts = await Product.find({}, null, { sort: { _id: 1 } });

//   return {
//     props: {
//       allProducts: JSON.parse(JSON.stringify(allProducts)),
//     },
//   };
// }


// pages/product/index.js

// pages/product/index.js

// import Spinner from "@/components/Spinner";
// import { CartContext } from "@/lib/CartContext";
// import { mongooseConnect } from "@/lib/mongoose";
// import { Product } from "@/models/Product";
// import Link from "next/link";
// import { useContext, useEffect, useState } from "react";
// import { useSession, signIn } from "next-auth/react";
// import toast from "react-hot-toast";

// // Utility function to format price with a comma for thousands
// const formatPrice = (price) => {
//   return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };

// export default function Products({ allProducts }) {
//   const { addProduct } = useContext(CartContext);
//   const { data: session } = useSession();

//   // Search and filter state
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState(allProducts);
//   const [searchHistory, setSearchHistory] = useState([]);
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(Math.max(...allProducts.map((p) => p.price)));
//   const [loading, setLoading] = useState(false);

//   // Filter products based on search query and price range
//   useEffect(() => {
//     const filteredByPrice = allProducts.filter(
//       (product) => product.price >= minPrice && product.price <= maxPrice
//     );

//     if (searchQuery === "") {
//       setFilteredProducts(filteredByPrice);
//     } else {
//       const lowerCaseQuery = searchQuery.toLowerCase();
//       const filteredBySearch = filteredByPrice.filter((product) =>
//         product.title.toLowerCase().includes(lowerCaseQuery)
//       );
//       setFilteredProducts(filteredBySearch);
//     }
//   }, [allProducts, searchQuery, minPrice, maxPrice]);

//   // Add to cart functionality
//   const handleAddToCart = (productId) => {
//     if (session) {
//       addProduct(productId);
//       toast.success("Item added to cart!");
//     } else {
//       toast.error("You must be logged in to add items to the cart");
//       signIn();
//     }
//   };

//   // Search history management
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchQuery(value);

//     if (value !== "" && !searchHistory.includes(value)) {
//       setSearchHistory((prevHistory) => [value, ...prevHistory]);
//     }
//   };

//   const handleSearchFocus = () => {
//     if (!searchHistory.includes(searchQuery)) {
//       setSearchHistory((prevHistory) => [searchQuery, ...prevHistory]);
//     }
//   };

//   // Price filter change handlers
//   const handleMinPriceChange = (e) => {
//     const newMinPrice = Number(e.target.value) || 0;
//     setMinPrice(newMinPrice);
//   };

//   const handleMaxPriceChange = (e) => {
//     const newMaxPrice = Number(e.target.value) || Math.max(...allProducts.map((p) => p.price));
//     setMaxPrice(newMaxPrice);
//   };

//   return (
//     <div className="flex justify-center min-h-screen w-full">
//       {loading ? (
//         <div className="flex justify-center items-center min-h-screen w-full">
//           <Spinner />
//         </div>
//       ) : (
//         <div className="mt-14 md:mt-6 w-full px-4 md:p-0 flex">
//           <div className="w-1/4 border-r border-gray-300 p-4">
//             <h2 className="text-lg font-semibold mb-4">Filter</h2>
//             <h3 className="text-md font-medium mb-2">Price</h3>
//             <div className="flex flex-col space-y-4">
//               <div>

//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-1 bg-gray-200 rounded-md">
//                     Rp.
//                   </span>
//                   <input
//                     id="min-price"
//                     type="number"
//                     onChange={handleMinPriceChange}
//                     placeholder="Harga Minimum"
//                     className="mt-1 block px-4 py-3 pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   />
//                 </div>
//               </div>

//               <div>

//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-1 bg-gray-200 rounded-md focus:border-indigo-500 focus:ring-indigo-500">
//                     Rp.
//                   </span>
//                   <input
//                     id="max-price"
//                     type="number"
//                     onChange={handleMaxPriceChange}
//                     placeholder="Harga Maksimal"
//                     className="mt-1 block px-4 py-3 pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   />
//                 </div>
//               </div>

//             </div>
//           </div>

//           <div className="w-3/4 px-4">
//             <div className="relative flex items-center mb-4">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-gray-400 absolute left-3 top-2"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <input
//                 type="text"
//                 placeholder="Search products"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 onFocus={handleSearchFocus}
//                 className="pl-10 pr-8 py-2 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 list="search-history"
//               />
//               {searchQuery && (
//                 <button
//                   type="button"
//                   className="absolute right-3 top-2 text-gray-400 hover:text-gray-800"
//                   onClick={() => setSearchQuery("")}
//                 >
//                   Clear
//                 </button>
//               )}
//               <datalist id="search-history">
//                 {searchHistory.map((term) => (
//                   <option key={term} value={term} />
//                 ))}
//               </datalist>
//             </div>

//             {filteredProducts.length === 0 ? (
//               <p className="text-center text-gray-600">
//                 No matching products found.
//               </p>
//             ) : (
//               <div className="grid grid-cols-2 gap-x-3 md:gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 xl:gap-x-8 px-2">
//                 {filteredProducts.map((product) => (
//                   <div key={product._id}>
//                     <div className="group block overflow-hidden border border-accent rounded-xl border-opacity-10">
//                       <div className="">
//                         <div className="relative md:h-[300px] h-[200px]">
//                           <img
//                             src={product.images[0]}
//                             alt=""
//                             className="absolute inset-0 h-full w-full object-contain opacity-100 group-hover:opacity-0"
//                           />
//                           <img
//                             src={product.images[1]}
//                             alt=""
//                             className="absolute inset-0 h-full w-full object-contain opacity-0 group-hover:opacity-100"
//                           />
//                         </div>

//                         <div className="relative p-3 border-t">
//                           <Link href={"/products/" + product._id}>
//                             <h3 className="text-md text-gray-700 group-hover:underline group-hover:underline-offset-4 truncate">
//                               {product.title}
//                             </h3>
//                           </Link>

//                           <div className="mt-1.5 flex flex-col items-center justify-between text-text">
//                             <p className="tracking-wide text-primary text-sm md:text-md">
//                               Rp. {formatPrice(product.price)}
//                             </p>

//                             <div className="col-span-12 text-center w-full mt-3">
//                               <button
//                                 onClick={() => handleAddToCart(product._id)}
//                                 className="disabled block rounded bg-secondary px-5 py-3 text-md text-text w-full transition hover:bg-purple-300"
//                               >
//                                 Add to cart
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export async function getServerSideProps() {
//   await mongooseConnect();
//   const allProducts = await Product.find({}, null, { sort: { _id: 1 } });

//   return {
//     props: {
//       allProducts: JSON.parse(JSON.stringify(allProducts)),
//     },
//   };
// }


import Spinner from "@/components/Spinner";
import { CartContext } from "@/lib/CartContext";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import toast from "react-hot-toast";


// Utility function to format price with a comma for thousands
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function Products({ allProducts, categories = [] }) {
  const { addProduct } = useContext(CartContext);
  const { data: session } = useSession();

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [searchHistory, setSearchHistory] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Math.max(...allProducts.map((p) => p.price)));
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // Filter products based on search query, price range, and category
  useEffect(() => {
    const filteredByPrice = allProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    const filteredByCategory = selectedCategory
      ? filteredByPrice.filter((product) => product.category._id === selectedCategory)
      : filteredByPrice;

    if (searchQuery === "") {
      setFilteredProducts(filteredByCategory);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filteredBySearch = filteredByCategory.filter((product) =>
        product.title.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredProducts(filteredBySearch);
    }
  }, [allProducts, searchQuery, minPrice, maxPrice, selectedCategory]);

  // Add to cart functionality
  const handleAddToCart = (productId) => {
    if (session) {
      addProduct(productId);
      toast.success("Item added to cart!");
    } else {
      toast.error("You must be logged in to add items to the cart");
      signIn();
    }
  };
  

  // Search history management
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value !== "" && !searchHistory.includes(value)) {
      setSearchHistory((prevHistory) => [value, ...prevHistory]);
    }
  };

  const handleSearchFocus = () => {
    if (!searchHistory.includes(searchQuery)) {
      setSearchHistory((prevHistory) => [searchQuery, ...prevHistory]);
    }
  };

  // Price filter change handlers
  const handleMinPriceChange = (e) => {
    const newMinPrice = Number(e.target.value) || 0;
    setMinPrice(newMinPrice);
  };

  const handleMaxPriceChange = (e) => {
    const newMaxPrice = Number(e.target.value) || Math.max(...allProducts.map((p) => p.price));
    setMaxPrice(newMaxPrice);
  };

  // Category filter change handler
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className=" items-center justify-center min-h-screen w-full">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen w-full">
          <Spinner />
        </div>
      ) : (
        <div className="mt-14 md:mt-6 w-full px-2 md:px-0 flex flex-col md:flex-row">
          <div className="border-r border-gray-300 p-4 w-full md:w-1/4">
            <h2 className="text-lg font-semibold mb-4">Filter</h2>

            <h3 className="text-md font-medium mb-2">Category</h3>
            <select
              className="mt-1 block w-full py-3 pl-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            <h3 className="text-md font-medium mb-2 mt-4">Price</h3>
            <div className="flex flex-col space-y-4">
              <div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-1 bg-gray-200 rounded-md">
                    Rp.
                  </span>
                  <input
                    id="min-price"
                    type="number"
                    onChange={handleMinPriceChange}
                    placeholder="Harga Minimum"
                    className="mt-1 block px-4 py-3 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-1 bg-gray-200 rounded-md">
                    Rp.
                  </span>
                  <input
                    id="max-price"
                    type="number"
                    onChange={handleMaxPriceChange}
                    placeholder="Harga Maksimal"
                    className="mt-1 block px-4 py-3 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/4 px-2 md:px-4">
            <div className="relative flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 absolute left-3 top-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                className="pl-10 pr-8 py-2 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                list="search-history"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="absolute right-3 top-2 text-gray-400 hover:text-gray-800"
                  onClick={() => setSearchQuery("")}
                >
                  Clear
                </button>
              )}
              <datalist id="search-history">
                {searchHistory.map((term) => (
                  <option key={term} value={term} />
                ))}
              </datalist>
            </div>

            {filteredProducts.length === 0 ? (
              <p className="text-center text-gray-600">
                No matching products found.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-6 gap-y-10 xl:gap-x-8 px-2">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="group block border border-accent rounded-xl border-opacity-10 overflow-hidden">
                    <div className="relative h-48 md:h-60">
                      <img
                        src={product.images[0]}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                        fill={true}
                      />
                    </div>

                    <div className="relative p-3 border-t">
                      <Link href={"/products/" + product._id}>
                        <h3 className="text-md text-gray-700 group-hover:underline group-hover:underline-offset-4 truncate">
                          {product.title}
                        </h3>
                      </Link>

                      <div className="mt-1.5 flex flex-col items-center justify-between text-text">
                        <p className="tracking-wide text-primary text-sm md:text-md">
                          Rp. {formatPrice(product.price)}
                        </p>

                        <div className="col-span-12 text-center w-full mt-3">
                          <button
                            onClick={() => handleAddToCart(product._id)}
                            className="disabled block rounded bg-secondary px-5 py-3 text-md text-text w-full transition hover:bg-purple-300"
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const allProducts = await Product.find({}, null, { sort: { _id: 1 } }).populate("category");
  const categories = await Category.find();

  return {
    props: {
      allProducts: JSON.parse(JSON.stringify(allProducts)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
