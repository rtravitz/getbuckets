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

function RateLockView({ setControlMode, bucketID }) {
  const [selectedOption, setSelectedOption] = useState(LOCKED)
  const [status, setStatus] = useState(RATING)

  const submitRating = async () => {
    try {
      setStatus(SENDING)
      const locked = selectedOption === LOCKED
      const res = await axios.post(`http://localhost:5000/api/v0/buckets/${bucketID}/ratings`, { locked })
      if (res.status === 201) {
        setStatus(SUCCESS)
        setControlMode(SHOW)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const toggleOption = () => {
    if (selectedOption === LOCKED) {
      console.log('togglin')
      setSelectedOption(OPEN)
    } else {
      setSelectedOption(LOCKED)
    }
  }

  const buttonText = status === RATING ? 'Save' : <Loader />

  console.log(selectedOption)

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

