import { Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
const Homepage = () => {
  return (
    <div>Homepage
      1update
      <Link to="/products"><Button>Hi</Button></Link>
    </div>
  )
}

export default Homepage