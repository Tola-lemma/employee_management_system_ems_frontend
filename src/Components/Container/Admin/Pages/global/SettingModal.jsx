import React, { useContext, useEffect, useState } from "react";
import { Modal, Box,  TextField,  Select, MenuItem, useTheme ,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Formik } from "formik";
// import * as yup from "yup";
import { Header } from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomButton from "../../Pages/global/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import dayjs from "dayjs";
import FormSkeleton from "../../Pages/form/FormSkeleton";
import { tokens } from "../../theme";
import { useGetAllRolesQuery } from "../../../../Features/Role";
import { useGetAllDepartmentsQuery, useGetEmployeeDepartmentHistoryQuery } from "../../../../Features/Department";
import { ErrorContext } from "../../ToastErrorPage/ErrorContext";
import { useUpdateEmployeeMutation } from "../../../../Features/Employee";
const EditModal = ({ open, onClose, data }) => {
  const initialValues = {
    first_name: data?.first_name,
    last_name: data?.last_name,
    email: data?.email,
    phone: data?.phone,
    address: data?.address,
    department_id: data?.department_id,
    role_id: data?.role_id,
    date_of_birth: data?.date_of_birth,
    date_joined: data?.date_joined,
    profile_picture: data?.profile_picture,
  };
  const employee_id = data?.employee_id;
const theme = useTheme();
const colors = tokens(theme.palette.mode);
const formattedDate = (date) => {
      if (!date) return "Invalid date";
    
      return dayjs(date).format("MM/DD/YYYY");
    };
const isNonMobile = useMediaQuery("(min-width:600px)");  
const { data: departments = [], isLoading } = useGetAllDepartmentsQuery();
const { data: roles = [] } = useGetAllRolesQuery(); 
const [updateEmployee , {isLoading:updateLoading }] = useUpdateEmployeeMutation();
const {showSuccess , showError, showWarning} = useContext(ErrorContext)
const [previewImage, setPreviewImage] = useState(data?.profile_picture);
const { data: departmentHistory, isLoading:deparmentHistoryLoading } =
    useGetEmployeeDepartmentHistoryQuery(employee_id);
  // Handle file selection for preview
  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); 
      };
      reader.readAsDataURL(file); // Convert to Base64
    }
  };
  useEffect(() => {
    setPreviewImage(data?.profile_picture);
  }, [data?.profile_picture]);
