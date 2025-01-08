import { apiSlice } from "../API/apiSlice";

export const departmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDepartments: builder.query({
      query: () => ({
        url: "/departments",
      }),
      transformResponse: (response) => {

        if (!response?.result || !Array.isArray(response.result)) {
          throw new Error("Invalid response structure or empty result");
        }

        // Transform the data
        return response.result.map((item) => ({
          department_id: item.department_id,
          department_name: item.department_name,
        }));
      },
      providesTags: ["ems"], 
    }), 
    getEmployeeDepartmentHistory: builder.query({
      query: (employee_id) => ({
        url: `/employees/department-history/${employee_id}`,
      }),
      transformResponse: (response) => {

        if (!response?.result || !Array.isArray(response.result)) {
          throw new Error("Invalid response structure or empty result");
        }

        // Transform the data
        return response.result.map((item) => ({
          start_date: item.start_date,
          end_date: item.end_date,
          department_name: item.department_name,
          duration:item.duration,
        }));
      },
      providesTags: ["ems-hist"], 
    }), 
    // Create a new department
    createDepartment: builder.mutation({
      query: (newDepartment) => ({
        url: "/departments",
        method: "POST",
        body: newDepartment,
      }),
      invalidatesTags: [{ type: "ems", id: "LIST" }],
    }),

    // Update a department
    updateDepartment: builder.mutation({
      query: ({ department_id, ...updatedData }) => ({
        url: `/departments/${department_id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { department_id }) => [
        { type: "ems", id: department_id },
      ],
    }),

    // Delete a department
    deleteDepartment: builder.mutation({
      query: (department_id) => ({
        url: `/departments/${department_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, department_id) => [
        { type: "ems", id: department_id },
      ],
    }),
  }),
});

export const {
  useGetAllDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetEmployeeDepartmentHistoryQuery,
} = departmentApiSlice;