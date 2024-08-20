import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import  { ExtractFnReturnType, QueryConfig } from "../utils/react-query";

type Props = {
    page: number;
    categoryId: string;
}

export const getProductListBySearch = ({ page, categoryId }: Props): Promise<any> => {
    return axios.get('https://asos10.p.rapidapi.com/api/v1/getProductList', {
        params: {
            offset: page ? 24 * page - 1 : 24 * 1,
            categoryId,
            limit: "24",
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

type QueryFnType = typeof getProductListBySearch;

type UseProductListOptions = {
  page: number;
  categoryId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useProductListBySearch = ({ page, categoryId, config }: UseProductListOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['product_list_search', categoryId, page],
    queryFn: () => getProductListBySearch({ page, categoryId }),
    ...config,
  });
};

