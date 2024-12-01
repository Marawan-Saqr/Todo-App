import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API slice
export const authQuery = createApi({
  reducerPath: 'AuthApis',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers, { endpoint }) => {
      const token = localStorage.getItem("token");
      if (token && endpoint !== "login" && endpoint !== "register") {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
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
    // Define the add todos mutation
    addTodos: builder.mutation({
      query: (credentials) => ({
        url: `/api/todos`,
        method: "POST",
        body: credentials,
      }),
    }),
    // Define the get todos mutation
    getTodos: builder.mutation({
      query: (credentials) => ({
        url: `/api/todos`,
        method: "GET",
        body: credentials,
      }),
    }),
    // Define the updateTodo mutation
    updateTodo: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/api/todos/${id}`,
        method: "PUT",
        body: credentials,
      }),
    }),
    // Define the profile mutation
    profile: builder.mutation({
      query: () => ({
        url: `/api/users/profile`,
        method: "GET",
      })
    })
  }),
});



export const { useLoginMutation, useRegisterMutation, useAddTodosMutation, useGetTodosMutation, useUpdateTodoMutation, useProfileMutation } = authQuery;