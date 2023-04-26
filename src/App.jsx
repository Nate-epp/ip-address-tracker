import { useState } from 'react'
import './App.css'
import Fetch from './components/Fetch'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'

function App() {


  const customIcon = new Icon({
    iconUrl: '/images/icon-location.svg',
    iconSize: [46, 56],
  })

  const [ipData, setIpData] = useState({
    ip: "-",
    location: {
        country: "-",
        region: "-",
        timezone: "-- --",
        lat: "37",
        lng: "-122",
        postalCode: "",
        city: "-"
    },
    isp: "-" 
  })

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.flyTo(center, zoom, {duration: 2});
    return null;
  }


  // const [position, setPosition] = useState(null)
  const position = [ipData.location.lat, ipData.location.lng]
  const ipDataHandler = (info) => {
      setIpData(info)
  }

  

  return (
    <>
        <div className='background'>
            <h2 className='header'>IP Address Tracker</h2>
            <Fetch ipDataHandler={ipDataHandler} ipData={ipData} />
        </div>
        <div className='map'>
            <MapContainer  zoomControl={false} center={position} zoom={13}>
                <TileLayer 
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'         
                />
                <ChangeView center={position} zoom={13} />
                <Marker position={position} icon={customIcon} alt='marker'>
                    <Popup>
                      Lat: {position[0]}<br />  Long: {position[1]}
                    </Popup>
                </Marker> 
                
                
            </MapContainer>
            {/* <div className="attribution">
                Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
                Coded by <a href="#">Nate Epp</a>.
            </div> */}
        </div>
    </>
  )
}

export default App
