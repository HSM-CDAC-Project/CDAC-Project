import { Card } from "react-bootstrap"


function CarpenterCard(){
    return(
        <Card className="text-center d-flex flex-column justify-content-between" style={{width: "10rem", paddingTop:"1rem", height:"7rem", border:"none"}}>
            <a href="/carpenterService" style={{textDecoration:"none"}}>
            <center><Card.Img variant="top" src={require('../../../images/cardImages/drill-machine.png')} style={{width:"4.9rem", height:"3.5rem"}} /></center>
            
            {/* <Card.Body>
                <Card.Title>Full Home Cleaning</Card.Title>
            </Card.Body> */}
            <h6 style={{paddingTop:"1rem"}}>Carpenter</h6>
            </a>
        </Card>
    )
}

export default CarpenterCard