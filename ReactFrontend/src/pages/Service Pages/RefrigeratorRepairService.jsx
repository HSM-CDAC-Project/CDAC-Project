import { Col, Container, Row } from "react-bootstrap";
import ServicePackageCard from "../../Components/Service Page Components/ServicePackageCard";


function RefrigeratorRepairService(){
    return(
        <div style={{marginTop:"50px"}}>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Row>
                        <h1 style={{textDecoration:"underline"}}>Refrigerator Repair Services</h1>
                        <img src={require('../../images/ServicePageImages/refri-repaire.png')}
                            width="480rem"
                            height="450rem"
                            alt="refrigerator repair"
                        />
                        </Row>
                    </Col>

                    <Col>
                    <div className="d d-flex">
                        <ServicePackageCard serviceId={12} />
                    </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default RefrigeratorRepairService