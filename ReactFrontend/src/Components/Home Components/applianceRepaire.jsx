import { Container, Row, Col, Image } from "react-bootstrap";
import ACRepaireCard from "./Service Cards/ACRepaireCard";
import RefrigeratorRepaireCard from "./Service Cards/RefrigeratorRepaireCard";
import WMRepaireCard from "./Service Cards/WashingMachineRepaireCard";


function ApplianceRepaire() {
    return (
        <div>
            {/* <h1>This is my home page</h1> */}
            <Container>
                <center>
                    <h1 style={{ marginTop: "120px" }}>Appliance Maintenance and Repair</h1>
                    <Row style={{ marginTop: "50px", marginBottom: "50px" }}>
                        <Col>
                            <ACRepaireCard />
                        </Col>
                        <Col>
                            <RefrigeratorRepaireCard />
                        </Col>
                        <Col>
                            <WMRepaireCard />
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
                            src={require('../../images/homeImages/applRepaire3.png')}
                            width="480rem"
                            height="300rem"
                            alt="Appliance Repair"
                        />
                    </Col>
                    <Col>
                        <div>
                            <h3>Appliance Maintenance and</h3>
                            <h3>Repair Services</h3>
                            <p>
                            Keep your essential appliances in top condition with our repair services. Whether it's your AC, refrigerator, or washing machine, our experts quickly diagnose and fix issues, ensuring smooth and efficient operation. Our reliable services help extend the life of your appliances and keep your home running smoothly.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>


            {/* <h1>Home page end</h1> */}
        </div>


    )
}

export default ApplianceRepaire