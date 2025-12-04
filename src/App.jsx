import { Routes, Route } from 'react-router-dom';
import NavBar from './components/organisms/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Characters from './pages/Characters';


function App() {
 return (
   <>
     <NavBar />
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="login" element={<Login />} />
       <Route path="/characters" element={<Characters />} />
     </Routes>
   </>
 );
}


export default App;