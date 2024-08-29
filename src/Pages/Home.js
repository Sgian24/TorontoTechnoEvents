import { useEffect, useState } from "react";
import { db } from "../firebase";
import {getDocs, collection} from "firebase/firestore"; 
import Listing from "../Components/Listing";
import Filter from "../Components/Filter";

const Home = () => {

  const [events, setEvents] = useState([])
  const [venues, setVenues] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const eventsArray = []
      const response = await getDocs(collection(db, "events"))
      response.forEach(i => eventsArray.push(i.data()))
      setEvents(eventsArray)  
    }
    fetchData(); 
  },[])
  

  console.log("events", events);

  return (
    <>
    <h1 className="text-center mt-5">Toronto Techno Events</h1>
    <Filter venues={venues} setVenues={setVenues} events={events} />
    <Listing venues={venues} setVenues={setVenues} events={events}/>
    </>
  );
}

export default Home;