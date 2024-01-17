import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import  { ExtractFnReturnType, QueryConfig } from "../utils/react-query";

type Props = {
    productId: string;
}

export const getAlsoLike = ({ productId }: Props): Promise<any> => {
    return axios.get('https://asos10.p.rapidapi.com/api/v1/getYouMightAlsoLike', {
        params: {
            productId,
            currency: "USD",
            country: "US",
            sizeSchema: "US",
            lang: "en-US",
          },
        headers: {
          'X-RapidAPI-Key': '78a110ed1dmshbcfebcdca14633ap13f5ffjsn7c75c6dcf1c0',
          'X-RapidAPI-Host': 'asos10.p.rapidapi.com'
        }
      }).then(response => {
        return response
      })
}

type QueryFnType = typeof getAlsoLike;

type UseAlsoLikeOptions = {
  productId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useAlsoLike = ({ productId, config }: UseAlsoLikeOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['also_like', productId],
    queryFn: () => getAlsoLike({ productId }),
    ...config,
  });
};

