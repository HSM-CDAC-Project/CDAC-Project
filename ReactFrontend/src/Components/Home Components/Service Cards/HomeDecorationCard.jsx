import { Card } from "react-bootstrap"


function HomeDecorationCard(){
    return(
        <Card className="text-center d-flex flex-column justify-content-between" style={{width: "10rem", paddingTop:"1rem", height:"7rem", border:"none"}}>
            <a href="/homeDecore" style={{textDecoration:"none"}}>
            <center><Card.Img variant="top" src={require('../../../images/cardImages/Sofa.png')} style={{width:"4.9rem", height:"3.5rem"}} /></center>
            
            {/* <Card.Body>
                <Card.Title>Full Home Cleaning</Card.Title>
            </Card.Body> */}
            <h6 style={{paddingTop:"1rem"}}>Home Decoration</h6>
            </a>
        </Card>
    )
}

export default HomeDecorationCard