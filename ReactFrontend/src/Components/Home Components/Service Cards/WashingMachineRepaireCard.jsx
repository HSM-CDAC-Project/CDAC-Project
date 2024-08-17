import { Card } from "react-bootstrap"


function WMRepaireCard(){
    return(
        <Card className="text-center d-flex flex-column justify-content-between" style={{width: "10rem", paddingTop:"1rem", height:"7rem", border:"none"}}>
            <a href="/wmRepair" style={{textDecoration:"none"}}>
            <center><Card.Img variant="top" src={require('../../../images/cardImages/washing-machine.png')} style={{width:"3.5rem", height:"4.2rem"}} /></center>
            
            {/* <Card.Body>
                <Card.Title>Full Home Cleaning</Card.Title>
            </Card.Body> */}
            <h6 style={{paddingTop:"1rem"}}>Washing Machine</h6>
            </a>
        </Card>
    )
}

export default WMRepaireCard