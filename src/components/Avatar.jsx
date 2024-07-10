import React from 'react'
import reactLogo from '../assets/react.svg'

function Avatar({imgUrl}) {
  return (
    <div className="avatar">
    <div className="w-16 rounded-full">
      { !imgUrl && <img src={reactLogo}/>}
      { imgUrl && imgUrl?.startsWith('blob')
        ? <img src={ imgUrl  } />
        : <img src={imgUrl ? `http://localhost:8888${imgUrl}?${Math.random()}` : reactLogo} />
      }

    </div>
  </div>
  )
}

export default Avatar