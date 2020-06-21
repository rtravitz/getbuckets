import React from 'react'
import { HappyIcon, SadIcon } from '../Icons'
import styles from './RatingBlock.module.css'

function CleanBlock({rating, numRatings, onClick}) {
  let cleanRatingBlock
  if (numRatings > 0) {

    let icon
    if (rating > 2.5) {
      icon = (
        <HappyIcon
          size="30"
          blockClass={`${styles.rateIconBlock} ${styles.rateIconGood}`}
          svgClass={styles.rateIcon} />
      )
    } else {
      icon = (
        <SadIcon
          size="30" 
          blockClass={`${styles.rateIconBlock} ${styles.rateIconBad}`}
          svgClass={styles.rateIcon} />
      )
    }

    cleanRatingBlock = (
      <>
        <div className={styles.lockScore}>
          {icon}
          <div>
            <h3>{rating}</h3>
            <p className={styles.subtext}>cleanliness</p>
          </div>
        </div>
        <p className={`${styles.subtext} ${styles.numRatingText}`}>Based on {numRatings} ratings</p>
      </>
    )
  } else {
    cleanRatingBlock = <p>No cleanliness ratings yet. Tap to add yours!</p>
  }
  
  return (
    <div onClick={onClick} className={styles.ratingBlock}>
      <div>
        {cleanRatingBlock}
      </div>
    </div>
  )
}

export default CleanBlock

