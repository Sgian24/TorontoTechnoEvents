import { useEffect, useState } from "react";
import { db } from "../firebase";
import {getDocs, collection} from "firebase/firestore"; 


const Home = () => {

  const [events, setEvents] = useState("")

  useEffect(() => {
    const testing = async () => {
      const eventsArray = []
      const response = await getDocs(collection(db, "events"))
      response.forEach(i => eventsArray.push(i.data()))
      setEvents(eventsArray)  
    }
    testing(); 
  },[])

  return (
    <>
    </>
  );
}

export default Home;