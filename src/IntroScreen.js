import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import redBucket from './assets/redbucket.svg'
import styles from './IntroScreen.module.css'

function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [position.coords.latitude, position.coords.longitude]
          resolve(coords)
        },
        (err) => { reject(err) }
      )
    } else {
      reject({ code: 99, message: 'geolocation not supported by browser' })
    }
  })
}

function getPermissionStatus() {
  return navigator.permissions.query({ name: 'geolocation' })
}

const defaultCenter = [47.617396, -122.310563]

function IntroScreen({ setStartingCenter }) {
  const [showPrompt, setShowPrompt] = useState(false)
  const [loading, setLoading] = useState(false)

  const setCoords = () => {
    getLocation()
      .then((coords) => { setStartingCenter(coords); setLoading(true) })
      .catch((err) => {
        // User has denied location
        if (err.code === 1) {
          setStartingCenter(defaultCenter)
        } else {
          setStartingCenter(defaultCenter)
        }
      })
  }

  useEffect(() => {
    getPermissionStatus()
      .then(status => {
        console.log('status', status)
        const { state } = status
        if (state === 'prompt') {
          //noop
        } else if (state === 'granted') {
          setCoords()
        } else if (state === 'denied') {
          setStartingCenter(defaultCenter)
        } else {
          setStartingCenter(defaultCenter)
        }
      })
      .catch((err) => {
        console.log(err)
        setStartingCenter(defaultCenter)
      })
  }, [])

  useEffect(() => {
    const promptTimer = setTimeout(() => {
      setShowPrompt(true)
    }, 1000)

    return () => { clearTimeout(promptTimer) }
  }, [])

  return (
    <div className={styles.container}>
      {
        loading && <Loader />
      }
      {
        showPrompt && !loading &&
        <section className={styles.promptContainer}>
          <div className={styles.headerBox}>
            <div className={styles.headerTextSet}>
              <h3 className={styles.subhead}>Welcome to</h3>
              <h1 className={styles.header}>GetBuckets</h1>
            </div>
            <div className={styles.bucketBox}>
              <img src={redBucket} alt="Red portable toilet" className={styles.bucket} />
            </div>
          </div>
          <div className={styles.copyBox}>
            <p>There are a couple of things to know as you get started...</p>
            <p>
              First, this app will work in your browser, but it's a Progressive Web App
              and the experience is best if you install it to your device's homescreen.
            </p>
            <p>
              The app will also ask for location permissions to start the map off in
              a useful spot. If that's not your jam, the app will just start you off
              in Seattle, Washington.
            </p>
            <div className={styles.btnBox}>
              <button
                onClick={setCoords}
                className={styles.btn}>Let's GetBuckets!</button>
            </div>
          </div>
        </section >
      }
    </div>
  )
}

export default IntroScreen
