import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import  { ExtractFnReturnType, QueryConfig } from "../utils/react-query";

type Props = {
    productId: string;
}

export const getProductPrice = ({ productId }: Props): Promise<any> => {
    return axios.get('https://asos2.p.rapidapi.com/products/v4/get-stock-price', {
        params: {
            productIds: productId,
            currency: "USD",
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

type QueryFnType = typeof getProductPrice;

type UseProductPriceOptions = {
  productId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useProductPrice = ({ productId, config }: UseProductPriceOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['productPrice', productId],
    queryFn: () => getProductPrice({ productId }),
    ...config,
  });
};

