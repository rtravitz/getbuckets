import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { PlusIcon, InfoIcon } from '@primer/octicons-react'

import './App.css'

const defaultPosition = [47.617396, -122.310563]

function App() {
  const [buckets, setBuckets] = useState([])
  const [fullControls, setFullControls] = useState(false)

  const showFullControls = fullControls ? 'controls-full' : 'controls-slim'

  useEffect(() => {
    axios.get('http://localhost:5000/api/v0/buckets')
      .then((res) => { setBuckets(res.data) })
  }, [])

  return (
    // <Map />
    <div>
      <section className="map">
        <Map center={defaultPosition} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
            {
              buckets.map((bucket) => (
                <Marker key={bucket.id} position={[bucket.lat, bucket.lng]}>
                  <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                </Marker>
              ))
            }
        </Map>
      </section>
      <section className={`controls ${showFullControls}`}>
        <h1 className="controls-header">Get Buckets</h1>
        <div className="controls-topline">
          <InfoIcon size={24} />
            <div onClick={() => { setFullControls(true) }}>
            <PlusIcon size={24} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
