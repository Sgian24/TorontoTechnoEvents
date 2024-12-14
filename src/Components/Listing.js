import { useEffect, useRef} from "react";
import {Container, Row, Col} from "react-bootstrap";


const Listing = ({dates, setDates, events, venues, selectedDate, modalEvent, setModalEvent, show, setShow}) => {

    const descriptionRef = useRef(null)
    const excludedVenues = ["Standard Time", "Sounds Good", "Bambi's", "CAFETERIA", "BSMT254"]
    const filteredEvents = events.sort((a,b) => Date.parse(a?.start_time) - Date.parse(b?.start_time))
                                             .filter(i => venues.length === 1 && venues.includes("Other") ? !excludedVenues.includes(i.venue.name):
                                                    venues.length > 1 && venues.includes("Other")? !excludedVenues.includes(i.venue.name) || venues.includes(i.venue.name):
                                                    venues.length > 0? venues.includes(i.venue.name): events)
    const eventValues = []

    useEffect(() => {
            const startTimes = []
            if (events.length > 0) {
            filteredEvents.forEach(i => startTimes.push(i.start_time))
            setDates(startTimes)
            }
    },[events,venues])               

    useEffect(() => {
        if (descriptionRef.current !== null ) {
            descriptionRef.current.innerHTML = modalEvent.description? modalEvent.description?.split("\n").join(`<br />`)
            .replace(/[\u0000-\u001F\u007F-\u009F]|b\u0000/g,"").replace("&",`... <a href="${modalEvent.link}" target=_blank>Read More</a>`):""
    }},[show])

    const handleShow = (obj) => {
        setShow(true)
        setModalEvent(obj)
        if (window.innerHeight <= document.body.scrollHeight) {
            document.getElementsByTagName("html")[0].style.scrollbarGutter = "auto";
        } else {
            document.getElementsByTagName("html")[0].style.scrollbarGutter = "stable"
        }
        document.body.classList.remove("overflow-y-scroll")
    }

    filteredEvents.map(i => Object.values(i).map(j => eventValues.push(j)));
    console.log(events);
    return (
     <>
        <Container className="d-flex flex-column align-items-center">
        {dates.filter((j,index) => selectedDate === ""? dates.indexOf(j) === index && typeof Date.parse(j) === "number"
         && eventValues.includes(j)
         : dates.indexOf(j) === index && eventValues.includes(j) && Date.parse(new Date(j).toDateString()) === selectedDate ).map( k =>  
         <ul className="px-0">
         <h3 className="mt-2">{new Date(k).toDateString().toUpperCase()}</h3>
         {filteredEvents.filter(i => k === i.start_time).map(i =>
          <li className="mb-2">
            <Row onClick={() => handleShow(i)} className="list-row d-flex justify-content-between border gx-2" >
                <Col className="d-flex flex-column justify-content-center h-100 ps-0 pe-0 " xs={2} sm={3} xl={3}>  
                    {i.thumbnail? <img className="thumbnail object-fit-cover " src={i.thumbnail} height="100%" width="100%"></img>
                                 :<i className="thumbnail-placeholder bi bi-images text-center"></i>}
                </Col>
                <Col className="info-col d-flex flex-column justify-content-center justify-content-sm-between ps-3 pe-4 pt-2 pb-2 " xs={8} sm={9} xl={9}>
                    <h5 className="event-name fw-bold">{i.name}</h5>
                    <div className="d-flex flex-column justify-content-center">
                        <div className="listing-font">{i.start_time?.split(" ")[1]} - {i.end_time?.split(" ")[1]}</div>
                        <div className="listing-font fw-bold">{i.venue?.name}</div>
                        <div className="listing-font d-none d-sm-block">{i.venue?.full_address}</div>
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