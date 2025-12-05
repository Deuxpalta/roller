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
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/login');
      } else {
        // Only redirect to home when the user is currently on the login page.
        // This prevents forcing logged-in users away from other pages they purposely visit.
        if (window.location.pathname === '/login') {
          navigate('/');
        }
      }
    });

    // Check initial session on mount and redirect to login if there's no session
    (async () => {
      try {
        const sessionResp = await supabase.auth.getSession();
        if (!sessionResp?.data?.session && window.location.pathname !== '/login') {
          navigate('/login');
        }
      } catch (err) {
        // ignore errors here; listener will handle state changes
      }
    })();

    // cleanup subscription on unmount
    return () => {
      if (data?.subscription) data.subscription.unsubscribe();
    };
  }, [navigate]);
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