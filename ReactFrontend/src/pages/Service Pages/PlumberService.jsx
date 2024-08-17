import { Col, Container, Row } from "react-bootstrap";
import ServicePackageCard from "../../Components/Service Page Components/ServicePackageCard";


function PlumberService(){
    return(
        <div style={{marginTop:"50px"}}>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Row>
                        <h1 style={{textDecoration:"underline"}}>Plumber Services</h1>
                        <img src={require('../../images/ServicePageImages/plumber.png')}
                            width="480rem"
                            height="480rem"
                            alt="plumber"
                        />
                        </Row>
                    </Col>

                    <Col>
                    <div className="d d-flex">
                        <ServicePackageCard serviceId={8} />
                    </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default PlumberService