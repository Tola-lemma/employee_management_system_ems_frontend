import { DataGrid , GridToolbar} from '@mui/x-data-grid';
import { Box, Tooltip, useTheme } from "@mui/material";
import { useGetAllEmployeesQuery, useUpdateEmployeeMutation } from '../../../../Features/Employee.jsx';
import { tokens } from "../../theme";
import { Header } from '../../components/Header.jsx';
import './footerbtn.css' 
import DataGridSkeleton from '../../components/Skeleton.jsx';
import ViewModal from '../../components/Modals/ViewModal.jsx';
import EditModal from '../../components/Modals/EditModal.jsx';
import DeleteModal from '../../components/Modals/DeleteModal.jsx';
import React, { useContext, useState } from 'react';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { ErrorContext } from '../../ToastErrorPage/ErrorContext.jsx';
const ManageEmployee = () => {
  const { data, isLoading, error ,refetch } = useGetAllEmployeesQuery();
 const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [modalAction, setModalAction] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);
   const [updateEmployee] = useUpdateEmployeeMutation();
   const {showSuccess , showError} = useContext(ErrorContext)
    const handleModalOpen = (action, row) => {
      setModalAction(action);
      setSelectedRow(row);
    };
  
    const handleModalClose = () => {
      setModalAction("");
      refetch()
      setSelectedRow(null);
    };
    const toggleStatus = async (row) => {
      try {
        const newStatus = row.status === "Inactive" ? "Active" : "Inactive";
        await updateEmployee({
          employee_id: row.employee_id,
          body: { status: newStatus },
        }).unwrap();
        showSuccess(`User status changed to ${newStatus}`);
        refetch(); 
      } catch (err) {
        console.error("Failed to update user status:", err);
        showError("An error occurred while updating the status.");
      }
    };
  
    const handleRowClick = (row) => {
      if (row.status === "Inactive") {
        const confirmReactivate = window.confirm(
          `User "${row.first_name} ${row.last_name}" is Inactive. Do you want to reactivate?`
        );
        if (confirmReactivate) toggleStatus(row);
      }
    };
  // Define columns for the DataGrid
  const columns = [
    { field: 'first_name', headerName: 'Full Name', width: 100 ,
      renderCell: (params) => (
        <span>
          {params?.row.first_name || ""} {params?.row.last_name || ""}
        </span>
      )
    },
    { field: 'email', headerName: 'Email', width: 100,     },
    { field: 'date_of_birth', headerName: 'DOB', width: 100 },
    { field: 'phone', headerName: 'Phone Number', width: 100 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'department', headerName: 'Department', width: 100 },
    { field: 'date_joined', headerName: 'Date Joined/Hired', width: 100,    },
    { field: 'role', headerName: 'Role', width: 100 },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => {
        const isInactive = params.row.status === 'Inactive';
        return (
          <Tooltip
          title={isInactive ? "This employee is inactive. Click to reactivate." : ""}
          arrow
        >
          <span style={{ color: isInactive ? `${colors.redAccent[400]}` : '', fontWeight: isInactive ? 'bold' : '' }}>
            {params.row.status}
          </span>
          </Tooltip>
        );
      }
    },
   {  field: "profile_picture",
      headerName: "Profile Picture",
      width: 60,
      renderCell: (params) => {
        const imageUrl = params?.row.profile_picture || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"; 
        return (
          <Zoom>
          <img
            src={imageUrl}
            alt="Profile"
            style={{ width: 40, height: 40, borderRadius: "50%",  mixBlendMode:"multiply" }}
          />
          </Zoom>
        );
      
    }, 
  },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => (
      <div style={{ display: "flex", gap: "10px",marginTop:'5px' }}>
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
          disabled={params.row.status === "Inactive"}
          onClick={() => handleModalOpen("Edit", params.row)}
        >
          Edit
        </button>
        <button
         type="button"
         className="btn btn-danger"
         onClick={() => handleModalOpen("Delete", params.row)}
         disabled={params.row.role  === "admin" || params.row.status === "Inactive"}
          style={{
            cursor: params.row.role === "admin" ? "not-allowed" : "pointer",
            opacity: params.row.role === "admin" ? 0.5 : 1,
          }}
        >
          Delete
        </button>
      </div>
    ),
  },
  ];

  return (
    <Box m="20px">
     <Header title="Manage Employee" subtitle="Dashboard to Manage Employee" />
     {isLoading?<DataGridSkeleton  />:<>
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
          getRowClassName={(params) =>
            params.row.status === "Inactive" ? "disabled-row" : ""
          }
          onRowClick={(params) => handleRowClick(params.row)}
          slots={{
            toolbar: GridToolbar ,
          }}
        />
      </Box>
      <ViewModal open={modalAction === "View"} onClose={handleModalClose} data={selectedRow} />
      <EditModal open={modalAction === "Edit"} onClose={handleModalClose} data={selectedRow} />
      <DeleteModal open={modalAction === "Delete"} onClose={handleModalClose} data={selectedRow} />
      </>}
      {error && <p style={{color:"red",fontSize:16}}>Error loading employee: {error?.message}</p>}
    </Box>
  );
};

export default ManageEmployee;