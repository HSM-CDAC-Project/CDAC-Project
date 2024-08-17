import { Col, Container, Row } from "react-bootstrap";
import ServicePackageCard from "../../Components/Service Page Components/ServicePackageCard";


function PestControlService(){
    return(
        <div style={{marginTop:"50px"}}>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Row>
                        <h1 style={{textDecoration:"underline"}}>Pest Control Services</h1>
                        <img src={require('../../images/ServicePageImages/pestcontrol.png')}
                            width="460rem"
                            height="430rem"
                            alt="pest contol"
                        />
                        </Row>
                    </Col>

                    <Col>
                    <div className="d d-flex">
                        <ServicePackageCard serviceId={6} />
                    </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default PestControlService