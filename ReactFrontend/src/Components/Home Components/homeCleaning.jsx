import { Container, Row, Col } from "react-bootstrap";
import HomeCleaningCard from "./Service Cards/HomeCleaningCard";
import FullHomeCleaningCard from "./Service Cards/FullHomeCleaningCard";
import BathroomCleaningCard from "./Service Cards/BathroomCleaningCard";
import KitchenCleaningCard from "./Service Cards/KitchenCleaningCard";

function HomeCleaning() {
    return (
        <div>
            {/* <h1>This is my home page</h1> */}
            <Container>
                <center>
                    <h1 style={{ marginTop: "50px" }}>Home Cleaning</h1>
                    <Row style={{ marginTop: "50px", marginBottom: "50px" }}>
                        <Col>
                            <FullHomeCleaningCard />
                        </Col>
                        <Col>
                            <HomeCleaningCard />
                        </Col>
                        <Col>
                            <BathroomCleaningCard />
                        </Col>
                        <Col>
                            <KitchenCleaningCard />
                        </Col>
                    </Row>
                </center>
            </Container>
            <Container>
                <Row
                    className="d-flex align-items-center justify-content-center"
                    style={{ marginBottom: "25px", textAlign: "center" }}
                >
                    <Col className="d-flex justify-content-center">
                        <img
                            src={require('../../images/homeImages/cleaning.png')}
                            width="500rem"
                            height="300rem"
                            alt="Home Cleaning"
                        />
                    </Col>
                    <Col>
                        <div>
                            <h3>Home Cleaning Services</h3>
                            <p>
                            Our home cleaning services ensure every corner of your home sparkles. Whether you need a full home cleaning or targeted attention for specific areas like rooms, bathrooms, or the kitchen, we deliver a spotless and refreshing living space. We use safe, effective cleaning methods to create a healthier environment for you and your family.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>



            {/* <h1>Home page end</h1> */}
        </div>


    )
}

export default HomeCleaning