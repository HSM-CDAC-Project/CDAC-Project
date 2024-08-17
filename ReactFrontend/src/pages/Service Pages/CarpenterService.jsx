import { Col, Container, Row } from "react-bootstrap";
import ServicePackageCard from "../../Components/Service Page Components/ServicePackageCard";


function CarpenterService(){
    return(
        <div style={{marginTop:"50px"}}>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Row>
                        <h1 style={{textDecoration:"underline"}}>Carpenter Services</h1>
                        <img src={require('../../images/ServicePageImages/carpenter.png')}
                            width="500rem"
                            height="490rem"
                            alt="carpenter"
                        />
                        </Row>
                    </Col>

                    <Col>
                    <div className="d d-flex">
                        <ServicePackageCard serviceId={7} />
                    </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default CarpenterService