import { Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Underconstruction = () => {
      const navigate = useNavigate()
  return (
    <Box m={"20px"}>
      <button style={{marginLeft:"600px",fontSize:"20px",padding:"5px",borderRadius:"20px"}} className="btn btn-primary" onClick={()=>navigate("/home")}>Go back to Home</button>
      <Typography variant="body2" sx={{fontSize:"20px",fontStyle:"italic"}} color="initial">Coming Soon!</Typography>
      <img style={{width:"70%" ,height:"600px",marginLeft:"200px" }} src="https://www.emigration.gov.eg/DefaultEn/images/website%20under%20construction.jpg" alt="UnderConstruction"/>
    </Box>
  )
}
