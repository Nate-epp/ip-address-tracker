import React from 'react'
import { useState, useRef } from 'react'
import axios from 'axios'
import './Fetch.css'


function Fetch({ipDataHandler, ipData}) {

  const inputRef = useRef()
  const [hideInfo, setHideInfo] = useState(false)

  const hideHandler = () => {
    setHideInfo(!hideInfo)
    console.log(hideInfo)
  }

  const fetchIpData = (e) => {
    e.preventDefault()
    const value = inputRef.current.value
    const API_KEY = 'at_FJmAzkYWuS1eWIxjR1XEYP3b92IgU'
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${value}&domain=${value}`
    axios.get(url)
         .then((response)=>{
            ipDataHandler({...ipData, 
                ip: response.data.ip,
                location: {
                    country: response.data.location.country,
                    region: response.data.location.region,
                    timezone: response.data.location.timezone,
                    lat: response.data.location.lat,
                    lng: response.data.location.lng,
                    postalCode: response.data.location.postalCode,
                    city: response.data.location.city
                },
                isp: response.data.isp
            })
            console.log(response, ipData)
         })
         .catch(err => console.log(err))
    inputRef.current.value = ''
  }

  return (
    <div>
        <form className='ip-form' onSubmit={fetchIpData}>
            <input ref={inputRef} placeholder='Search for any IP address or domain' />
            <button type='submit' ></button>
        </form>
        <button onClick={hideHandler} className='hide-btn'>{hideInfo? `Show Info` : 'Hide Info'}</button>
        <div className={`display-grid ${hideInfo? 'hide' : ''}`}>
            
            <div className={`border-right`}>
                <p className='info-tag'>IP ADDRESS</p>
                <span className='info-data'>{ipData.ip}</span>
            </div>
       
            <div className={`border-right`}>
                <p className='info-tag'>LOCATION</p>
                <span className='info-data'>{`${ipData.location.city}, ${ipData.location.region},  ${ipData.location.country} ${ipData.location.postalCode}`}</span>
            </div>
            <div className={`border-right`}>
                <p className='info-tag'>TIMEZONE</p>
                <span className='info-data'>UTC {ipData.location.timezone}</span>
            </div>
            <div className={`last-child`}>
                <p className='info-tag'>ISP</p>
                <span className='info-data'>{ipData.isp}</span>
            </div>
        </div>
    </div>
  )
}

export default Fetch