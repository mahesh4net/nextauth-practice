import Loginform from "@/components/login-form";


export default function Page() {
return <>
   <div className="blog-container text-center min-w-80 max-w-80">
    <h1  className="text-3xl font-bold">Please Login to continue</h1>
    <Loginform/>
   </div>
</>

}