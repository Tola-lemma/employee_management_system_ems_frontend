import React, { useContext, useState } from "react";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions  } from "@mui/material";
import { useDeleteGamificationMutation, useGetGamificationsQuery, useUpdateGamificationMutation } from "../../../../Features/Gamification";
import DataGridSkeleton from "../../components/Skeleton";
import { ErrorContext } from "../../ToastErrorPage/ErrorContext";
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
const GamificationTable = () => {
  const {data:rows,isLoading,refetch} = useGetGamificationsQuery()
  const [updateGamification] = useUpdateGamificationMutation();
  const [deleteGamification] = useDeleteGamificationMutation();
   const token = Cookies.get('token');
  const [editData, setEditData] = useState(null);
  const [newPoints, setNewPoints] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const {showSuccess, showError, showWarning} = useContext(ErrorContext)
        let role,fullName;
        try {
          if (token) {
            const decoded = jwtDecode(token);
            role = decoded.role;
            fullName = decoded.fullname;
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
        const filteredRows = rows?.filter((row) =>
          role === "employee" || role === "attendance_taker"
            ? row.employee_name === fullName
            : true
        );
  // Handle opening edit dialog
  const handleEdit = (row) => {
    setEditData(row);
    setNewPoints(row.points); 
  };

  // Handle updating points
  const handleUpdate = async () => {
    if (editData) {
      try { 
      const result = await updateGamification({ gamification_id: editData.gamification_id, points: parseInt(newPoints) });
      if(result?.data?.result){
      showSuccess(result?.data?.message)
      refetch(); // Refresh data
      setEditData(null);
     }
     else{
      showError('Unable to create Gamification '+result?.error?.message)
     }
  } catch (error) {
   if (error?.data?.status===500) {
     showError('Unable Create Gamification  ' + error?.data?.error)
   }
     else{
       showError('Unable create Gamification  ' + error?.data ? error?.data?.message : error?.error)
     }
    }
  }
  };
  const handleDeleteConfirm = async () => {
    if (deleteId) {
     try {
      const result = await deleteGamification(deleteId);
      if(result?.data?.result){
        showWarning(result?.data?.message)
        refetch(); // Refresh data
      setDeleteId(null); // Close modal
       }
       else{
        showError('Unable to Delete Gamification '+result?.error?.message)
       }
     } catch (error) {
      showError('Error While deleting Gamification',error)
     }
    }
  };
const columns = [
  { field: "employee_name", headerName: "Employee Name", width: 100 },
  { field: "points", headerName: "Points", width: 90 },
  { field: "level", headerName: "Level", width: 100 },
  { field: "streak", headerName: "Streak(how many time the point changed for consecutive day) ", width: 100 },
  { field: "badges", headerName: "Badges", width: 200 },
  { field: "last_active", headerName: "last_active", width: 90 },
];
  // Conditionally add the Actions column if the role is not 'attendance_taker' or 'employee'
  if (role !== "attendance_taker" && role !== "employee") {
    columns.push({
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }} onClick={() => handleEdit(params.row)}>
            Edit
          </Button>
          <Button variant="outlined" color="error" size="small" onClick={() => setDeleteId(params.row.gamification_id)}>
            Delete
          </Button>
        </Box>
      ),
    });
  }
 return (<>
    {isLoading?<DataGridSkeleton/>: <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid rows={filteredRows} columns={columns} pageSize={5} getRowId={(row) => row.gamification_id}
         slots={{
          toolbar: GridToolbar ,
        }}
        />
    </Box>}
     {/* Edit Dialog */}
      <Dialog open={Boolean(editData)} onClose={() => setEditData(null)}>
        <DialogTitle>Edit Points</DialogTitle>
        <DialogContent>
          <TextField
            label="Points"
            type="number"
            fullWidth
            value={newPoints}
            onChange={(e) => setNewPoints(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditData(null)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
        {/* Delete Confirmation Dialog */}
        <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this gamification record?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GamificationTable;
