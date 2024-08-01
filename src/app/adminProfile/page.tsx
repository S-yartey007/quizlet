'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React,{useState} from 'react'
import User from '@/models/userModel'
function ProfilePage() {
  const router = useRouter();

  const [user,setUser] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [users,setUsers] = useState([]);
  const [create,setCreate] = useState(true)
  //const [data,setData] = useState("nothing")

  const onLogout = async() => {
    try {
      await axios.get('/api/users/logout')
      console.log("Logout successfull")
      router.push('/login')

    } catch(error: any) {
      console.log(error.message)
    }
  }
  const createUser = () => {
   router.push('/adminProfile/createNewUser')
  }

  const viewUsers = async() => {
    router.push('/adminProfile/viewUsers')
 
  }

  

  return (
    <div className='flex justify-center items-center flex-col gap-2'>
        <h1>Admin Profile</h1>
        <hr/>
        <button onClick={onLogout}>Logout</button>
        <button onClick={createUser}>Create New User</button>
        <button onClick={viewUsers}>View users</button>
      
    </div>
  )
}

export default ProfilePage