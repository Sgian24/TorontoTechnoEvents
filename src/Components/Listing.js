import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Listing = ({events, venues}) => {

    const excludedVenues = ["Standard Time", "Sounds Good", "Bambi's", "Cafeteria", ]
    const dates = []
    const eventss = events.sort((a,b) => Date.parse(a.start_time) - Date.parse(b.start_time))
                                             .filter(i => venues.length === 1 && venues.includes("Other") ? !excludedVenues.includes(i.venue.name):
                                                    venues.length > 1 && venues.includes("Other")? !excludedVenues.includes(i.venue.name) || venues.includes(i.venue.name)  :
                                                    venues.length > 0? venues.includes(i.venue.name): events)
                                                          
    eventss.map(i => {
        const test = new Date(i.start_time).toDateString()
        if (!dates.includes(test)) {
            dates.push(test)
    }})

    console.log(dates);
    return (
     <>
        <Container className="d-flex flex-column align-items-center">
        {dates.map( j =>  
         <ul className="px-0 " style={{listStyleType:"none"}}>
         <h3>{j}</h3>
         {eventss.filter(i => j === new Date(i.start_time).toDateString()).map(i =>
          <li className="mb-2 ">
            <Row className="d-flex justify-content-between border gx-0" style={{height:"30vh", width:"50vw"}}>
                <Col className="h-100" xl={3}>  
                    {i.thumbnail? <img className=" object-fit-cover" src={i.thumbnail} height="100%" width="100%"></img>
                                 :<i className="bi bi-images text-center mt-4"  style={{fontSize:"4rem",display:"block", margin:"auto"}}></i>}
                </Col>
                <Col className="ps-4" xl={9}>
                    {i.name}
                    <div className="mt-5">{i.start_time.split(" ")[1]} - {i.end_time?.split(" ")[1]}</div>
                    <div>{i.venue.name}</div>
                    <div>{i.venue.full_address}</div>

                </Col>
            </Row>
          </li>
         )}
         </ul>)}
        </Container>
     </>
    )
}

export default Listing;