import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '' }), // base query is '' because in package.json the proxy is set to http://localhost:5000
  tagTypes: ['Business', 'User'],
  endpoints: (builder) => ({})
});