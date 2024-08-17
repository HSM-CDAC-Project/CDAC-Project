import { Col, Container, Row } from "react-bootstrap";
import ServicePackageCard from "../../Components/Service Page Components/ServicePackageCard";


function GardeningService(){
    return(
        <div style={{marginTop:"50px"}}>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Row>
                        <h1 style={{textDecoration:"underline"}}>Gardening Services</h1>
                        <img src={require('../../images/ServicePageImages/gerden.png')}
                            width="180rem"
                            height="480rem"
                            alt="gardener"
                        />
                        </Row>
                    </Col>

                    <Col>
                    <div className="d d-flex">
                        <ServicePackageCard serviceId={2} />
                    </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default GardeningService