import Link from "next/link";

export default function Navbar() {
    return <>
     <div className="navbar-container bg-slate-400 text-white flex gap-x-6  text-xl p-5 item-center justify-center">
        <Link href='/'>Home</Link>
        <Link href='/blog'>Blog</Link>
        <Link href='/profile'>Profile</Link>
        <Link href='/admin'>Admin</Link>
        <button>Logout</button>
     </div>
    
    </>
}