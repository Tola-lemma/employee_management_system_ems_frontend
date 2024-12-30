import { Box,TextField, Select, MenuItem} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { Header } from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomButton from "../global/Button";
export const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box m="20px">
      <Header
        title="CREATE EMPLOYEE"
        subtitle="Create a New Employee member's Profile"
      />

      <Formik
        // onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          // <form >
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
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: "span 4" }}
              />
              <Select
                name="role"
                variant="filled"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role}
                error={!!touched.role && !!errors.role}
                renderValue={(selected) => selected || "Role"}
                displayEmpty
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value=""><em>Select a Role</em></MenuItem>
                <MenuItem value="admin">
                  Admin
                </MenuItem>
                <MenuItem value="manager">
                  Manager
                </MenuItem>
                <MenuItem value="employee">
                  Employee
                </MenuItem>
              </Select>
      
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <CustomButton  type="submit" className="btn btn-info"
              // disabled={updating} loading={updating}
              > Create New Employee </CustomButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  role: yup.string().required("required"),
  // password: yup
  //   .string()
  //   .required("required")
  //   .min(6, "Password must be at least 6 characters long")
  //   .matches(/[a-zA-Z]/, "Password must contain at least one letter")
  //   .matches(/[0-9]/, "Password must contain at least one number")
  //   .matches(
  //     /[^a-zA-Z0-9]/,
  //     "Password must contain at least one special character"
  //   ),
  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref("password"), null], "Passwords must match")
  //   .required("required"),
});
const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  role: "",
};
