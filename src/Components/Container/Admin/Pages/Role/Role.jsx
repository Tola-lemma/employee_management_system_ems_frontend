import { DataGrid , GridToolbar} from '@mui/x-data-grid';
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { Header } from '../../components/Header.jsx';
import { useGetAllRolesQuery } from '../../../../Features/Role.jsx';
import DataGridSkeleton from '../../components/Skeleton.jsx';
const Role = () => {
  const { data, isLoading, error } = useGetAllRolesQuery();
 const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  // Define columns for the DataGrid
  const columns = [
    { field: 'role_name', headerName: 'Role/Permission', width: 100 },
  ];

  return (
    <Box m="20px">
     <Header title="Manage Role" subtitle="Dashboard to Manage Role" /> 
     {isLoading? <DataGridSkeleton/>:<>
     <Typography variant="body1" color="error.main" sx={{fontSize:16,fontStyle:"italic", fontWeight:"bold"}}>NB. Permission is based on role.</Typography>
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
          getRowId={(row) => row.role_id} // Ensure the `id` field is used as the unique row identifier
          slots={{
            toolbar: GridToolbar ,
          }}
        />
      </Box>
      </>}
      {error && <p style={{color:"red",fontSize:16}}>Error loading Role: {error?.message}</p>}
    </Box>
  );
};

export default Role;