import React, { useEffect, useState } from 'react'
import "./Signup.css"
import logo from '../../assets/logo.png'
import { signup } from '../../firebase'
import { toast } from 'react-toastify'
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../../hooks/useUserProfile'
const Signup = () => {
  const user = useProfile();
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    console.log(user)
    if (user.email) {
      navigate("/")
    }
  }, [])

  const user_auth = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error('Name is required');
      return;
    }

    if (!email.trim()) {
      toast.error('Email is required');
      return;
    }

    if (!password.trim()) {
      toast.error('Password is required');
      return;
    }

    try {
      setLoading(true);
      await signup(name, email, password);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }

  }
  return (
    loading ? <div className="signup-spinner">
      <img src={netflix_spinner} alt="spinner" />
    </div> :
      <div className='signup'>
        <img src={logo} alt="logo" className='signup-logo' />
        <div className="signup-form">
          <h1>Signup</h1>
          <form onSubmit={user_auth}>
            <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" placeholder='Your Name' />
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='Email' />
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='Password' />
            <button onClick={user_auth} type='submit'>Create</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" />
                <label htmlFor="">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>
          <div className="form-switch">
            <p>Already have account?<span onClick={() => navigate("/login")}>Login Now</span></p>
          </div>
        </div>
      </div>
  )
}

export default Signup
