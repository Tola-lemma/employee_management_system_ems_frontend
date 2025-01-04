import { DataGrid , GridToolbar} from '@mui/x-data-grid';
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { Header } from '../../components/Header.jsx';
import DataGridSkeleton from '../../components/Skeleton.jsx';
import { useContext, useState } from 'react';
import DeleteModal from '../../components/PerformanceModal/DeletePerformanceModal.jsx';
import EditModal from '../../components/PerformanceModal/EditPerformanceModal.jsx';
import CreateModal from '../../components/PerformanceModal/CreatePerformanceModal.jsx';
import ViewModal from '../../components/PerformanceModal/ViewPerformanceModal.jsx';
import { ErrorContext } from '../../ToastErrorPage/ErrorContext.jsx';
import {
      useGetPerformanceQuery,
      useCreatePerformanceMutation,
      useUpdatePerformanceMutation,
      useDeletePerformanceMutation,
} from "../../../../Features/Performance.jsx";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const Performance = () => {
  const { data, isLoading, error, refetch } = useGetPerformanceQuery();
  const [updatePerformance] = useUpdatePerformanceMutation();
  const [createPerformance] = useCreatePerformanceMutation();
  const [deletePerformance] = useDeletePerformanceMutation();
  const [viewComparison, setViewComparison] = useState(false)
  const { showSuccess, showError } = useContext(ErrorContext)
 const theme = useTheme();
    const colors = tokens(theme.palette.mode);
      const [modalState, setModalState] = useState({
          action: null,
          open: false,
          performance: null,
        });
      
        const handleModalOpen = (action, performance) => {
          setModalState({ action, open: true, performance });
        };
      
        const handleModalClose = () => {
          setModalState({ action: null, open: false, performance: null });
        };
      
        const handleEdit =async (updatedPerformance) => {
          try {
            const result =  await updatePerformance(updatedPerformance).unwrap()
                 if(result?.result){
                  showSuccess(result?.message)
                  refetch()
                 }
                 else{
                  showError('Unable to update Performance '+ result?.error.message)
                 }
          } catch (error) {
            if (error?.data.status===500) {
                  showError('Unable Update Performance  ' + error?.data?.error)}
                  else{
                    showError('Unable update Performance  ' + error?.data ? error?.data?.message : error?.error)
                  }
          }      
        };
        const handleCreate =async (CreatedPerformance) => {
          try {
            const result =  await createPerformance(CreatedPerformance).unwrap()
                 if(result?.message){
                  showSuccess(result?.message)
                  refetch()
                 }
                 else{
                  showError('Unable to create Performance '+result?.error?.message)
                 }
          } catch (error) {
            if (error?.data.status===500) {
              showError('Unable Create Performance  ' + error?.data?.error)}
              else{
                showError('Unable create Performance  ' + error?.data ? error?.data?.message : error?.error)
              }
          }      
        };
      
        const handleDelete = async (PerformanceId) => {
          try {
            const result =  await deletePerformance(PerformanceId).unwrap()
            console.log('resD',result)
                 if(result?.result){
                  showSuccess(result?.message)
                  refetch()
                 }
                 else{
                  showError('Unable to delete Performance '+result?.error.message)
                 }
          } catch (error) {
            if(error?.status===400){
                  showError(error?.data.message)
            }else{
                  showError('Unable to delete Performance  ' + error?.data ? error?.data?.message : error?.error)
            }
          }     
        };
  // Define columns for the DataGrid
  const columns = [
    { field: 'employee_name', headerName: 'Employee Name', width: 100 },
    { field: 'review_date', headerName: 'Review date', width: 100 },
    { field: 'score', headerName: 'Score', width:50 },
    { field: 'feedback', headerName: 'Overall Fedback', width: 200 },
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

  //graph data
  const graphData = data?.map((item) => ({
    name: item.employee_name,
    score: item.score,
  }));
  const handleComparionView = ()=>{
    setViewComparison(!viewComparison)
  }
  return (
    <Box m="20px">
     <Header title="Manage Permormance Review" subtitle="Dashboard to Manage Employee Performance Review" /> 
     {isLoading? <DataGridSkeleton/>:<>
     <Box display={'flex'} justifyContent={'right'} mb={4}>
      <button type="button" onClick={handleComparionView} className='btn btn-primary' style={{borderRadius:"20px" ,textAlign:"center"}}>{!viewComparison?"View ":"Hide "}Employee Perfomance Comparison</button>
     </Box>
     {!viewComparison?
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
          getRowId={(row) => row.performance_id} // Ensure the `id` field is used as the unique row identifier
          slots={{
            toolbar: GridToolbar ,
          }}
        />
      {modalState.action === 'View' && (
        <ViewModal
          open={modalState.open}
          onClose={handleModalClose}
          performance={modalState.performance}
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
          performance={modalState.performance}
          onEdit={handleEdit}
        />
      )}
      {modalState.action === 'Delete' && (
        <DeleteModal
          open={modalState.open}
          onClose={handleModalClose}
          performance={modalState.performance}
          onDelete={handleDelete}
        />
      )}
      </Box>
       :
        <Box mt={4} height="400px">
            <Typography variant="h4" mb={2} ml={4}>
              Employee Performance Comparison
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Box>}
      </>}
      {error && <p style={{color:"red",fontSize:16}}>Error loading performance: {error?.error}</p>}
    </Box>
  );
};

export default Performance;