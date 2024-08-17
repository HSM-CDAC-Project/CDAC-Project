import { Col, Container, Row } from "react-bootstrap";
import ServicePackageCard from "../../Components/Service Page Components/ServicePackageCard";


function HomeCleaningService(){
    return(
        <div style={{marginTop:"50px"}}>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Row>
                        <h1 style={{textDecoration:"underline"}}>Full Home Cleaning Services</h1>
                        <img src={require('../../images/ServicePageImages/full-home-cleaning.png')}
                            width="450rem"
                            height="470rem"
                            alt="home cleaning"
                        />
                        </Row>
                    </Col>

                    <Col>
                    <div className="d d-flex">
                        <ServicePackageCard serviceId={9} />
                    </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default HomeCleaningService