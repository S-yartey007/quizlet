'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React,{useState} from 'react'
import User from '@/models/userModel'
function ProfilePage() {
  const router = useRouter();

 
  const [users,setUsers] = useState([]);
  const [showUser,setShowUser] = useState(false)
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
 
  const viewUsers = async() => {
    try {
        const users = await axios.get('api/users/details')
        const {data} = users
        setUsers(data.Users)
        console.log(users)

    } catch(error:any) {
        console.log(error,error.message)
    }
  

 
  }
  function goback() {
    router.push('/adminProfile')
  }

  

  return (
    <div className='flex justify-center items-center flex-col gap-2'>
        <h1>Admin Profile</h1>
        <hr/>
        <button onClick={onLogout}>Logout</button>
        <button onClick={goback}>go back</button>
        <button onClick={viewUsers}>View users</button>
          {/*   {users.map((user) => {
                console.log(user.username)
            })} */}
      
    </div>
  )
}

export default ProfilePage