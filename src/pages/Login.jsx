import axios from 'axios'
import React from 'react'

const Login = () => {


  const handelLogin = async () => {
    try {
      const response = await axios.post('/api/user/auth/login',
        { email : 'asd@gmail', password: 'asd' },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      console.log(response.data);

    } catch (error) {
      console.log(error);

    }
  }


  return (
    <>
      Login Page
      <br />
      <br />
      <br />
      <button onClick={() => handelLogin()}>Login</button>
    </>
  )
}

export default Login