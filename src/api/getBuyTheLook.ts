import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import  { ExtractFnReturnType, QueryConfig } from "../utils/react-query";

type Props = {
    productId: string;
}

export const getBuyTheLook = ({ productId }: Props): Promise<any> => {
    return axios.get('https://asos10.p.rapidapi.com/api/v1/getBuyTheLook', {
        params: {
            productId,
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

type QueryFnType = typeof getBuyTheLook;

type UseBuyTheLookOptions = {
  productId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useBuyTheLook = ({ productId, config }: UseBuyTheLookOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['buy_the_look', productId],
    queryFn: () => getBuyTheLook({ productId }),
    ...config,
  });
};

