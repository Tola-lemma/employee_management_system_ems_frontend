import { Box,TextField, Select, MenuItem, useTheme} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { Header } from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomButton from "../global/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import dayjs from "dayjs";
import  './form.css' 
import { tokens } from "../../theme";
import { useGetAllDepartmentsQuery } from "../../../../Features/Department";
import { useGetAllRolesQuery } from "../../../../Features/Role";
import { useCreateEmployeeMutation } from "../../../../Features/Employee";
import FormSkeleton from "./FormSkeleton";
import { useContext } from "react";
import { ErrorContext } from "../../ToastErrorPage/ErrorContext";
export const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { data: departments = [], isLoading, error } = useGetAllDepartmentsQuery();
    const { data: roles = [] } = useGetAllRolesQuery(); 
    const [createEmployee, { isLoading:loadingCreate }] = useCreateEmployeeMutation();
    const {showSuccess , showError} = useContext(ErrorContext)
    const formattedDate = (date) => {
      if (!date) return "Invalid date";
    
      return dayjs(date).format("MM/DD/YYYY");
    };
  return (
    <Box m="20px">
      <Header
        title="CREATE EMPLOYEE"
        subtitle="Create a New Employee member's Profile"
      />
     {isLoading?<FormSkeleton/>:
      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const result = await createEmployee(values).unwrap();
            if (result?.status ==="success") {
              showSuccess(result?.message);
              resetForm(); 
            } else {
              showError("Error Creating Employee");
            }
          } catch (err) {
            if(err?.status===500){
              showError(err?.data.error)
            }
            else if(err?.status===400){ showError(err?.data.message)}
            else{
              showError("Error creating employee " + err);
            }
          }
        }}
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
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
                      error={!!touched.date_of_birth && !!errors.date_of_birth}
                      helperText={touched.date_of_birth && errors.date_of_birth}
                      sx={{ gridColumn: "span 2" }}
                    />
                  )}
                />
                <DatePicker
                  label="Date Joined"
                  value={dayjs(values.date_joined, "MM/DD/YYYY")}
                  onChange={(newValue) =>{
                    const formatted = formattedDate(newValue);
                    setFieldValue("date_joined", formatted)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="filled"
                      error={!!touched.date_joined && !!errors.date_joined}
                      helperText={touched.date_joined && errors.date_joined}
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
            <Box display="flex" justifyContent="end" mt="20px">
              <CustomButton type="submit" className="btn btn-info" disabled={loadingCreate} loading={loadingCreate}>
              Create Employee
              </CustomButton>
            </Box>
          </form>
        )}
      </Formik>
      }
      {error&&<p style={{color:"red",fontSize:16}}>Error:  { error?.error}</p>}
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  address: yup.string().required("Address is required"),
  email: yup.string().email("Invalid email").required("Email is Required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is Required"),
  department_id: yup.string().required("Department is Required"),
  role_id: yup.string().required("Role is Required"),
  date_of_birth: yup.date().nullable().required("Date of Birth is required"),
  date_joined: yup.date().nullable().required("Date Joined is required"),
});

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
  department_id: "",
  role_id: "",
  date_of_birth: null,
  date_joined: null,
};