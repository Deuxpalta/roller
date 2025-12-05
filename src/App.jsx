import { useEffect } from 'react';
import { Routes, Route , useNavigate} from 'react-router-dom';

import NavBar from './components/organisms/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Characters from './pages/Characters';
import NotFound from './pages/NotFound';

import { supabase } from './supabase/client';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/login');
      } else {
        navigate('/');
      }
    });
  }, []);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}


export default App;