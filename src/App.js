import './css/styles.css';
import Login from './components/Login'
import Signup from './components/Signup'
import AllProfiles from './components/AllProfiles';
import SingleProfile from './components/SingleProfile';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">

<Router>
      <div>
        <Routes>
          <Route path="/" element={<AllProfiles />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/SingleProfile" element={<SingleProfile />}></Route>
        </Routes>
      </div>

    </Router>
      
    </div>
  );
}

export default App;
