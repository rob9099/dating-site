import '../css/styles.css'
import React, {useState} from 'react'
import { Link } from 'react-router-dom';

function Login() {

const [emailAdress, setemailAdress] = useState('');
const [password, setPassword] = useState('')

  return (
    <div className='Login'>
      <h1>Inloggning</h1>

      <div className="EmailAdress">
          <input type="email" id="Email" name="email" placeholder="E-mail" value={emailAdress}
          onChange={e => setemailAdress(e.target.value)} />
      </div> 

      <div className="Password">
          <input type="password" id="Password" name="password" placeholder="Lösenord" value={password} 
          onChange={e => setPassword(e.target.value)} />
      </div>

      <button>Logga in</button>

      <div>
        Har du inget konto? <Link to="/">Registrera dig här</Link>
      </div>


    </div>
  )
}

export default Login