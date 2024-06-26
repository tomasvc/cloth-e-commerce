import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import  { ExtractFnReturnType, QueryConfig } from "../utils/react-query";

type Props = {
    productId: string;
}

export const getProduct = ({ productId }: Props): Promise<any> => {
    return axios.get('https://asos2.p.rapidapi.com/products/v4/detail', {
        params: {
            id: productId,
            currency: "USD",
            country: "US",
            sizeSchema: "US",
            lang: "en-US",
          },
        headers: {
          'X-RapidAPI-Key': '78a110ed1dmshbcfebcdca14633ap13f5ffjsn7c75c6dcf1c0',
          'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
        }
      }).then(response => {
        return response
      })
}

type QueryFnType = typeof getProduct;

type UseProductOptions = {
  productId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useProduct = ({ productId, config }: UseProductOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['product', productId],
    queryFn: () => getProduct({ productId }),
    ...config,
  });
};

