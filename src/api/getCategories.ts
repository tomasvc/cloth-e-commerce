import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import  { ExtractFnReturnType, QueryConfig } from "../utils/react-query";

export const getCategories = (): Promise<any> => {
    return axios.get('https://asos10.p.rapidapi.com/api/v1/getCategories', {
        params: {
            country: "US",
            lang: "en-US",
        },
        headers: {
          'X-RapidAPI-Key': '78a110ed1dmshbcfebcdca14633ap13f5ffjsn7c75c6dcf1c0',
          'X-RapidAPI-Host': 'asos10.p.rapidapi.com'
        }
      }).then(response => {
        return response.data
      })
}

type QueryFnType = typeof getCategories;

type UseCategoriesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useCategories = ({ config }: UseCategoriesOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    ...config,
  });
};

