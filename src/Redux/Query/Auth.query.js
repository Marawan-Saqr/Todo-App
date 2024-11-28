import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authQuery = createApi({
  reducerPath: 'AuthApis',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    // Define the login mutation
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    // Define the register mutation
    register: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});


export const { useLoginMutation, useRegisterMutation } = authQuery;