const handleSubmit = async (values) => {
  const formData = new FormData();
formData.append("first_name", values.first_name);
formData.append("last_name",values.last_name);
formData.append("email",values.email);
formData.append("phone",values.phone);
formData.append("address",values.address);
formData.append("department_id",values.department_id);
formData.append("role_id",values.role_id);
formData.append("date_of_birth",values.date_of_birth);
formData.append("date_joined",values.date_joined);
if (values.profile_picture instanceof File) {
  formData.append("profile_picture", values.profile_picture);
}
  try {
  // Check for required fields
  if (!formData.get('first_name') || !formData.get('last_name') || !formData.get('email') || !formData.get('phone') || !formData.get('address') || !formData.get('department_id') || !formData.get('role_id') || !formData.get('date_of_birth') || !formData.get('date_joined')) {
    showError("Please fill in all the fields.");
    return;
  }
const result = await updateEmployee({ employee_id, body: formData  }).unwrap();

 if (result?.status==='success') {
     showSuccess("Your Profile Is updated successfully");// Close the modal if successful
     onClose()
    } else {
      showError("Error updating employee " + result?.message);
    }
  } catch (err) {
    showError("Error: "  + err?.data.message + err?.data.error);
  }
};

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: 1090,
          overflow:"auto",
          height:"600px"
        }}
      >
       <Header
        title="EDIT YOUR PROFILE"
        subtitle="Edit Your Profile here"
      />
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Profile Image */}
          <Box>
            <img
              src={
                previewImage ||
                "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
              }
              alt="Profile"
              style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                objectFit: "cover",
                mixBlendMode:"multiply"
              }}
            />
          </Box>

          {/* User Edit Form */}
          <Box>
          {isLoading?<FormSkeleton/>:
       <Formik
        initialValues={initialValues}
        // validationSchema={checkoutSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.first_name}
                name="first_name"
                error={!!touched.first_name && !!errors.first_name}
                helperText={touched.first_name && errors.first_name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.last_name}
                name="last_name"
                error={!!touched.last_name && !!errors.last_name}
                helperText={touched.last_name && errors.last_name}
                sx={{ gridColumn: "span 2" }}
              />
              <PhoneInput
                defaultCountry="et"
                value={values.phone}
                onChange={(phone) => setFieldValue("phone", phone)}
                containerStyle={{
                  gridColumn: "span 4",
                }}
                inputProps={{
                  variant: "filled",
                  style: {
                    width: "100%",
                    height: "55px",
                    background: colors.primary[12],
                    color:colors.primary[200],
                    borderBottom: `1px solid ${colors.primary[300]}`,
                    padding: "16.5px 14px",
                    borderRadius: "4px",
                    fontSize: "16px",
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 2" }}
              />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => 
                    {
                      setFieldValue("profile_picture", e.target.files[0]); 
                      handleFileChange(e.target.files[0]); // For preview
                    }
                  }
                  style={{ gridColumn: "span 2" }}
                />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={`Date of Birth: ${values.date_of_birth}`}
                  value={dayjs(values.date_of_birth, "MM/DD/YYYY")}
                  onChange={(newValue) =>{
                    const formatted = formattedDate(newValue);
                    setFieldValue("date_of_birth", formatted)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="filled"
                      sx={{ gridColumn: "span 2" }}
                    />
                  )}
                />
                <DatePicker
                  label={`Date Joined: ${values.date_joined}`}
                  value={dayjs(values.date_joined, "MM/DD/YYYY")}
                  onChange={() => {
                        showWarning("Date Joined cannot be changed. Admin Only");
                      }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="filled"
                      InputProps={{
                        readOnly: true,
                      }}
                      onClick={() => showWarning("Date Joined is read-only.")}
                      sx={{ gridColumn: "span 2" }}
                    />
                  )}
                />
              </LocalizationProvider>
              <Select
                name="department_id"
                variant="filled"
                onBlur={handleBlur}
                onChange={handleChange}
                onClick={() => showWarning("Department cannot be changed. Admin Only")}
                inputProps={{
                  readOnly: true,
                }}
                value={values.department_id}
                error={!!touched.department_id && !!errors.department_id}
                displayEmpty
                sx={{ gridColumn: "span 2" }}
              >
                <MenuItem value="">
                  <em>Select a Department</em>
                </MenuItem>
                {departments.map((dept) => (
                  <MenuItem key={dept.department_id} value={dept.department_id}>
                    {dept.department_name}
                  </MenuItem>
                ))}
              </Select>
              <Select
                name="role_id"
                variant="filled"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role_id}
                error={!!touched.role_id && !!errors.role_id}
                onClick={() => showWarning("Role cannot be changed. Admin Only")}
                inputProps={{
                  readOnly: true,
                }}
                displayEmpty
                sx={{ gridColumn: "span 2" }}
              >
                <MenuItem value="">
                  <em>Select a Role</em>
                </MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role.role_id} value={role.role_id}>
                    {role.role_name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <hr style={{fontWeight:"bold",fontSize:12,color:"black"}} />
            <Box sx={{ display: "flex",justifyContent:"space-between" }} mt="20px">
          <CustomButton type="button" onClick={onClose} className="btn btn-warning">
            Cancel
          </CustomButton> 
          <CustomButton type="submit" className="btn btn-info" 
              disabled={updateLoading} loading={updateLoading}
              >
              Update
              </CustomButton>
            </Box>
          </form>
        )}
      </Formik>
      }
       <hr style={{fontWeight:"bold",fontSize:12,color:"black"}} />
      <h3>Your Work History  (Found: {departmentHistory?.length})</h3>
      {deparmentHistoryLoading&&<p>Employee Department History is Loading</p>}
    {/* {error&&<p style={{color:"red"}}>Error Loading Employee Department History</p>} */}
    {(!departmentHistory || departmentHistory.length === 0)?<p>No department history available.</p>
      :<TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell  style={{fontWeight:"bold",color:"black"}}>Department</TableCell>
            <TableCell  style={{fontWeight:"bold",color:"black"}}>Start Date</TableCell>
            <TableCell  style={{fontWeight:"bold",color:"black"}}>End Date</TableCell>
            <TableCell  style={{fontWeight:"bold",color:"black"}}>Works For</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departmentHistory?.map((history) => (
            <TableRow key={history.history_id}>
              <TableCell>{history.department_name}</TableCell>
              <TableCell>{history.start_date}</TableCell>
              <TableCell>{history.end_date}</TableCell>
              <TableCell>{history.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
