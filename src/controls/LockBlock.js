import React from 'react'
import { LockClosedIcon, LockOpenIcon } from '../Icons'
import styles from './RatingBlock.module.css'

function LockBlock({ rating, numRatings, onClick }) {
  let lockedPercentBlock
  if (numRatings > 0) {

    let icon
    if (rating >= 50) {
      icon = (
        <LockClosedIcon 
          size="30" 
          blockClass={`${styles.rateIconBlock} ${styles.rateIconBad}`}
          svgClass={styles.rateIcon} />
      )
    } else {
      icon = (
        <LockOpenIcon 
          size="30" 
          blockClass={`${styles.rateIconBlock} ${styles.rateIconGood}`}
          svgClass={styles.rateIcon} />
      )
    }

    lockedPercentBlock = (
      <>
        <div className={styles.lockScore}>
          {icon}
          <div>
            <h3>{Math.round(rating)}% </h3>
            <p className={styles.subtext}>report locked</p>
          </div>
        </div>
        <p className={`${styles.subtext} ${styles.numRatingText}`}>Based on {numRatings} ratings</p>
      </>
    )
  } else {
    lockedPercentBlock = <p>No locked ratings yet. Tap to add yours!</p>
  }

  return (
    <div onClick={onClick} className={styles.ratingBlock}>
      <div>
        {lockedPercentBlock}
      </div>
    </div>
  )
}

export default LockBlock

