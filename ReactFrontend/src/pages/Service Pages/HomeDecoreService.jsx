import { Col, Container, Row } from "react-bootstrap";
import ServicePackageCard from "../../Components/Service Page Components/ServicePackageCard";


function HomeDecoreService(){
    return(
        <div style={{marginTop:"50px"}}>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Row>
                        <h1 style={{textDecoration:"underline"}}>Home Decore Services</h1>
                        <img src={require('../../images/ServicePageImages/home-decor.png')}
                            width="370rem"
                            height="470rem"
                            alt="Home Decore"
                        />
                        </Row>
                    </Col>

                    <Col>
                    <div className="d d-flex">
                        <ServicePackageCard serviceId={4} />
                    </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default HomeDecoreService