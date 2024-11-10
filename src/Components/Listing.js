import { useEffect, useState, useRef } from "react";
import {Container, Row, Col, Modal} from "react-bootstrap";


const Listing = ({dates, setDates, events, venues, selectedDate}) => {

    const [show, setShow] = useState(false)
    const [test, setTest] = useState({})

    const descriptionRef = useRef(null)

    const excludedVenues = ["Standard Time", "Sounds Good", "Bambi's", "Cafeteria", "BSMT254"]
    const filteredEvents = events.sort((a,b) => Date.parse(a?.start_time) - Date.parse(b?.start_time))
                                             .filter(i => venues.length === 1 && venues.includes("Other") ? !excludedVenues.includes(i.venue.name):
                                                    venues.length > 1 && venues.includes("Other")? !excludedVenues.includes(i.venue.name) || venues.includes(i.venue.name):
                                                    venues.length > 0? venues.includes(i.venue.name): events)
                                       
    const filteredDates = []  
                                         
    useEffect(() => {
        filteredEvents.forEach(i => {
            const eventDate = new Date(i?.start_time).toDateString()
            if (!filteredDates.includes(eventDate)) {
            filteredDates.push(eventDate)}
        })
        setDates(filteredDates)
    },[events,venues])

    useEffect(() => {
        if (descriptionRef.current !== null ) {
            descriptionRef.current.innerHTML = test.description? test.description?.split("\n").join(`<br />`)
            .replace(/[\u0000-\u001F\u007F-\u009F]|b\u0000/g,"").replace("&",`... <a href="${test.link}" target=_blank>Read More</a>`):""
    }},[show])

    const handleShow = (obj) => {
        setShow(true)
        setTest(obj)
        document.body.classList.remove("overflow-y-scroll")
    }

    const handleClose = () => {
        setShow(false)
        const add = () => document.body.classList.add("overflow-y-scroll")
        setTimeout(add, 500)
    }

    console.log(document.body);


    return (
     <>
        <Container className="d-flex flex-column align-items-center">
        <Modal size="md" show={show} onHide={handleClose} >
                <Modal.Header closeButton>{test?.name}</Modal.Header>
                <Modal.Body>
                    <p ref={descriptionRef}></p>
                </Modal.Body>
            </Modal>
        {dates.filter(j => selectedDate === ""? typeof Date.parse(j) === "number" : Date.parse(j) === selectedDate ).map( k =>  
         <ul className="px-0 " style={{listStyleType:"none"}}>
         <h3 className="mt-2">{k.toUpperCase()}</h3>
         {filteredEvents.filter(i => k === new Date(i.start_time).toDateString()).map(i =>
          <li className="mb-2 ">
            <Row onClick={() => handleShow(i)} className="list-row d-flex justify-content-between border gx-0" style={{height:"30vh", width:"50vw", cursor:"pointer"}}>
                <Col className="border h-100" xl={3}>  
                    {i.thumbnail? <img className=" object-fit-cover" src={i.thumbnail} height="100%" width="100%"></img>
                                 :<i className="bi bi-images text-center mt-4"  style={{fontSize:"4rem",display:"block", margin:"auto"}}></i>}
                </Col>
                <Col className="d-flex flex-column justify-content-between ps-4 pe-4 pt-2 pb-2" xl={9}>
                    <h5 style={{fontFamily:"Barlow", fontWeight:"bold"}}>{i.name}</h5>
                    <div className="d-flex flex-column justify-content-center">
                        <div style={{fontFamily:"Barlow"}}>{i.start_time?.split(" ")[1]} - {i.end_time?.split(" ")[1]}</div>
                        <div style={{fontFamily:"Barlow", fontWeight:"bold"}}>{i.venue?.name}</div>
                        <div style={{fontFamily:"Barlow"}}>{i.venue?.full_address}</div>
                    </div>
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