import { Map, useMap, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

const Maps = ({events, venues, selectedDate, setShow, setModalEvent}) => {

    const [markerIndex, setMarkerIndex] = useState(null)

    const map = useMap()
    const markerRef = useRef([])
    const randomNumbers = [Array.from({length:events.length}, () => Math.random() * 0.0005), Array.from({length:events.length}, () => Math.random() * 0.0005)]

    useEffect(() => {
      if (events.length > 0 && randomNumbers) {
       events.forEach((i,index) => i.random = [randomNumbers[0][index],randomNumbers[1][index]])
    }},[events])
  
    const excludedVenues = ["Standard Time", "Sounds Good", "Bambi's", "Cafeteria", "BSMT254", "The Comfort Zone"]
    const filteredEvents = events.sort((a,b) => Date.parse(a.start_time) - Date.parse(b.start_time))
                                             .filter(i => venues.length === 1 && venues.includes("Other") ? !excludedVenues.includes(i.venue.name):
                                                    venues.length > 1 && venues.includes("Other")? !excludedVenues.includes(i.venue.name) || venues.includes(i.venue.name):
                                                    venues.length > 0? venues.includes(i.venue.name): events)
    
    const handleClick = (i) => {
      if (!map) return;
      map?.panTo({lat:i.venue?.latitude, lng:i.venue?.longitude})
    }
  
    const handleMouseEnter = (index) => {
      if (markerRef.current.length > 0)
          markerRef.current[index].children[0].style.display = "block"
          setMarkerIndex(index);
    }

    const handleMouseLeave = (index) => {
      if (markerRef.current.length > 0)
      markerRef.current[index].children[0].style.display = "none"
      setMarkerIndex(null)
    }

    const handleShow = (obj) => {
      setShow(true)
      setModalEvent(obj)
      document.body.classList.remove("overflow-y-scroll")
    }
    
    return (
    <div className="d-flex justify-content-center ">
      <div className="border mt-2" style={{height:500, width:"80%"}}>
        <Map mapId="f82e39075e77b12"  defaultZoom={13} defaultCenter={{lat: 43.658749251843645, lng: -79.38865085207193}}>
          {filteredEvents.filter(j => selectedDate === ""? typeof Date.parse(j) === "number" : Date.parse(new Date(j.start_time).toDateString()) === selectedDate)
          .map( (i, index) =>
          <AdvancedMarker zIndex={markerIndex === index? 1:0} key={index} onMouseEnter={() => handleMouseEnter(index)} 
            onMouseLeave={() => handleMouseLeave(index)} onClick={() => handleClick(i)} 
            position={{lat:i.venue.latitude + i.random?.[0] , lng: i.venue.longitude + i.random?.[1] 
          }}>
            <div  ref={e => markerRef.current[index] = e} style={{zIndex:0}}className=" d-flex flex-column align-items-center">
                <div style={{padding:"0.5rem",fontFamily:"Barlow",borderRadius:"5px", display:"none", height:"auto", width:"15vw", backgroundColor:"white"}}>
                  <div className="fw-bolder mb-1" >{i.name}</div>
                  <span>{i.venue.name + " "}</span>
                  <i class="bi bi-star-fill"></i>
                  <span>{i.venue.rating? " " + i.venue.rating: ""}</span>
                  <br />
                  <span>{new Date(i.start_time).toDateString()}</span><br />
                  <span>{i.start_time?.split(" ")[1]} - {i.end_time?.split(" ")[1]}</span><br />
                  <Button onClick={() => handleShow(i)} variant="outline-primary text-black fw-bold"  className="pt-0 mt-1" style={{fontFamily:"Barlow", height:"1.3rem", fontSize:"0.8rem"}}>Info</Button>
                </div> 
              <i className="bi bi-geo-alt-fill text-danger" style={{zIndex:0,fontSize:"2rem"}}></i>
            </div>
          </AdvancedMarker>)}
      </Map>
    </div>
  </div>)}

export default Maps;