import React from 'react'
import styles from './RatingBlock.module.css'

function CleanBlock({rating, numRatings, onClick}) {
  let cleanRating
  if (numRatings > 0) {
    cleanRating = (
      <>
        <h3>{rating}</h3>
        <p>cleanliness</p>
        <span>based on {numRatings} ratings</span>
      </>
    )
  } else {
    cleanRating = <p>No ratings yet</p>
  }
  
  return (
    <div onClick={onClick} className={styles.ratingBlock}>
      {cleanRating}
    </div>
  )
}

export default CleanBlock

