import { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import {getDocs, collection} from "firebase/firestore"; 
import Listing from "../Components/Listing";
import Filter from "../Components/Filter";
import Maps from "../Components/Map";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Container, Modal, Button } from "react-bootstrap";

const Home = () => {

  const [events, setEvents] = useState([])
  const [venues, setVenues] = useState([])
  const [selectedDate, setSelectedtDate] = useState("")
  const [dates, setDates] = useState([])
  const [display, setDisplay] = useState("list")
  const [modalEvent, setModalEvent] = useState({})
  const [show, setShow] = useState(false)

  const descriptionRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      const eventsArray = []
      const response = await getDocs(collection(db, "events"))
      response.forEach(i => eventsArray.push(i.data()))
      setEvents(eventsArray)
    }
    fetchData(); 
  },[])

  useEffect(() => {
    if (descriptionRef.current !== null ) {
        descriptionRef.current.innerHTML = modalEvent.description? modalEvent.description?.split("\n").join(`<br />`)
        .replace(/[\u0000-\u001F\u007F-\u009F]|b\u0000/g,"").replace("&",`... <a href="${modalEvent.link}" target=_blank>Read More</a>`):""
}},[show])


  const handleClose = () => {
    setShow(false)
    const add = () => document.body.classList.add("overflow-y-scroll")
    setTimeout(add, 500)
  }

  return (
    <Container className="px-0" fluid>
       <Modal size="md" show={show} onHide={handleClose} >
          <Modal.Header style={{ fontFamily:"Barlow"}} closeButton><h4 style={{fontWeight:"bold"}}>{modalEvent?.name}</h4></Modal.Header>
          <Modal.Body>
            <div style={{fontFamily:"Barlow"}}>
              <span style={{fontWeight:"bold"}}>Venue:</span><br/><span>{modalEvent.venue?.name}</span><br/>
              <span>{modalEvent.venue?.full_address}</span>
            </div>
            <div style={{fontFamily:"Barlow"}}>
              <span style={{fontWeight:"bold"}}>Date:</span><br/><span>{new Date(modalEvent.start_time).toDateString()}</span><br/>
              <span>{modalEvent.start_time?.split(" ")[1]} - {modalEvent.end_time?.split(" ")[1]}</span>
            </div>
            <br />
            <p ref={descriptionRef}></p>
            <Button style={{fontFamily:"Barlow",fontWeight:"bold", color:"black"}} variant="outline-primary" target="_blank" href={modalEvent.ticket_links? modalEvent.ticket_links[0].link: modalEvent.link}>Tickets</Button> 
          </Modal.Body>
      </Modal>
    <div className="d-flex flex-column justify-content-center">
      <h1 className="text-center mt-5" style={{fontFamily:"Nudista"}}>TORONTO TECHNO EVENTS</h1>
      <p className="text-center">A listing of upcoming techno and techno adjacent events in Toronto.</p>
      <Filter display={display} setDisplay={setDisplay} dates={dates} selectedDate={selectedDate} setSelectedDate={setSelectedtDate} venues={venues} setVenues={setVenues} events={events} />
      {display === "list"? 
        <Listing setEvents={setEvents} dates={dates} setDates={setDates} selectedDate={selectedDate} show={show} setShow={setShow} 
        setSelectedDate={setSelectedtDate} venues={venues} setVenues={setVenues} events={events} modalEvent={modalEvent} setModalEvent={setModalEvent}/>:
        <APIProvider apiKey={`${process.env.REACT_APP_MAPS_API_KEY}`}>
          <Maps selectedDate={selectedDate} events={events} venues={venues} modalEvent={modalEvent} setModalEvent={setModalEvent} setShow={setShow} />
        </APIProvider>}
      </div>
      <p className="sunny mt-3 text-center">Designed and developed by Sunny Gian.</p>
    </Container>
  );
}

export default Home;