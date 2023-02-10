import Axios from 'axios';
import { useQuery } from 'react-query';
import { z } from 'zod';
const URL = "http://group2.exceed19.online/"


const day = z.array(z.object({
    x: z.string(),
    y: z.number()
}));

const hour = z.array(z.object({
    x: z.string(),
    y: z.number().int()
}));


export const useGetLastDay = () => {
    return useQuery('day', async () => {
        const data = await Axios.get(`${URL}record/last_day`);
        return day.parse(data.data);
    },
        {
            refetchInterval: 5000
        }
    )
};

export const useGetLastHour = () => {
    return useQuery('hour', async () => {
        const data = await Axios.get(`${URL}record/last_hour`);
        return hour.parse(data.data);
    },
        {
            refetchInterval: 5000
        }

    );
}