import { Card } from "react-bootstrap"

function FullHomeCleaningCard(){
    return(
        <Card className="text-center d-flex flex-column justify-content-between align-items-center" style={{width: "10rem", paddingTop:"1rem", height:"7rem", border:"none"}}>
            <a href="/homeCleaning" style={{textDecoration:"none"}}>
            <center><Card.Img variant="top" src={require('../../../images/cardImages/full-home-cl.png')} style={{width:"4.2rem", height:"4.2rem"}} /></center>
            
            {/* <Card.Body>
                <Card.Title>Full Home Cleaning</Card.Title>
            </Card.Body> */}
            <h6 style={{paddingTop:"1rem"}}>Full Home Cleaning</h6>
            </a>
        </Card>
    )
}

export default FullHomeCleaningCard