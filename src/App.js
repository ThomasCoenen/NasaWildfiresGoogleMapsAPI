import { useState, useEffect } from 'react'
import './App.css';
import Header from './Header';
import Map from './Map';

function App() {
  const [eventData,setEventData] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    const fetchEvents = async()=>{
      setLoading(true)
      const res = await fetch('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events')
      
      const {events} = await res.json()
      setEventData(events)
      setLoading(false)
    }
    fetchEvents()
  },[])

  console.log(eventData)

  return (
    <div className="App"> 
      <Header/>
      {!loading ? <Map eventData={eventData}/> : <h1>Loading</h1>}
    </div>
  );
}

export default App;
