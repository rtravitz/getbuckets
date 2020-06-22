import React from 'react'
import styles from './InfoView.module.css'
import { DEFAULT } from '../../controlModes'

function InfoView({ setControlMode }) {
  return (
    <div className={styles.container}>
      <p>
        GetBuckets—a joke that may have gone too far—is a place to track portable restrooms in your area. 
        Are you a runner? A cyclist? Often out in public and need a quick stop? This might be the community for you!
      </p>
      <p>
        GetBuckets doesn't record any of your information.
        You can <a href="https://github.com/rtravitz/getbuckets">verify that for yourself</a>, if you're so inclined.
        Anyone can update scores and locations anonymously.
        So like... be cool, okay?
      </p>
      <div className={styles.btnContainer}>
        <button onClick={() => { setControlMode(DEFAULT) }} className={styles.btn}>We cool</button>
      </div>
    </div>
  )
}

export default InfoView
