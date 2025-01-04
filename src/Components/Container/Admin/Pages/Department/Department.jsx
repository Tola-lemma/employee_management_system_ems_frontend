import { DataGrid , GridToolbar} from '@mui/x-data-grid';
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Header } from '../../components/Header.jsx';
import { useCreateDepartmentMutation, useDeleteDepartmentMutation, useGetAllDepartmentsQuery, useUpdateDepartmentMutation } from '../../../../Features/Department.jsx';
import DataGridSkeleton from '../../components/Skeleton.jsx';
import ViewDepartment from '../../components/DepartmentModal/ViewModal.jsx';
import EditDepartment from '../../components/DepartmentModal/EditModal.jsx';
import DeleteDepartment from '../../components/DepartmentModal/DeleteModal.jsx';
import { useContext, useState } from 'react';
import { ErrorContext } from '../../ToastErrorPage/ErrorContext.jsx';
import CreateModal from '../../components/DepartmentModal/CreateModal.jsx';
import { useGetAllEmployeesQuery } from '../../../../Features/Employee.jsx';
const Department = () => {
  const { data, isLoading, error,refetch } = useGetAllDepartmentsQuery();
  const [updateDepartment] = useUpdateDepartmentMutation();
  const [createDepartment] = useCreateDepartmentMutation();
  const [deleteDepartment] = useDeleteDepartmentMutation();
  const { data: employeeData } = useGetAllEmployeesQuery();
  const { showSuccess, showError } = useContext(ErrorContext)
 const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [modalState, setModalState] = useState({
      action: null,
      open: false,
      department: null,
    });
  
    const handleModalOpen = (action, department) => {
      setModalState({ action, open: true, department });
    };
  
    const handleModalClose = () => {
      setModalState({ action: null, open: false, department: null });
    };
  
    const handleEdit =async (updatedDepartment) => {
      try {
        const result =  await updateDepartment(updatedDepartment).unwrap()
             if(result?.status==='success'){
              showSuccess(result?.message)
              refetch()
             }
             else{
              showError('Unable to update Department'+result?.error.message)
             }
      } catch (error) {
        showError('Unable to update Department  '+  error?.data ? error?.data?.message : error?.error)
      }      
    };
    const handleCreate =async (CreatedDepartment) => {
      try {
        const result =  await createDepartment(CreatedDepartment).unwrap()
             if(result?.status==='success'){
              showSuccess(result?.message)
              refetch()
             }
             else{
              showError('Unable to create Department'+result?.error.message)
             }
      } catch (error) {
        if (error?.status===500) {
          showError('Unable Create department  ' + error?.data?.error)}
          else{
            showError('Unable create department  ' + error?.data ? error?.data?.message : error?.error)
          }}      
    };
  
    const handleDelete = async (departmentId) => {
      try {
        const result =  await deleteDepartment(departmentId).unwrap()
             if(result?.status==='success'){
              showSuccess(result?.message)
              refetch()
             }
             else{
              showError('Unable to delete Department'+result?.error.message)
             }
      } catch (error) {
        showError('Unable to delete Department ' + error?.data ? error?.data?.message : error?.error)
      }     
    };
//department manager
const departmentManagers = {};
  if (employeeData) {
    employeeData?.forEach((employee) => {
      const { department, role, first_name, last_name } = employee;
      if (role === 'manager') {
        if (!departmentManagers[department]) {
          departmentManagers[department] = [];
        }
        departmentManagers[department].push(first_name +" " + last_name);
      }
    });
  }

  const columns = [
    { field: 'department_name', headerName: 'Department', width: 300 },
    { field: 'department_head', headerName: 'Department Head', width: 300,
      renderCell: (params) => {
        const managers = departmentManagers[params?.row.department_name] || [];
        return managers.length > 0 ? managers.join(' and ') : 'N/A';
      }
     },
    {
      field:'action', headerName:'Action',headerAlign:'center',width:300,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px",justifyContent: "center" }}>
          <button
           type="button"
           className="btn btn-secondary"
           onClick={() => handleModalOpen("Create")}
          >
            Create
          </button>
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
     <Header title="Manage Department" subtitle="Dashboard to Manage Department" />
     {isLoading? <DataGridSkeleton/> :<>
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
           {modalState.action === 'View' && (
        <ViewDepartment
          open={modalState.open}
          onClose={handleModalClose}
          department={modalState.department}
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
        <EditDepartment
          open={modalState.open}
          onClose={handleModalClose}
          department={modalState.department}
          onEdit={handleEdit}
        />
      )}
      {modalState.action === 'Delete' && (
        <DeleteDepartment
          open={modalState.open}
          onClose={handleModalClose}
          department={modalState.department}
          onDelete={handleDelete}
        />
      )}
      </Box>
      </>
      }     
      {error && <p style={{color:"red",fontSize:16}}>Error loading Department: {error?.error}</p>}
    </Box>
  );
};

export default Department;