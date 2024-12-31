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
        }));
      },
      providesTags: ["ems"], 
    }),
  }),
});

export const { useGetAllEmployeesQuery } = employeeApiSlice;
