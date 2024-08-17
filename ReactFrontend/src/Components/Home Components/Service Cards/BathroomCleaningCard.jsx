import { Card } from "react-bootstrap"


function BathroomCleaningCard(){
    return(
        <Card className="text-center d-flex flex-column justify-content-between align-items-center" style={{width: "10rem", paddingTop:"1rem", height:"7rem", border:"none"}}>
            <a href="/bathroomCleaning" style={{textDecoration:"none"}}>
            <Card.Img variant="top" src={require('../../../images/cardImages/bathtub.png')} style={{width:"4.9rem", height:"3.5rem"}} />
            {/* <Card.Body>
                <Card.Title>Full Home Cleaning</Card.Title>
            </Card.Body> */}
            <h6 style={{paddingTop:"1rem"}}>Bathroom Cleaning</h6>
            </a>
        </Card>
    )
}

export default BathroomCleaningCard