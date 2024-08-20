import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import  { ExtractFnReturnType, QueryConfig } from "../utils/react-query";

type Props = {
    query: string;
}

export const getAutoSuggest = ({ query }: Props): Promise<any> => {
    return axios.get('https://asos10.p.rapidapi.com/api/v1/autoSuggestion', {
        params: {
            query,
            currency: "USD",
            country: "US",
            sizeSchema: "US",
            lang: "en-US",
          },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'asos10.p.rapidapi.com'
        }
      }).then(response => {
        return response
      })
}

type QueryFnType = typeof getAutoSuggest;

type UseAutoSuggestOptions = {
  query: string;
  config?: QueryConfig<QueryFnType>;
};

export const useAutoSuggest = ({ query, config }: UseAutoSuggestOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['auto_suggest', query],
    queryFn: () => getAutoSuggest({ query }),
    ...config,
  });
};

