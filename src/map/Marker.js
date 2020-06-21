import L from 'leaflet'
import redIcon from '../assets/redbucket.svg'
import blueIcon from '../assets/bluebucket.svg'

export const redBucketMarker = new L.Icon({
  iconUrl: redIcon,
  iconRetinaUrl: redIcon,
  iconSize: new L.Point(30, 45),
})

export const blueBucketMarker = new L.Icon({
  iconUrl: blueIcon,
  iconRetinaUrl: blueIcon,
  iconSize: new L.Point(30, 45),
})
