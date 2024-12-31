import { DataGrid , GridToolbar} from '@mui/x-data-grid';
import { Box, useTheme } from "@mui/material";
import { useGetAllEmployeesQuery } from '../../../../Features/Employee.jsx';
import { tokens } from "../../theme";
import { Header } from '../../components/Header.jsx';
import './footerbtn.css' 
const ManageEmployee = () => {
  const { data, isLoading, error } = useGetAllEmployeesQuery();
 const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
  if (isLoading) return <p>Loading Employee data...</p>;
  if (error) return <p>Error loading employee: {error.message}</p>;
 
  // Define columns for the DataGrid
  const columns = [
    { field: 'first_name', headerName: 'First Name', width: 100 },
    { field: 'last_name', headerName: 'Last Name', width: 100,
     },
    { field: 'email', headerName: 'Email', width: 100,     },
    { field: 'date_of_birth', headerName: 'DOB', width: 100 },
    { field: 'phone', headerName: 'Phone Number', width: 100 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'department', headerName: 'Department', width: 100 },
    { field: 'date_joined', headerName: 'Date Joined/Hired', width: 100,    },
    { field: 'role', headerName: 'Role', width: 100 },
    { field: 'status', headerName: 'status', width: 100 },
    { field: 'profile_picture', headerName: 'Profile Picture', width: 40 }
  ];

  return (
    <Box m="20px">
     <Header title="Manage Employee" subtitle="Dashboard to Manage Employee" />
      <Box
        sx={{
          height: "auto",
          width: "100%",
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
          getRowId={(row) => row.employee_id} // Ensure the `id` field is used as the unique row identifier
          slots={{
            toolbar: GridToolbar ,
          }}
        />
      </Box>
    </Box>
  );
};

export default ManageEmployee;