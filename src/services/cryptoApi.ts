import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CoinType } from "../common/types";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.coingecko.com/api` }),
  endpoints: (builder) => ({
    getCryptos: builder.mutation({
      query: ({ page, perPage }) => {
        const perPageSize = Number(perPage);
        console.log("perPageSize", )
        return {
          url: `/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${Number(perPageSize)}&page=${page}&sparkline=false`,
          method: "get",
        };
      },
    }),
    getAllCryptos: builder.query<CoinType[], void>({
      query: () =>
        "/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000&page=1&sparkline=false",
    }),
    getCrypto: builder.query({
      query: (coinId) => `/v3/coins/${coinId}`,
    }),
  }),
});

export const {
  useGetCryptosMutation,
  useGetCryptoQuery,
  useGetAllCryptosQuery,
} = cryptoApi;
