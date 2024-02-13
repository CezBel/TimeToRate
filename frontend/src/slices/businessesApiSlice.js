import { BUSINESSES_URL } from '../constans.js';
import { apiSlice } from './apiSlice.js';

export const businessesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBusinesses: builder.query({
      query: () => ({
        url: BUSINESSES_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getBusinessDetails: builder.query({
      query: (businessId) => ({
        url: `${BUSINESSES_URL}/${businessId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetBusinessesQuery, useGetBusinessDetailsQuery } = businessesApiSlice;