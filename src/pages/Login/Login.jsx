import React, { useEffect, useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login } from '../../firebase'
import { toast } from 'react-toastify'
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../../hooks/useUserProfile'
const Login = () => {

  const navigate = useNavigate();
  const user = useProfile();



  useEffect(() => {
    console.log(user)
    if (user.email) {
      navigate("/")
    }

  },[])

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();

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
      await login(email, password);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }

  }
  return (
    loading ? <div className="login-spinner">
      <img src={netflix_spinner} alt="spinner" />
    </div> :
      <div className='login'>
        <img src={logo} alt="logo" className='login-logo' />
        <div className="login-form">
          <h1>Sign In</h1>
          <form onSubmit={user_auth}>
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='Email' />
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='Password' />
            <button onClick={user_auth} type='submit'>Login</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" />
                <label htmlFor="">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>
          <div className="form-switch">
            <p>New to Netflix? <span onClick={() => navigate("/signup")}>Sign Up Now</span ></p>
          </div>
        </div>
      </div>
  )
}

export default Login
