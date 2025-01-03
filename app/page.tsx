import Link from "next/link";


export default function Home() {
  return <>
  <div className="home-container text-center flex flex-col justify-center items-center">
  <h1 className="text-3xl font-bold">HOME PAGE</h1>
  <div className="home-auth-container flex gap-x-4 mt-5 text-lg text-white">
    <Link href='/login' className="font-semibold bg-blue-500 p-5 pt-2 pb-2 rounded">sign in</Link>
    <Link href='/create-account' className="font-semibold bg-blue-500 p-5 pt-2 pb-2 rounded">create account</Link>
  </div>
  </div>
  </>
}

