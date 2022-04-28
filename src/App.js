import './css/styles.css';
import Login from './components/Login'
import Signup from './components/Signup'
import AllProfiles from './components/AllProfiles';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">

<Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/allProfiles" element={<AllProfiles />}></Route>
        </Routes>
      </div>

    </Router>
      
    </div>
  );
}

export default App;
