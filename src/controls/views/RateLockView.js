import React, { useState } from 'react'
import axios from 'axios'

import { SHOW } from '../../controlModes'
import LockedToggle from '../../LockedToggle'
import Loader from '../../Loader'
import styles from './RateLockView.module.css'

const RATING = 'RATING'
const SENDING = 'SENDING'
const SUCCESS = 'SUCCESS'

const LOCKED = 'Locked'
const OPEN = 'Open'

function RateLockView({ setControlMode, bucketID, updateBucket }) {
  const [selectedOption, setSelectedOption] = useState(LOCKED)
  const [status, setStatus] = useState(RATING)

  const submitRating = async () => {
    try {
      setStatus(SENDING)
      const locked = selectedOption === LOCKED
      const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/v0/buckets/${bucketID}/lock`, { locked })
      if (res.status === 201) {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND}/api/v0/buckets/${bucketID}`)
        updateBucket(res.data)
        setStatus(SUCCESS)
        setControlMode(SHOW)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const toggleOption = () => {
    if (selectedOption === LOCKED) {
      setSelectedOption(OPEN)
    } else {
      setSelectedOption(LOCKED)
    }
  }

  const buttonText = status === RATING ? 'Save' : <Loader />

  return (
    <div>
      <div className={styles.container}>
        <LockedToggle onClick={toggleOption} />
      </div>
      <div className={styles.btnRow}>
        <button 
          className={styles.backBtn}
          onClick={() => setControlMode(SHOW)}>Back</button>
        <div 
          className={styles.submitBtn} 
          onClick={submitRating}>{buttonText}</div>
      </div>
    </div>
  )
}

export default RateLockView

