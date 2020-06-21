import React, { useState } from 'react'
import axios from 'axios'
import styles from './RateCleanView.module.css'
import { HappyIcon, SadIcon } from '../../Icons'
import Loader from '../../Loader'

import { SHOW } from '../../controlModes'

const RATING = 'RATING'
const SENDING = 'SENDING'
const SUCCESS = 'SUCCESS'

function RateCleanView({ bucketID, setControlMode, updateBucket }) {
  const [rating, setRating] = useState("3")
  const [status, setStatus] = useState(RATING)
  const submitRating = async () => {
    try {
      setStatus(SENDING)
      const numRating = parseInt(rating)
      const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/v0/buckets/${bucketID}/clean`, {
        score: numRating,
      })
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

  const optionCheck = (val) => {
    if (val === rating) {
      return `${styles.option} ${styles.selected}`
    }

    return styles.option
  }

  const buttonText = status === RATING ? 'Save' : <Loader />

  return (
    <div>
      <div className={styles.optionContainer}>
        <SadIcon size="24" />
        <div 
          className={optionCheck(1)}
          onClick={() => { setRating(1) }}>1</div>
        <div 
          className={optionCheck(2)}
          onClick={() => { setRating(2) }}>2</div>
        <div 
          className={optionCheck(3)}
          onClick={() => { setRating(3) }}>3</div>
        <div 
          className={optionCheck(4)}
          onClick={() => { setRating(4) }}>4</div>
        <div 
          className={optionCheck(5)}
          onClick={() => { setRating(5) }}>5</div>
        <HappyIcon size="24" />
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

export default RateCleanView
