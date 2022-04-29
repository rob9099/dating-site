import '../css/styles.css'
import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

function Login() {

const [emailAddress, setemailAddress] = useState('');
const [password, setPassword] = useState('');
const [formerrors, setformErrors] = useState('');
const [message, setMessage] = useState('');


const formdata = {
  emailAddress: emailAddress,
  password: password
}

const handleSubmit = (e) => {
  e.preventDefault();
  setformErrors(validation(formdata))

  if (Object.keys(formerrors).length === 0) { 
    axios.post('http://localhost:5000/login', formdata)
    .then(function(response) {
      if (response.data === "Invalid email or password") {
        setMessage("Fel email eller lösenord")
        console.log("Wrong email or password")
      } else {
        setMessage("Du är nu inloggad")
        console.log("Du är inloggad")
      }
    })
    .catch(error => console.log(error))

  } else {
    console.log("nope")
  }
}


const validation = () => {
  const errors = {};

  if (!emailAddress) {
    errors.emailAddress = "Alla fält är obligatoriska"
  } if (!password) {
    errors.password = "Alla fält är obligatoriska"
  } 

  return errors 

}

  return (
    <div className='Login'>
      <Header />
      <h1>Inloggning</h1>
      <form onSubmit={handleSubmit}>

          <div className="EmailAdress">
              <input type="email" id="Email" name="email" placeholder="E-mail" value={emailAddress}
              onChange={e => setemailAddress(e.target.value)} />
          </div> 
          <p>{formerrors.emailAddress}</p>

          <div className="Password">
              <input type="password" id="Password" name="password" placeholder="Lösenord" value={password} 
              onChange={e => setPassword(e.target.value)} />
          </div>
          <p>{formerrors.password}</p>

          <p>{message}</p>

          <button>Logga in</button>

      </form>

      <div>
        Har du inget konto? <Link to="/signup">Registrera dig här</Link>
      </div>


    </div>
  )
}

export default Login