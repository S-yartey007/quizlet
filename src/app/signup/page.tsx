'use client';

import Link from 'next/link';
import React, {useEffect} from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";

export default function SignUp() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading,setLoading] = React.useState(false);
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.email.length > 0) {
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false)
        }

    },[user])

    const SignUp = async() => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup",user)
            console.log("SignUp success", response.data);
            router.push("/login")
        } catch(error: any) {
            console.log("Singup failed", error.message)

        } finally {
            setLoading(false)
        }

    }
    return (
        <div className='p-2 flex flex-col items-center justify-center min-h-screen py-2 gap-2'>
            <h1>{loading ? "Processing": "SignUp"}</h1>
            <hr/>
            <label htmlFor='username'>username</label>
            <input className='p-2 rounded'
            id='username'
            type='text'
            value={user.username}
            onChange={(e) => {
                setUser({...user,username: e.target.value})
            }}
            placeholder='username'
            />
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
            <button onClick={SignUp} className='p-2 border border-gray-300 rounded'>
                {buttonDisabled ? "SignUp" : "No SignUp"}
            </button>
            <Link href="/login">Go to Login page</Link>
            
        </div>
    )
}