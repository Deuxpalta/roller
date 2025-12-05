import { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { supabase } from '../../supabase/client';


function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let mounted = true;

    const getSession = async () => {
      try {
        if (supabase.auth.getSession) {
          const { data } = await supabase.auth.getSession();
          if (mounted) setIsLoggedIn(!!data?.session);
        } else if (supabase.auth.session) {
          const session = supabase.auth.session();
          if (mounted) setIsLoggedIn(!!session);
        }
      } catch (e) {
      }
    };

    getSession();

    const listener = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setIsLoggedIn(!!session);
    });

    return () => {
      mounted = false;
      try {
        if (listener && listener.data && listener.data.subscription && typeof listener.data.subscription.unsubscribe === 'function') {
          listener.data.subscription.unsubscribe();
        } else if (listener && typeof listener.unsubscribe === 'function') {
          listener.unsubscribe();
        }
      } catch (e) {
        // ignore
      }
    };
  }, []);
  return (
    <Navbar style={{ backgroundColor: 'rgba(74, 53, 114, 1)' }} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Roller</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/characters">Personajes</Nav.Link>
            <NavDropdown title="Más" id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile">Perfil</NavDropdown.Item>
              <NavDropdown.Item href="/settings">Configuración</NavDropdown.Item>
              {isLoggedIn && (
                <>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as="button"
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        if (supabase?.auth?.signOut) {
                          await supabase.auth.signOut();
                        }
                      } catch (err) {
                        console.error('Sign out error:', err);
                      } finally {
                        setIsLoggedIn(false);
                        // quick redirect to home so UI updates predictably
                        window.location.href = '/login';
                      }
                    }}
                  >
                    Cerrar sesión
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default NavBar;