import './css/styles.css';
import Login from './components/Login'
import Signup from './components/Signup'
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">

<Header />

<Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Signup />}></Route>
        </Routes>
      </div>

    </Router>
      
    </div>
  );
}

export default App;
