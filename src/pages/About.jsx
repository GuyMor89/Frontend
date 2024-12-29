import React, { useRef, useState } from "react";
import GoogleMapReact from 'google-map-react';

const Marker = ({ handleLocation, ID }) => <div className="map-icon">
    <img id={ID} onClick={handleLocation} src="toy.svg"></img>
</div>


export function About() {

    const locations = useRef({
        first: { lat: 59.955413, lng: 30.337844 },
        second: { lat: 48.880502738153545, lng: 2.343323408119047 },
        third: { lat: 5.88050, lng: 25.88050 },
        fourth: { lat: 37.227415945284754, lng: -120.8049825736704 },
        fifth: { lat: -5.157385537632528, lng: -45.67433150567287 },
        sixth: { lat: 35.53191760256967, lng: 138.77149928106022 }
    })
    const [currLocation, setCurrLocation] = useState({ lat: 32.37832200859137, lng: 7.978670426287273 })
    const [currZoom, setCurrZoom] = useState(1)

    function handleLocation(event) {
        setCurrLocation(locations.current[event.target.id])
        setCurrZoom(1)
    }

    return (
        <div style={{ height: '600px', width: '100%' }}>

            <div className="locations">
                <h3>Our Locations</h3>
                <section className="about-buttons">
                    <button onClick={() => {
                        setCurrLocation(locations.current.first)
                        setCurrZoom(5)
                    }}>St. Petersburg</button>
                    <button onClick={() => {
                        setCurrLocation(locations.current.second)
                        setCurrZoom(5)
                    }}>Paris</button>
                    <button onClick={() => {
                        setCurrLocation(locations.current.third)
                        setCurrZoom(5)
                    }}>Liberalino</button>
                    <button onClick={() => {
                        setCurrLocation(locations.current.fourth)
                        setCurrZoom(5)
                    }}>Modesto</button>
                    <button onClick={() => {
                        setCurrLocation(locations.current.fifth)
                        setCurrZoom(5)
                    }}>La Ouagou</button>
                    <button onClick={() => {
                        setCurrLocation(locations.current.sixth)
                        setCurrZoom(5)
                    }}>Kawaguchi</button>
                </section>
            </div>

            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                center={currLocation}
                zoom={currZoom}
            >
                <Marker
                    {...locations.current.first}
                    ID={'first'}
                    handleLocation={handleLocation}
                />
                <Marker
                    {...locations.current.second}
                    ID={'second'}
                    handleLocation={handleLocation}
                />
                <Marker
                    {...locations.current.third}
                    ID={'third'}
                    handleLocation={handleLocation}
                />
                <Marker
                    {...locations.current.fourth}
                    ID={'fourth'}
                    handleLocation={handleLocation}
                />
                <Marker
                    {...locations.current.fifth}
                    ID={'fifth'}
                    handleLocation={handleLocation}
                />
                <Marker
                    {...locations.current.sixth}
                    ID={'sixth'}
                    handleLocation={handleLocation}
                />

            </GoogleMapReact>
        </div>
    )
}