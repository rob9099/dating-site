import React, {useState} from 'react'

function Signup() {

const [gender, setGender] = useState('');
const [datingGender, setdatingGender] = useState('');
const [firstName, setfirstName] = useState('');
const [lastName, setlastName] = useState('');
const [emailAdress, setemailAdress] = useState('');
const [password, setPassword] = useState('');
const [city, setCity] = useState('');
const [age, setAge] = useState('');
const [message, setMessage] = useState('')
const [error, setError] = useState('')


const handleSubmit = (e) => {

        e.preventDefault();

        const formdata = {
          gender: gender,
          datingGender: datingGender,
          firstName: firstName,
          lastName: lastName,
          emailAdress: emailAdress,
          password: password,
          city: city,
          age: age
        }

        console.log(formdata)

        //validation


}

  return (

    <div>
      <h2>Fyll i din information</h2>

    <form className="signupform" onSubmit={handleSubmit}>

            <div className="Gender">
                  <input type="radio" id="Male" name="Male" value="Jag är en man" 
                  checked={gender === "Jag är en man"} onChange={e => setGender(e.target.value)} />
                  <label>Jag är en man</label>

                  <input type="radio" id="Female" name="Female" value="Jag är en kvinna" 
                  checked={gender === "Jag är en kvinna"} onChange={e => setGender(e.target.value)} />
                  <label>Jag är en kvinna</label>
            </div>

            <div className="DatingGender">
                  <input type="radio" id="DatingMale" name="DatingMale" value="Söker en man" 
                  checked={datingGender === "Söker en man"} onChange={e => setdatingGender(e.target.value)} />
                  <label>Söker en man</label>

                  <input type="radio" id="DatingFemale" name="DatingFemale" value="Söker en kvinna" 
                  checked={datingGender === "Söker en kvinna"} onChange={e => setdatingGender(e.target.value)} />
                  <label>Söker en kvinna</label>
            </div>

            <div className="Firstname">
                  <input type="text" id="firstname" name="firstname" placeholder="Förnamn" value={firstName} 
                  onChange={e => setfirstName(e.target.value)} />
             </div> 

             <div className="Lastname">
                 <input type="text" id="Lastname" name="lastname" placeholder="Efternamn" value={lastName}
                 onChange={e => setlastName(e.target.value)} />
            </div>

            <div className="EmailAdress">
                <input type="email" id="email" name="email" placeholder="E-mail" value={emailAdress}
                onChange={e => setemailAdress(e.target.value)} />
            </div> 

             <div className="Password">
                 <input type="password" id="password" name="password" placeholder="Lösenord" value={password} 
                 onChange={e => setPassword(e.target.value)} />
             </div>

             <div className="Age">
                <input type="number" id="age" name="age" value={age}
                onChange={e => setAge(e.target.value)} />
             </div>

            <div className="City">
                <input type="text" id="city" name="city" placeholder="Stad" value={city} 
                onChange={e => setCity(e.target.value)} />
            </div>

             <button>Skapa konto</button>

    </form>
    

    </div>
  )
}

export default Signup