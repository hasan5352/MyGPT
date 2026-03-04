import { useState } from 'react';
import './AuthPage.css';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function AuthPage(){
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [warningOn, setWarningOn] = useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  function changeAuthMode(mode) {
    if (loading) return;
    setAuthMode(mode); setEmail('');
    setPassword('') ;setWarningOn(false)
  }

  async function authenticate(e, route){
    e.preventDefault();

    try {
      if (loading) return;
      setLoading(true);

      const response = await axios.post(`/api/auth/${route}`, { email, password });
      const token = response.data.body.token;
      localStorage.setItem('token', token);
      navigate("/");
      
      // console.log(response)
      // console.log(`${route} success`);
    } catch (err) {
      console.error(err.response.data.message, err);
      setWarningOn(true)
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className='auth-page'>
      <h1>Welcome To Helix!</h1>

      <form className='auth-form' onSubmit={(e) => {authenticate(e, authMode)}}>
        <div className='auth-change'>
          <div className={authMode === 'login'? 'blue':""} 
            onClick={() => {changeAuthMode('login')}} > Log in
          </div>
          <div className={authMode === 'signup'? 'blue':""}
            onClick={() => {changeAuthMode('signup')}} > Sign up
          </div>
        </div>

        <h2>{authMode === "login"? "Login Here": "Signup Here"}</h2>

        <div className='input-div'>
          <input required onChange={(e)=>{setEmail(e.target.value); setWarningOn(false)}} value={email}
            type="email" placeholder='Enter email...' disabled={loading}
          />
          <input required onChange={(e)=>{setPassword(e.target.value); setWarningOn(false)}} value={password}
            type="password" placeholder='Enter password...' disabled={loading}
          />
        </div>

        <p className={'auth-warning' + (warningOn? '' : ' display-none')}>
          {authMode === 'signup'? 'Account already exists. Try logging in.' : 'Invalid credentials or user does not exist.'}
        </p>

        {authMode === 'login'?
          <p>Don't have an account? Click <span onClick={()=>{changeAuthMode('signup')}}>here</span> to sign up</p>
          : <p>Already have an account? Click <span onClick={()=>{changeAuthMode('login')}}>here</span> to log in</p>
        }

        <button type='submit' disabled={loading}> {authMode === "login"? "Log in": "Sign up"} </button>
      </form>

    </main>
  );
}