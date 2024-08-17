import { Card } from "react-bootstrap"

function MyCard(){
    return(
        <Card className="text-center" style={{width: "10rem", marginTop:"100px"}}>
            <Card.Img variant="top" src="holder.js/100px180" />
            {/* <Card.Body>
                <Card.Title>Full Home Cleaning</Card.Title>
            </Card.Body> */}
            <h6>Full Home Cleaning</h6>
        </Card>
        


    )
}

export default MyCard   