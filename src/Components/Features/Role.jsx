import { apiSlice } from "../API/apiSlice";

export const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoles: builder.query({
      query: () => ({
        url: "/roles",
      }),
      transformResponse: (response) => {

        if (!response?.result || !Array.isArray(response.result)) {
          throw new Error("Invalid response structure or empty result");
        }

        // Transform the data
        return response.result.map((item) => ({
          role_id: item.role_id,
          role_name: item.role_name,
        }));
      },
      providesTags: ["ems"], 
    }),
  }),
});

export const { useGetAllRolesQuery } = roleApiSlice;
