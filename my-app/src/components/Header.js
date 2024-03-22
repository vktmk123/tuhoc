import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from "../assets/Image/logo192.png";
import {useLocation, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';


const Header = (props) => {
    const {logout, user} = useContext(UserContext);

    const [hideHeader, setHideHeader] = useState(false);

    // useEffect(()=>{
    //   if(window.location.pathname === '/login'){
    //     setHideHeader(true);
    //   }
    // },[])
    // const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
        toast.success('Logout success');
    }

    return (
        <>
        <Navbar expand="lg" className="bg-body-tertiary" >
      <Container>
        <Navbar.Brand to="/" >
          <img 
            src={logoApp}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          <span>Acticle'App</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {(user && user.auth || window.location.pathname === '/') &&
          <>
          <Nav className="me-auto">
              <NavLink to="/" className='nav-link'> Home</NavLink> 
              <NavLink to="/users" className='nav-link'> Manage users</NavLink> 
          </Nav>
          <Nav>
            {user && user.email && <span className='nav-link'>Hello, {user.email}</span>}
          <NavDropdown title="Setting">
            {user && user.auth === true 
            ? <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
            : <NavLink to="/login" className='dropdown-iten'>Login</NavLink>
            }
          </NavDropdown>
          </Nav>
          </>}
            
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </>
    );
}

export default Header;