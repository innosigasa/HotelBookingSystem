import React from 'react'
import error from '../Images/error400.jpg'

export default function Error () {
  return (
    <div>
        <h1>Error Page not found</h1>
        <img src={error} alt="alternatetext" style={{width:"50%",}}></img>
    </div>
  )
}
