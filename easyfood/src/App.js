import './App.css';
import Home from './screens/Home';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import Login from './screens/Login';
import Signup from './screens/Signup';
import Myorder from './components/Myorder';


function App() {
  return (
   <Router>
     
        <div>
  
  <Routes>
           <Route path='/' element={<Home/>}></Route>
           <Route path='/login' element={<Login></Login>}></Route>
           <Route path='/signup' element={<Signup></Signup>}></Route>
           <Route path='/myorder' element={<Myorder></Myorder>}></Route>

  </Routes>      
        </div>
    
   </Router>
  );
}

export default App;
