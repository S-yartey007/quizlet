'use client';

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
        <div className='p-2 flex flex-col items-center justify-center min-h-screen py-2 gap-2'>
            <h1>{loading ? "Signing in": "Signed In"}</h1>
            <hr/>
          
            <label htmlFor='email'>email</label>
            <input className='p-2 rounded '
            id='email'
            type='text'
            value={user.email}
            onChange={(e) => {
                setUser({...user,email: e.target.value})
            }}
            placeholder='emailpassword'
            />
            <label htmlFor='password'>password</label>
            <input className='p-2 rounded'
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