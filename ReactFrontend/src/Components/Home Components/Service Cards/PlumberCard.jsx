import { Card } from "react-bootstrap"


function PlumberCard(){
    return(
        <Card className="text-center d-flex flex-column justify-content-between" style={{width: "10rem", paddingTop:"1rem", height:"7rem", border:"none"}}>
            <a href="/plumberService" style={{textDecoration:"none"}}>
            <center><Card.Img variant="top" src={require('../../../images/cardImages/water-tap 1.png')} style={{width:"4.9rem", height:"4.2rem"}} /></center>
            
            {/* <Card.Body>
                <Card.Title>Full Home Cleaning</Card.Title>
            </Card.Body> */}
            <h6 style={{paddingTop:"1rem"}}>Plumber</h6>
            </a>
        </Card>
    )
}

export default PlumberCard