import { useEffect, useState } from "react";
import { db } from "../firebase";
import {getDocs, collection} from "firebase/firestore"; 
import Listing from "../Components/Listing";
import Filter from "../Components/Filter";
import Maps from "../Components/Map";
import { APIProvider } from "@vis.gl/react-google-maps";

const Home = () => {

  const [events, setEvents] = useState([])
  const [venues, setVenues] = useState([])
  const [selectedDate, setSelectedtDate] = useState("")
  const [dates, setDates] = useState([])
  const [display, setDisplay] = useState("list")

  
  useEffect(() => {
    const fetchData = async () => {
      const eventsArray = []
      const response = await getDocs(collection(db, "events"))
      response.forEach(i => eventsArray.push(i.data()))
      setEvents(eventsArray)
    }
    fetchData(); 
  },[])

  return (
    <div className="d-flex flex-column justify-content-center">
    <h1 className="text-center mt-5" style={{fontFamily:"roboto"}}>TORONTO TECHNO EVENTS</h1>
    <p className="text-center">A listing of upcoming techno and techno adjacent events in Toronto.</p>
    <Filter display={display} setDisplay={setDisplay} dates={dates} selectedDate={selectedDate} setSelectedDate={setSelectedtDate} venues={venues} setVenues={setVenues} events={events} />
    {display === "list"? <Listing setEvents={setEvents} dates={dates} setDates={setDates} selectedDate={selectedDate} setSelectedDate={setSelectedtDate} venues={venues} setVenues={setVenues} events={events}/>:
    <APIProvider apiKey={`${process.env.REACT_APP_MAPS_API_KEY}`}>
       <Maps selectedDate={selectedDate} events={events} venues={venues} />
    </APIProvider>}
    </div>
  );
}

export default Home;