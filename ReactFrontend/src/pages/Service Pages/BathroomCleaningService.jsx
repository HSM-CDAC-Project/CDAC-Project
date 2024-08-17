import { Col, Container, Row } from "react-bootstrap";
import ServicePackageCard from "../../Components/Service Page Components/ServicePackageCard";


function BathroomCleaningService(){
    return(
        <div style={{marginTop:"50px"}}>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Row>
                        <h1 style={{textDecoration:"underline"}}>Bathroom Cleaning Services</h1>
                        <img src={require('../../images/ServicePageImages/bathroom-cleaning.png')}
                            width="330rem"
                            height="420rem"
                            alt="Bathroom cleaning"
                            style={{marginTop:"20px"}}
                        />
                        </Row>
                    </Col>

                    <Col>
                    <div className="d d-flex">
                        <ServicePackageCard serviceId={3} />
                    </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default BathroomCleaningService