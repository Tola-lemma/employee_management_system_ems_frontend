import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton } from "@mui/material";

const AttendanceSkeleton = ({ daysInMonth }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee Name</TableCell>
            {Array.from({ length: daysInMonth }).map((_, i) => (
              <TableCell key={i + 1} align="center">
                <Skeleton variant="text" width={20} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>
                <Skeleton variant="text" width={100} />
              </TableCell>
              {Array.from({ length: daysInMonth }).map((_, colIndex) => (
                <TableCell key={colIndex} align="center">
                  <Skeleton variant="rectangular" width={24} height={24} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttendanceSkeleton;
