import { Col, Container, Row } from "react-bootstrap";
import ServicePackageCard from "../../Components/Service Page Components/ServicePackageCard";


function KitchenCleaningService(){
    return(
        <div style={{marginTop:"50px"}}>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Row>
                        <h1 style={{textDecoration:"underline"}}>Kitchen Cleaning Services</h1>
                        <img src={require('../../images/ServicePageImages/kitchen-cleaning.png')}
                            width="360rem"
                            height="460rem"
                            alt="Kitchen Cleaning"
                        />
                        </Row>
                    </Col>

                    <Col>
                    <div className="d d-flex">
                        <ServicePackageCard serviceId={5} />
                    </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default KitchenCleaningService