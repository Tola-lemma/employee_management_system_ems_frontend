import React from "react";
import { Box, Skeleton } from "@mui/material";

const FormSkeleton = ({ isNonMobile }) => {
  return (
    <Box
      display="grid"
      gap="30px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      
      <Skeleton variant="rectangular" height={55} sx={{ gridColumn: "span 2" }} />
      
     
      <Skeleton variant="rectangular" height={55} sx={{ gridColumn: "span 2" }} />
      
     
      <Skeleton variant="rectangular" height={55} sx={{ gridColumn: "span 2" }} />
      
   
      <Skeleton variant="rectangular" height={55} sx={{ gridColumn: "span 2" }} />
      
    
      <Skeleton variant="rectangular" height={55} sx={{ gridColumn: "span 2" }} />
      
      
      <Skeleton variant="rectangular" height={55} sx={{ gridColumn: "span 2" }} />
      
     
      <Skeleton variant="rectangular" height={55} sx={{ gridColumn: "span 2" }} />
      
    
      <Skeleton variant="rectangular" height={55} sx={{ gridColumn: "span 2" }} />
      
    
      <Skeleton variant="rectangular" height={55} sx={{ gridColumn: "span 2" }} />
      
     
      <Box display="flex" justifyContent="end" mt="20px" sx={{ gridColumn: "span 4" }}>
        <Skeleton variant="rectangular" height={40} width={200} />
      </Box>
    </Box>
  );
};

export default FormSkeleton;
