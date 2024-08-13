import React from 'react'

export default function Helmet(props) {
    document.title=`Shop.com-${props.title}`
  return (
    <div>
        {props.children}
    </div>
  )
}
