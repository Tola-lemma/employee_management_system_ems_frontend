import React from "react";
import { Box, Skeleton } from "@mui/material";

const DataGridSkeleton = ({ columns = 5, rows = 8 }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "16px",
        }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} height={40} width="100%" />
        ))}
      </Box>
      <Box mt={2}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <Box
            key={rowIndex}
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton
                key={colIndex}
                height={40}
                width="100%"
                variant="rectangular"
              />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DataGridSkeleton;
