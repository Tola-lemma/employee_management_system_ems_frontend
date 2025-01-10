import { apiSlice } from "../API/apiSlice";
import Cookies from 'js-cookie';
export const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoles: builder.query({
      query: () => ({
        url: "/roles",
        headers: {
          'x-auth-token': Cookies.get('token') || '' 
         },
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
    createRole: builder.mutation({
      query: (newRole) => ({
        url: "/roles",
        method: "POST",
        body: newRole,
        // headers: {
        //   'x-auth-token': Cookies.get('token') || '' 
        //  },
      }),
      invalidatesTags: [{ type: "ems", id: "LIST" }],
    }),

    // Update a Role
    updateRole: builder.mutation({
      query: ({ role_id, ...updatedData }) => ({
        url: `/roles/${role_id}`,
        method: "PUT",
        body: updatedData,
        headers: {
          'x-auth-token': Cookies.get('token') || '' 
         },
      }),
      invalidatesTags: (result, error, { role_id }) => [
        { type: "ems", id: role_id },
      ],
    }),

    // Delete a Role
    deleteRole: builder.mutation({
      query: (role_id) => ({
        url: `/roles/${role_id}`,
        method: "DELETE",
        headers: {
          'x-auth-token': Cookies.get('token') || '' 
         },
      }),
      invalidatesTags: (result, error, role_id) => [
        { type: "ems", id: role_id },
      ],
    }),
  }),
});

export const { 
  useGetAllRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation
 } = roleApiSlice;
