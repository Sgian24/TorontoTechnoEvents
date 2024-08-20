import { useEffect, useState } from "react";
import { db } from "../firebase";
import {getDocs, collection} from "firebase/firestore"; 
import Listing from "../Components/Listing";

const Home = () => {

  const [events, setEvents] = useState([])

  useEffect(() => {
    const testing = async () => {
      const eventsArray = []
      const response = await getDocs(collection(db, "events"))
      response.forEach(i => eventsArray.push(i.data()))
      setEvents(eventsArray)  
    }
    testing(); 
  },[])

  console.log("events", events);

  return (
    <>
    <h1 className="text-center mt-5">Toronto Techno Events</h1>
    <Listing events={events}/>
    </>
  );
}

export default Home;