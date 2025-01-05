import { DataGrid , GridToolbar} from '@mui/x-data-grid';
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { Header } from '../../components/Header.jsx';
import { useCreateRoleMutation, useDeleteRoleMutation, useGetAllRolesQuery, useUpdateRoleMutation } from '../../../../Features/Role.jsx';
import DataGridSkeleton from '../../components/Skeleton.jsx';
import { useContext, useState } from 'react';
import DeleteModal from '../../components/RoleModal/DeleteModal.jsx';
import EditModal from '../../components/RoleModal/EditModal.jsx';
import CreateModal from '../../components/RoleModal/CreateModal.jsx';
import ViewModal from '../../components/RoleModal/ViewModal.jsx';
import { ErrorContext } from '../../ToastErrorPage/ErrorContext.jsx';
const Role = () => {
  const { data, isLoading, error, refetch } = useGetAllRolesQuery();
  const [updateRole] = useUpdateRoleMutation();
  const [createRole] = useCreateRoleMutation();
  const [deleteRole] = useDeleteRoleMutation();
  const { showSuccess, showError } = useContext(ErrorContext)
 const theme = useTheme();
    const colors = tokens(theme.palette.mode);
      const [modalState, setModalState] = useState({
          action: null,
          open: false,
          role: null,
        });
      
        const handleModalOpen = (action, role) => {
          setModalState({ action, open: true, role });
        };
      
        const handleModalClose = () => {
          setModalState({ action: null, open: false, role: null });
        };
      
        const handleEdit =async (updatedRole) => {
          try {
            const result =  await updateRole(updatedRole).unwrap()
                 if(result?.status==='success'){
                  showSuccess(result?.message)
                  refetch()
                 }
                 else{
                  showError('Unable to update Role '+result?.error.message)
                 }
          } catch (error) {
            showError('Unable to update Role  '+  error?.data ? error?.data?.message : error?.error)
          }      
        };
        const handleCreate =async (CreatedRole) => {
          try {
            const result =  await createRole(CreatedRole).unwrap()
                 if(result?.status==='success'){
                  showSuccess(result?.message)
                  refetch()
                 }
                 else{
                  showError('Unable to create Role '+result?.error.message)
                 }
          } catch (error) {
            if (error?.status===500) {
              showError('Unable Create Role  ' + error?.data?.error)}
              else{
                showError('Unable create Role  ' + error?.data ? error?.data?.message : error?.error)
              }
          }      
        };
      
        const handleDelete = async (roleId) => {
          try {
            const result =  await deleteRole(roleId).unwrap()
                 if(result?.status==='success'){
                  showSuccess(result?.message)
                  refetch()
                 }
                 else{
                  showError('Unable to delete Role '+result?.error.message)
                 }
          } catch (error) {
            showError('Unable to delete Role  ' + error?.data ? error?.data?.message : error?.error)
          }     
        };
  // Define columns for the DataGrid
  const columns = [
    { field: 'role_name', headerName: 'Role/Permission', width: 300 },
    {
      field:'action', headerName:'Action',headerAlign:'center',width:300,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px",justifyContent: "center" }}>
          {/* <button
           type="button"
           className="btn btn-secondary"
           onClick={() => handleModalOpen("Create")}
          >
            Create
          </button> */}
          <button
           type="button"
           className="btn btn-primary"
           onClick={() => handleModalOpen("View", params.row)}
          >
            View
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => handleModalOpen("Edit", params.row)}
          >
            Edit
          </button>
          <button
           type="button"
           className="btn btn-danger"
           onClick={() => handleModalOpen("Delete", params.row)}
          >
            Delete
          </button>
        </div>
      ),
    }
  ];

  return (
    <Box m="20px">
     <Header title="Manage Role" subtitle="Dashboard to Manage Role" /> 
     {isLoading? <DataGridSkeleton/>:<>
      <Box display={'flex'} justifyContent={'right'} mb={2} mr={8}>
          <button
           type="button"
           className="btn btn-secondary"
           onClick={() => handleModalOpen("Create")}
           style={{borderRadius:"20px" ,textAlign:"center"}}
          >
            Create Role
          </button>
      </Box>
     <Typography variant="body1" color="error.main" sx={{fontSize:16,fontStyle:"italic", fontWeight:"bold"}}>NB. Permission is based on role, so careful when you assign role to New Employee.</Typography>
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
      {modalState.action === 'View' && (
        <ViewModal
          open={modalState.open}
          onClose={handleModalClose}
          role={modalState.role}
        />
      )}
      {modalState.action === 'Create' && (
        <CreateModal
          open={modalState.open}
          onClose={handleModalClose}
          onCreate={handleCreate}
        />
      )}
      {modalState.action === 'Edit' && (
        <EditModal
          open={modalState.open}
          onClose={handleModalClose}
          role={modalState.role}
          onEdit={handleEdit}
        />
      )}
      {modalState.action === 'Delete' && (
        <DeleteModal
          open={modalState.open}
          onClose={handleModalClose}
          role={modalState.role}
          onDelete={handleDelete}
        />
      )}
      </Box>
      </>}
      {error && <p style={{color:"red",fontSize:16}}>Error loading Role: {error?.error}</p>}
    </Box>
  );
};

export default Role;