import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import  { ExtractFnReturnType, QueryConfig } from "../utils/react-query";

type Props = {
    query: string;
  }

export const getSearchResults = ({ query }: Props): Promise<any> => {
    return axios.get('https://asos2.p.rapidapi.com/products/v2/list', {
        params: {
            country: "US",
            lang: "en-US",
            sort: "freshness",
            currency: "USD",
            sizeSchema: "US",
            q: query,
            limit: 10
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
        }
      }).then(response => {
        return response.data
      })
}

type QueryFnType = typeof getSearchResults;

type UseSearchResultsOptions = {
  query: string,
  config?: QueryConfig<QueryFnType>;
};

export const useSearchResults = ({ query, config }: UseSearchResultsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['searchResults', query],
    queryFn: () => getSearchResults({ query }),
    enabled: !!query,
    ...config,
  });
};

