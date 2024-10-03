import { Map, useMap, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";

const Maps = ({events, venues}) => {

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

    return (
    <div className="d-flex justify-content-center">
      <div className="border" style={{height:500, width:"80%"}}>
        <Map mapId="f82e39075e77b12"  defaultZoom={13} defaultCenter={{lat: 43.658749251843645, lng: -79.38865085207193}}>
          {filteredEvents.map( (i, index) =>
          <AdvancedMarker zIndex={markerIndex === index? 1:0} key={index} onMouseEnter={() => handleMouseEnter(index)} 
            onMouseLeave={() => handleMouseLeave(index)} onClick={() => handleClick(i)} 
            position={{lat:i.venue.latitude + i.random?.[0] , lng: i.venue.longitude + i.random?.[1] 
          }}>
            <div ref={e => markerRef.current[index] = e} style={{zIndex:0}}className="p-3 d-flex flex-column align-items-center">
              <div style={{display:"none",height:50,width:50, backgroundColor:"white"}}></div> 
              <i className="bi bi-geo-alt-fill text-danger" style={{zIndex:0,fontSize:"2rem"}}></i>
            </div>
          </AdvancedMarker>)}
      </Map>
    </div>
  </div>)}

export default Maps;