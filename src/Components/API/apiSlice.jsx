// import { apiURl } from '../Constants/api';/
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const apiURl = 'https://ems-server-tem1.onrender.com';
// const apiURl = 'http://localhost:5000';
const baseQuery = fetchBaseQuery({
baseUrl:apiURl,
// credentials:'include',
prepareHeaders:(headers,{getState})=>{
      return headers;
}
})

const baseQueryWithReauth = async (args, api, extraOptions)=>{
      let result = await baseQuery(args, api , extraOptions);
      return result;
};

export const apiSlice = createApi({
      baseQuery:baseQueryWithReauth,
      tagTypes:['ems'],
      endpoints :(builder) => ({}),
});