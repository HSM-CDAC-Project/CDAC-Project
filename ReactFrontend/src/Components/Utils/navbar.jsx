import { DropdownMenu, NavbarCollapse } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
// import { Form, Button } from 'react-bootstrap';
// import { Dropdown } from 'react-bootstrap';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';

function MyNavbar() {
    const customerId = localStorage.getItem('customerId');
    // const token = localStorage.getItem('jwt');
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear local storage
        localStorage.clear();

        // Redirect to home page
        navigate('/');
    };




    // if(!token){
    if(!customerId){
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavbarCollapse className="justify-content-start">
                    <a href="/"><img src={require('../../images/homeImages/logo2.png')} width="160px" height="70px" className="d-inline-block align-top" alt="logo" /></a>
                </NavbarCollapse>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <NavbarCollapse className="justify-content-center" id="basic-navbar-nav">
                <NavDropdown title="Home Cleaning" id="basic-nav-dropdown" className="mx-3">
                    <NavDropdown.Item href="/homeCleaning" className="mb-2">Full Home Cleaning</NavDropdown.Item>
                    <NavDropdown.Item href="/roomCleaning" className="mb-2">Room Cleaning</NavDropdown.Item>
                    <NavDropdown.Item href="/bathroomCleaning" className="mb-2">Bathroom Cleaning</NavDropdown.Item>
                    <NavDropdown.Item href="/kitchenCleaning" className="mb-2">Kitchen Cleaning</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Home Services" id="basic-nav-dropdown" className="mx-3">
                    <NavDropdown.Item href="/pestControl" className="mb-2">Pest Control</NavDropdown.Item>
                    <NavDropdown.Item href="/homeDecore" className="mb-2">Home Decoration</NavDropdown.Item>
                    <NavDropdown.Item href="/gardeningService" className="mb-2">Gardening</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Appliance Maintenance" id="basic-nav-dropdown" className="mx-3">
                    <NavDropdown.Item href="/acRepair" className="mb-2">Air Conditioner</NavDropdown.Item>
                    <NavDropdown.Item href="/refrigeratorRepair" className="mb-2">Refrigerator</NavDropdown.Item>
                    <NavDropdown.Item href="/wmRepair" className="mb-2">Washing Machine</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Quick Repairs" id="basic-nav-dropdown" className="mx-3">
                    <NavDropdown.Item href="/electricianService" className="mb-2">Electrician</NavDropdown.Item>
                    <NavDropdown.Item href="/plumberService" className="mb-2">Plumber</NavDropdown.Item>
                    <NavDropdown.Item href="/carpenterService" className="mb-2">Carpenter</NavDropdown.Item>
                </NavDropdown>
                </NavbarCollapse>
                
                <Navbar.Collapse className="justify-content-end">
                    <a href="/mycart"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-basket" viewBox="0 0 16 16">
                        <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9zM1 7v1h14V7zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5" />
                    </svg></a>
                    <NavDropdown title="Login" className="btn btn-outline-primary" style={{ marginRight: "10px", marginLeft: "50px" }}>
                        <NavDropdown.Item href="/customer-login">Customer</NavDropdown.Item>
                        <NavDropdown.Item href="/partner-login">Partner</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Register" className="btn btn-outline-grey">
                        <NavDropdown.Item href="/customer-register">Customer</NavDropdown.Item>
                        <NavDropdown.Item href="/partner-register">Partner</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )}




    // if(token){
    if(customerId){
        return (
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavbarCollapse className="justify-content-start">
                        <a href="/"><img src={require('../../images/homeImages/logo2.png')} width="155px" height="70px" className="d-inline-block align-top" alt="logo" /></a>
                    </NavbarCollapse>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    
                    <NavbarCollapse className="justify-content-center" id="basic-navbar-nav">
                    <NavDropdown title="Home Cleaning" id="basic-nav-dropdown" className="mx-3">
                        <NavDropdown.Item href="/fullHomeCleaning" className="mb-2">Full Home Cleaning</NavDropdown.Item>
                        <NavDropdown.Item href="/homeCleaning" className="mb-2">Room Cleaning</NavDropdown.Item>
                        <NavDropdown.Item href="/bathroomCleaning" className="mb-2">Bathroom Cleaning</NavDropdown.Item>
                        <NavDropdown.Item href="/kitchenCleaning" className="mb-2">Kitchen Cleaning</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Home Services" id="basic-nav-dropdown" className="mx-3">
                        <NavDropdown.Item href="/pestControl" className="mb-2">Pest Control</NavDropdown.Item>
                        <NavDropdown.Item href="/homeDecore" className="mb-2">Home Decoration</NavDropdown.Item>
                        <NavDropdown.Item href="/gardeningService" className="mb-2">Gardening</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Appliance Maintenance" id="basic-nav-dropdown" className="mx-3">
                        <NavDropdown.Item href="/acRepair" className="mb-2">Air Conditioner</NavDropdown.Item>
                        <NavDropdown.Item href="/refrigeratorRepair" className="mb-2">Refrigerator</NavDropdown.Item>
                        <NavDropdown.Item href="/wmRepair" className="mb-2">Washing Machine</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Quick Repairs" id="basic-nav-dropdown" className="mx-3">
                        <NavDropdown.Item href="/electricianService" className="mb-2">Electrician</NavDropdown.Item>
                        <NavDropdown.Item href="/plumberService" className="mb-2">Plumber</NavDropdown.Item>
                        <NavDropdown.Item href="/carpenterService" className="mb-2">Carpenter</NavDropdown.Item>
                    </NavDropdown>
                    </NavbarCollapse>
                    
                    <Navbar.Collapse className="justify-content-end">
                        <a href="/mycart"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-basket" viewBox="0 0 16 16">
                            <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9zM1 7v1h14V7zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5" />
                        </svg></a>
                        <NavDropdown title="Hi,User" className="btn btn-outline-primary" style={{ marginRight: "10px", marginLeft: "50px" }}>
                            <NavDropdown.Item href="/customer-details">My Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )}



}

export default MyNavbar
