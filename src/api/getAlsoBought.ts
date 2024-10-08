import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import  { ExtractFnReturnType, QueryConfig } from "../utils/react-query";

type Props = {
    productId: string;
}

export const getAlsoBought = ({ productId }: Props): Promise<any> => {
    return axios.get('https://asos10.p.rapidapi.com/api/v1/getPeopleAlsoBought', {
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

type QueryFnType = typeof getAlsoBought;

type UseAlsoBoughtOptions = {
  productId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useAlsoBought = ({ productId, config }: UseAlsoBoughtOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['also_bought', productId],
    queryFn: () => getAlsoBought({ productId }),
    ...config,
  });
};

