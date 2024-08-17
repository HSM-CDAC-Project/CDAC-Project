import { Card } from "react-bootstrap"


function RefrigeratorRepaireCard(){
    return(
        <Card className="text-center d-flex flex-column justify-content-between" style={{width: "10rem", paddingTop:"1rem", height:"7rem", border:"none"}}>
            <a href="/refrigeratorRepair" style={{textDecoration:"none"}}>
            <center><Card.Img variant="top" src={require('../../../images/cardImages/fridge.png')} style={{width:"2.8rem", height:"4.6rem"}} /></center>
            
            {/* <Card.Body>
                <Card.Title>Full Home Cleaning</Card.Title>
            </Card.Body> */}
            <h6 style={{paddingTop:"1rem"}}>Refrigerator</h6>
            </a>
        </Card>
    )
}

export default RefrigeratorRepaireCard