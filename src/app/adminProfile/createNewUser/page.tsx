'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React,{useState} from 'react'


function ProfilePage() {
  const router = useRouter();

  const [user,setUser] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [showUser,setShowUser] = useState(false);
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
  const createUser = async() => {
    
    try {
      await axios.post('/api/users/signup',user)

    } catch(error: any) {
      console.log(error.message)
    } 
    setShowUser(true)
  }

  const goToAdminProfile = () => {
    router.push('/adminProfile');
  }



  

  return (
    <div className='flex justify-center items-center flex-col gap-2'>
        <h1>Admin Profile</h1>
        <hr/>
        <button onClick={onLogout}>Logout</button>
        <button onClick={createUser}>Create New User</button>
        
            <div className='p-2 flex flex-col items-center justify-center min-h-screen py-2 gap-2'>
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
           
            <button onClick={createUser}>Create New User</button>
            {

            }
            <button onClick={goToAdminProfile}>Go Back</button>
            {
                showUser && (
                    <div>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                    </div>
                )
            }
     
        </div>
    
  
        
    </div>
  )
}

export default ProfilePage