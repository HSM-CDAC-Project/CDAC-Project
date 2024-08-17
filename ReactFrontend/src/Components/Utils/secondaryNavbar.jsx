import { NavbarCollapse } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
// import { Form, Button } from 'react-bootstrap';
// import { Dropdown } from 'react-bootstrap';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';

function MySecondaryNavbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear local storage
        localStorage.clear();

        // Redirect to login page
        navigate('/partner-login');
    };

    
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavbarCollapse className="justify-content-start">
                    <a href="/"><img src={require('../../images/homeImages/logo2.png')} width="155px" height="70px" className="d-inline-block align-top" alt="logo" /></a>
                </NavbarCollapse>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse className="justify-content-end">
                <NavDropdown title="Hi,User" className="btn btn-outline-primary" style={{ marginRight: "10px", marginLeft: "50px" }}>
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MySecondaryNavbar
