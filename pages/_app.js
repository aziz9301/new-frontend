import Header from "@/components/Header";
import { CartContextProvider } from "@/lib/CartContext";
import "@/styles/globals.css";
import { Poppins } from 'next/font/google';
import { Toaster } from "react-hot-toast";

import { SessionProvider } from "next-auth/react"

const inter = Poppins({
  subsets: ['latin'],
  weight: '500'
});

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return <>

    <SessionProvider session={session}>
      <CartContextProvider>
        <main className={`${inter.className} min-h-screen max-w-screen-2xl mx-auto bg-background sm:px-6`}>
          <Header />
          <Component {...pageProps} />
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
        </main>
      </CartContextProvider>
    </SessionProvider>
  </>
}
