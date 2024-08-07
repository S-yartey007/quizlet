'use client';
import { lusitana } from '../ui/fonts';
import Link from 'next/link';
import React,{useEffect} from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";


export default function Login() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading,setLoading] = React.useState(false);

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }

    },[user])


    const onLogin = async() => {
        try {
            setLoading(true);
           const response =  await axios.post("api/users/login",user)
           //const tokenResponse = await axios.get("api/user/details");
           //console.log(tokenResponse)
           const {data} = response.data
           if(data.isAdmin) {
            router.push('/adminProfile')
           } else {
            router.push('/userProfile')
           }

        } catch (error: any) {
            console.log("Login failed",error.message)
        } finally {
            setLoading(false)
        }


    }
    return (
        <div className='p-2 rounded-lg bg-gray-50 px-6 pb-4 pt-8 flex flex-col items-center justify-center min-h-screen py-2 gap-2'>
            <h1>{loading ? "Signing in": "Sign In"}</h1>
            <hr/>
            <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
          
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor='email'>email</label>
            <input className="peer block w-1/2 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"

            id='email'
            type='text'
            value={user.email}
            onChange={(e) => {
                setUser({...user,email: e.target.value})
            }}
            placeholder='emailpassword'
            />
            <label  className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor='password'>password</label>
            <input className="peer block w-1/2 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"

            id='password'
            type='password'
            value={user.password}
            onChange={(e) => {
                setUser({...user,password: e.target.value})
            }}
            placeholder='password'
            />
            <button onClick={onLogin} className='p-2 border border-gray-300 rounded'>
                {buttonDisabled ? "Login disabled":"Login"}
            </button>
            <Link href="/signup">Go to Signup page</Link>
            
        </div>
    )
}