import './AuthPage.css';

export default function AuthPage(){
  return (
    <main className='auth-page'>
      <h1>Welcome To MyGPT!</h1>
      <div className='auth-form'>
        <div className='auth-change'>
          <div>Log in</div>
          <div>Sign up</div>
        </div>

        <h2>Login Here</h2>

        <div className='input-div'>
          <input type="email" placeholder='Enter email...' name="" id="" />
          <input type="password" placeholder='Enter password...' name="" id="" />
        </div>
        
        <button>Log in</button>
      </div>
    </main>
  );
}