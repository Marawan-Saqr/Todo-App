import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define The API URL
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
    // login mutation
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    // register mutation
    register: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    // add todos mutation
    addTodos: builder.mutation({
      query: (credentials) => ({
        url: `/api/todos`,
        method: "POST",
        body: credentials,
      }),
    }),
    // getTodos mutation
    getTodos: builder.mutation({
      query: (credentials) => ({
        url: `/api/todos`,
        method: "GET",
        body: credentials,
      }),
    }),
    // get a single todo by ID
    getTodoById: builder.query({
      query: (id) => ({
        url: `/api/todos/${id}`,
        method: "GET",
      }),
    }),
    // updateTodo mutation
    updateTodo: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/api/todos/${id}`,
        method: "PUT",
        body: credentials,
      }),
    }),
    // delete todo mutation
    deleteTodo: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/api/todos/${id}`,
        method: "DELETE",
        body: credentials,
      }),
    }),
    // profile mutation
    profile: builder.mutation({
      query: () => ({
        url: `/api/users/profile`,
        method: "GET",
      })
    })
  }),
});



export const { useLoginMutation, useRegisterMutation, useAddTodosMutation, useGetTodosMutation, useGetTodoByIdQuery, useUpdateTodoMutation, useDeleteTodoMutation, useProfileMutation } = authQuery;