import './css/styles.css';
import Login from './frontend/Login'
import Signup from './frontend/Signup'
import Home from './frontend/Home'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
<Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </div>

    </Router>
      
    </div>
  );
}

export default App;
