import Head from "next/head";
// import { ToastContainer } from "react-toastify";
// import { Menu } from "@headlessui/react";
// import "react-toastify/dist/react-toastify.css";

// import DropdownLink from "../DropdownLink";
import Navbar from "./Navbar";

export default function Layout({ title, children })
{
    // const { status, data: session } = useSession();



    // const logoutClickHandler = () => {
    //   Cookies.remove("cart");
    //   dispatch({ type: "CART_RESET" });
    //   signOut({ callbackUrl: "/login" });
    // };
    return (
        <>
            <Head>
                <title>{title ? title + " - Amazona" : "Amazona"}</title>
                <meta name="description" content="Ecommerce Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex min-h-screen flex-col justify-between ">
                <header>
                    <Navbar />
                </header>
                <main>{children}</main>
            </div>
        </>
    );
}
