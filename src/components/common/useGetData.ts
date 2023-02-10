
import axios from "axios"
import {  useQuery } from "react-query"
import { z } from "zod"
const url="http://group2.exceed19.online"

// response of ferchCommand schema
const commandResponseShema = z.object({
    isOpen: z.boolean(),
})
type CommandResponse = z.infer<typeof commandResponseShema>
// fetch command function
const fetchCommand= async () => {
    const res = await axios.get<CommandResponse>(`${url}/record/command`).then((res) => {
        return commandResponseShema.parse(res.data)
    })
    return res
}
// useQuery on repeat
export const useGetCommand = () => {
    const query=useQuery({
        queryKey: ["command"],
        queryFn: ()=>fetchCommand(),
    })
    return {...query}
}
    // get Last Record function
const lastRecordShema = z.object({
    gas_quantity: z.number(),
    status: z.string(),
})
const getLastRecord = async () => {
    const res = await axios.get(`${url}/record/last`).then((res) => {
        return lastRecordShema.parse(res.data)
    })
    return res
}
export const useGetLastRecord = () => {
    const query=useQuery({
        queryKey: ["lastRecord"],
        queryFn: ()=>getLastRecord(),
        refetchInterval: 1000,
    })
    return {...query}
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