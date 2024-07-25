import React from 'react'
import Navbar from '../Components/Navbar'
import { Box } from '@mui/material'
import Sidenav from '../Components/Sidenav'

const Analytics = () => {
  return (
    <>
    <Navbar/>
    <Box height={70}/>
    <Box sx={{display:"flex"}}>
        <Sidenav/>
        <Box component="main" sx={{flexGrow:1,p:3}}>
            <h1>Analytics</h1>

        </Box>
    </Box>
    </>
  )
}

export default Analytics