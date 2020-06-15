import React from 'react'
import { PlusIcon, InfoIcon } from '@primer/octicons-react'
import CreatingView from './CreatingView'
import { CREATE, DEFAULT } from './controlModes'

function Controls(props) {
  const showFullControls = props.controlMode === DEFAULT ? 'controls-slim' : 'controls-full'
  let controlView
  if (props.controlMode === CREATE) {
    controlView = (
      <CreatingView
        setControlMode={props.setControlMode}
        setBuckets={props.setBuckets}
        setNewBucket={props.setNewBucket}
        newBucket={props.newBucket} />
    )
  }

  return (
    <section className={`controls ${showFullControls}`}>
      <h1 className="controls-header">GetBuckets</h1>
      <div className="controls-topline">
        <InfoIcon size={24} />
        <div
          onClick={() => { props.setControlMode(CREATE) }
          }>
          <PlusIcon size={24} />
        </div>
      </div>
      {controlView}
    </section>
  )
}

export default Controls