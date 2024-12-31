import { DataGrid , GridToolbar} from '@mui/x-data-grid';
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Header } from '../../components/Header.jsx';
import { useGetAllDepartmentsQuery } from '../../../../Features/Department.jsx';
import DataGridSkeleton from '../../components/Skeleton.jsx';
const Department = () => {
  const { data, isLoading, error } = useGetAllDepartmentsQuery();
 const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
  if (isLoading) return <p>Loading Department data...</p>;
  if (error) return <p>Error loading Department: {error.message}</p>;
 
  // Define columns for the DataGrid
  const columns = [
    { field: 'department_name', headerName: 'Department', width: 100 },
  ];

  return (
    <Box m="20px">
     <Header title="Manage Department" subtitle="Dashboard to Manage Department" />
     {isLoading? <DataGridSkeleton/>:
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
          getRowId={(row) => row.department_id} // Ensure the `id` field is used as the unique row identifier
          slots={{
            toolbar: GridToolbar ,
          }}
        />
      </Box>}     
      {error && <p>Error loading Department: {error?.message}</p>}
    </Box>
  );
};

export default Department;