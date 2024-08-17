import { Col, Container, Row } from "react-bootstrap";
import ServicePackageCard from "../../Components/Service Page Components/ServicePackageCard";


function ACRepairService(){
    return(
        <div style={{marginTop:"50px"}}>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Row>
                        <h1 style={{textDecoration:"underline"}}>AC Repair Services</h1>
                        <img src={require('../../images/ServicePageImages/ac-repair.png')}
                            width="460rem"
                            height="450rem"
                            alt="AC repaire"
                        />
                        </Row>
                    </Col>

                    <Col>
                    <div className="d d-flex">
                        <ServicePackageCard serviceId={11} />
                    </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default ACRepairService