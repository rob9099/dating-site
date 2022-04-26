import '../css/styles.css'
import React, {useState} from 'react'

function Login() {

const [emailAdress, setemailAdress] = useState('');
const [password, setPassword] = useState('')

  return (
    <div className='Login'>
      <h1>Logga in här</h1>

      <div className="EmailAdress">
          <input type="email" id="Email" name="email" placeholder="E-mail" value={emailAdress}
          onChange={e => setemailAdress(e.target.value)} />
      </div> 

      <div className="Password">
          <input type="password" id="Password" name="password" placeholder="Lösenord" value={password} 
          onChange={e => setPassword(e.target.value)} />
      </div>

      <button>Logga in</button>


    </div>
  )
}

export default Login