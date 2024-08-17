import { Col, Container, Row } from "react-bootstrap";
import ServicePackageCard from "../../Components/Service Page Components/ServicePackageCard";


function WMRepairService(){
    return(
        <div style={{marginTop:"50px"}}>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Row>
                        <h1 style={{textDecoration:"underline"}}>Washing Machine Repair Services</h1>
                        <img style={{marginTop:"3rem"}} src={require('../../images/ServicePageImages/wm-repaire.png')}
                            width="460rem"
                            height="440rem"
                            alt="washing machine repair"
                        />
                        </Row>
                    </Col>

                    <Col>
                    <div className="d d-flex">
                        <ServicePackageCard serviceId={13} />
                    </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default WMRepairService