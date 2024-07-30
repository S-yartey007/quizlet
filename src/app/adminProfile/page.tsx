'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React,{useState} from 'react'
import Link from 'next/link';
function ProfilePage() {
  const router = useRouter();
  const [data,setData] = useState("nothing")
  const onLogout = async() => {
    try {
      await axios.get('/api/users/logout')
      console.log("Logout successfull")
      router.push('/login')

    } catch(error: any) {
      console.log(error.message)
    }
  }

  

  return (
    <div className='flex justify-center items-center flex-col gap-2'>
        <h1>Admin Profile</h1>
        <hr/>
        <button onClick={onLogout}>Logout</button>
        <p>Profile page</p>
    </div>
  )
}

export default ProfilePage