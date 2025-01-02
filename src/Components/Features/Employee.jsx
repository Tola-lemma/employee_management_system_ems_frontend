import { apiSlice } from "../API/apiSlice";

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query({
      query: () => ({
        url: "/employees",
      }),
      transformResponse: (response) => {
        if (!response?.result || !Array.isArray(response.result)) {
          throw new Error("Invalid response structure or empty result");
        }
        // Transform the data
        return response.result.map((item) => ({
          employee_id: item.employee_id,
          role_id:item.role_id,
          department_id:item.department_id,
          first_name: item.first_name,
          last_name: item.last_name,
          email: item.email,
          phone: item.phone,
          date_of_birth: item.date_of_birth,
          address: item.address,
          department: item.department,
          date_joined: item.date_joined,
          status: item.status,
          profile_picture: item.profile_picture,
          role: item.role,          
          bad_login_attempts: item.bad_login_attempts,
        }));
      },
      providesTags: ["ems"],
    }),

    // Fetch a specific employee by ID
    getEmployee: builder.query({
      query: (employee_id) => ({
        url: `/employees/${employee_id}`,
      }),
      transformResponse: (response) => {
        if (!response?.result || typeof response.result !== "object") {
          throw new Error("Invalid response structure or empty result");
        }
        // Return transformed employee data
        return {
          employee_id: response.result.employee_id,
          first_name: response.result.first_name,
          last_name: response.result.last_name,
          email: response.result.email,
          phone: response.result.phone,
          date_of_birth: response.result.date_of_birth,
          address: response.result.address,
          department: response.result.department,
          date_joined: response.result.date_joined,
          status: response.result.status,
          profile_picture: response.result.profile_picture,
          role: response.result.role,
        };
      },
      providesTags: ["ems"],
    }),

    // Create a new employee
    createEmployee: builder.mutation({
      query: (newEmployeeData) => ({
        url: "/employees",
        method: "POST",
        body: newEmployeeData,
      }),
      invalidatesTags: ["ems"],
    }),

    // Update an existing employee by ID
    updateEmployee: builder.mutation({
      query: ({ employee_id, body }) => ({
        url: `/employees/${employee_id}`,
        method: "PUT",
        body,
      }),
      providesTags: ["ems"],
    }),

    // Delete an employee by ID
    deleteEmployee: builder.mutation({
      query: (employee_id) => ({
        url: `/employees/${employee_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['ems'],
    }),
    passwordReset: builder.mutation({
      query: (employee_id) => ({
        url: `/password-reset/${employee_id}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  usePasswordResetMutation
} = employeeApiSlice;
