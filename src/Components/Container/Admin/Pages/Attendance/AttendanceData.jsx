import React from 'react'
import DataGridSkeleton from '../../components/Skeleton';
import { Header } from '../../components/Header';
import { DataGrid , GridToolbar} from '@mui/x-data-grid';
import { useGetAttendanceQuery } from "../../../../Features/Attendance";
import { Box, useTheme,Modal } from '@mui/material';
import { tokens } from '../../theme';
const AttendanceData = ({open, onClose})=> {
      const { data, isLoading } = useGetAttendanceQuery();
       const theme = useTheme();
      const colors = tokens(theme.palette.mode);
  const columns = [
            { field: 'employee_name', headerName: 'Employee Name', width: 100 },
            { field: 'check_in_time', headerName: 'check in time', width: 100, },
            { field: 'check_out_time', headerName: 'check out time', width: 100, },
            { field: 'date', headerName: 'Date', width: 100, },
            { field: 'status', headerName: 'status', width: 100, },
            
          ];
  return (
      <Modal open={open} onClose={onClose}>
     <Box
             sx={{
               position: 'absolute',
               top: '50%',
               left: '50%',
               transform: 'translate(-50%, -50%)',
               bgcolor: 'white',
               p: 4,
               borderRadius: 2,
               boxShadow: 24,
               width: 700,
               overflow:'hidden'
             }}
           >
     <Header title="Employee Attendance Record" subtitle="You can see Employee Attendance records here" />
     {isLoading? <DataGridSkeleton/> :<>
      <Box
        sx={{
          height: 400, 
          width: '100%',
          "& .css-15n4jlm-MuiDataGrid-root .MuiDataGrid-container--top, .css-15n4jlm-MuiDataGrid-root .MuiDataGrid-container--bottom":
            {
              backgroundColor: "red",
              color: "black",
              fontSize: "1rem",
              borderBottom: "none",
            },
          "& .css-15n4jlm-MuiDataGrid-root": {
            backgroundColor: "burlywood",
            color: "black",
          },
          "& .css-1knaqv7-MuiButtonBase-root-MuiButton-root": {
            color: "black",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: `${colors.primary[12]}`,
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: `${colors.greenAccent[700]}`,
          },
          "& .MuiDataGrid-toolbarContainer > button,.css-128fb87-MuiDataGrid-toolbarContainer > button": {
            borderTop: "none",
            color:`${colors.grey[100]}`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          getRowId={(row) => row.attendance_id} // Ensure the `id` field is used as the unique row identifier
          slots={{
            toolbar: GridToolbar ,
          }}
        />
      </Box>
      </>
      }     
    </Box>
    </Modal>
  )
}

export default AttendanceData