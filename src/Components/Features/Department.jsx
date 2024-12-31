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
  }),
});

export const { useGetAllDepartmentsQuery } = departmentApiSlice;
