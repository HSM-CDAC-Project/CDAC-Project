import { Col, Container, Row } from "react-bootstrap";
import ServicePackageCard from "../../Components/Service Page Components/ServicePackageCard";


function RoomCleaningService(){
    return(
        <div style={{marginTop:"50px"}}>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Row>
                        <h1 style={{textDecoration:"underline"}}>Room Cleaning Services</h1>
                        <img src={require('../../images/ServicePageImages/room-cleaning.png')}
                            width="480rem"
                            height="450rem"
                            alt="room cleaning"
                        />
                        </Row>
                    </Col>

                    <Col>
                    <div className="d d-flex">
                        <ServicePackageCard serviceId={10} />
                    </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default RoomCleaningService