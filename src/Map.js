import React,{useState} from 'react'
import GoogleMapReact from 'google-map-react'
import './App.css';
import LocationMarker from './LocationMarker';
import InfoBox from './InfoBox';
import dotenv from 'dotenv';
dotenv.config(); 

Map.defaultProps = {
    center: {
        lat: 34.817696,
        lng: -111.841219
      },
      zoom: 5
}

export default function Map({eventData, center, zoom}) {
    const [locationInfo,setLocationInfo] = useState(null)

    const markers = eventData.map(item=>{
        if(item.categories[0].id === 8){ //check for wildfires (id=8(widfires))
            return (
                <LocationMarker 
                    lat={item.geometries[0].coordinates[1]} 
                    lng={item.geometries[0].coordinates[0]}
                    onClick={()=>setLocationInfo({id:item.id, title:item.title, date: item.geometries[0].date})}
                />
            )
        }
        return null
    })

    return (
        <div className="map"> 
            <GoogleMapReact  //place your google API key in ENV file
                bootstrapURLKeys={{key: ''}}
                defaultCenter={center}
                defaultZoom={zoom}
            >   
                {markers}

            </GoogleMapReact>

            {locationInfo && <InfoBox info={locationInfo} />}
        </div>
    )
}
