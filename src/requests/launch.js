import axios from "axios";

/**
 * Function responsible for fetching Influencers
 * @param oQuery
 * @return {Promise<AxiosResponse<T>>}
 */
export const fetchLaunches = oQuery => {
    return axios.get('https://api.spacexdata.com/v3/launches', {
        params: oQuery
    });
};

