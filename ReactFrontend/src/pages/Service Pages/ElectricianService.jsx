import { Col, Container, Row } from "react-bootstrap";
import ServicePackageCard from "../../Components/Service Page Components/ServicePackageCard";


function ElectricianService(){
    return(
        <div style={{marginTop:"50px"}}>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Row>
                        <h1 style={{textDecoration:"underline"}}>Electrician Services</h1>
                        <img src={require('../../images/ServicePageImages/Electrician.png')}
                            width="400rem"
                            height="520rem"
                            alt="electrician"
                        />
                        </Row>
                    </Col>

                    <Col>
                    <div className="d d-flex">
                        <ServicePackageCard serviceId={1} />
                    </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default ElectricianService