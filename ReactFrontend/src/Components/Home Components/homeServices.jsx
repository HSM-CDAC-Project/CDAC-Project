import { Container, Row, Col, Image } from "react-bootstrap";
import HomeDecorationCard from "./Service Cards/HomeDecorationCard";
import GardeningCard from "./Service Cards/GardeningCard";
import PestControlCard from "./Service Cards/PestControlCard";


function HomeServices() {
    return (
        <div>
            {/* <h1>This is my home page</h1> */}
            <Container>
                <center>
                    <h1 style={{ marginTop: "120px" }}>Home Services</h1>
                    <Row style={{ marginTop: "50px", marginBottom: "50px" }}>
                        <Col>
                            <HomeDecorationCard />
                        </Col>
                        <Col>
                            <GardeningCard />
                        </Col>
                        <Col>
                            <PestControlCard />
                        </Col>
                    </Row>
                </center>
            </Container>
            <Container>
                <Row
                    className="d-flex align-items-center justify-content-center"
                    style={{ marginBottom: "25px", textAlign: "center" }}
                >
                    <Col>
                        <div>
                            <h3>Home Services</h3>
                            <p>
                            Elevate your living environment with our home services. From stylish home décor to maintaining a vibrant garden and effective pest control, we offer comprehensive solutions to enhance your home's beauty and comfort. Let us help you create a space that reflects your style and meets your needs.
                            </p>
                        </div>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <img
                            src={require('../../images/homeImages/services.png')}
                            width="500rem"
                            height="300rem"
                            alt="Home Services"
                        />
                    </Col>
                </Row>
            </Container>



            {/* <h1>Home page end</h1> */}
        </div>


    )
}

export default HomeServices