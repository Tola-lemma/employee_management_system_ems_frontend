import { apiSlice } from "../../API/apiSlice";
// Injecting user endpoints into the apiSlice
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/login/",
        method: "POST",
        body,
      }),
      transformResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      transformErrorResponse(fetchBaseQueryError){
        return fetchBaseQueryError;
      },
    }),
    changePassword: builder.mutation({
      query: ({ employee_id, ...body }) => ({
        url: `/change-password/${employee_id}`,
        method: "PUT",
        body,
      }),
      transformResponse(baseQueryReturnValue) {
        return baseQueryReturnValue;
      },
      invalidatesTags: ["ems"],
    }),
  }),
});

// Exporting hooks for each endpoint
export const {
  useLoginUserMutation,
  useChangePasswordMutation
} = userApiSlice;
