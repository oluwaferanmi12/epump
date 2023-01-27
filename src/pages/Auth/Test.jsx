import React, { useContext } from 'react'
import { Store } from '../../context/store'

function Test() {
    const {userPayload , setUserPayload} = useContext(Store)
  return (
    <div>Test</div>
  )
}

export default Test