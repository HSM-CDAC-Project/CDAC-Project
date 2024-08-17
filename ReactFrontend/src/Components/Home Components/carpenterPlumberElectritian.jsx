import { Container, Row, Col, Image } from "react-bootstrap";
import ElectricianCard from "./Service Cards/ElectricianCard";
import CarpenterCard from "./Service Cards/CarpenterCard";
import PlumberCard from "./Service Cards/PlumberCard";


function ElectricitanCarpenterPlumber() {
    return (
        <div>
            {/* <h1>This is my home page</h1> */}
            <Container>
                <center>
                    <h1 style={{ marginTop: "120px" }}>Quick Repairs</h1>
                    <Row style={{ marginTop: "50px", marginBottom: "50px" }}>
                        <Col>
                            <ElectricianCard />
                        </Col>
                        <Col>
                            <CarpenterCard />
                        </Col>
                        <Col>
                            <PlumberCard />
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
                            <h3>Electrician/Plumber/Carpenter Services</h3>
                            <p>
                            For urgent repairs, our skilled electricians, carpenters, and plumbers are on hand to address any issues swiftly. From electrical fixes to carpentry and plumbing, we ensure your home remains functional and secure. Trust our professionals to handle emergencies and routine maintenance with expertise and care.
                            </p>
                        </div>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <img
                            src={require('../../images/homeImages/carpenter.png')}
                            width="400rem"
                            height="300rem"
                            alt="Carpenter"
                        />
                    </Col>
                </Row>
            </Container>


            {/* <h1>Home page end</h1> */}
        </div>


    )
}

export default ElectricitanCarpenterPlumber