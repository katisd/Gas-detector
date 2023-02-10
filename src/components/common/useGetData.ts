
import axios from "axios"
import {  useQuery } from "react-query"
import { z } from "zod"
// const url="http://group2.exceed19.online"
const url="https://ecourse.cpe.ku.ac.th/exceed02/"

// response of ferchCommand schema
const commandResponseShema = z.object({
    isOpen: z.boolean(),
})
type CommandResponse = z.infer<typeof commandResponseShema>
// fetch command function
const fetchCommand= () => {
    return axios.get<CommandResponse>(`${url}/record/command`).then((res) => {
        return commandResponseShema.parse(res.data)
    }).catch((err) => {
        console.log(err)
    })
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
const getLastRecord = () => {
    return axios.get(`${url}/record/last`).then((res) => {
        console.log(res.data);
        return lastRecordShema.parse(res.data)
    }).catch((err) => {
        console.log(err)
    })
    
}
export const useGetLastRecord = () => {
    const query=useQuery({
        queryKey: ["lastRecord"],
        queryFn: getLastRecord,
        refetchInterval: 1000,
    })
    return {...query}
}


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
        const data = await axios.get(`${url}/record/last_day`);
        return day.parse(data.data);
    },
        {
            refetchInterval: 5000
        }
    )
};

export const useGetLastHour = () => {
    return useQuery('hour', async () => {
        const data = await axios.get(`${url}/record/last_hour`);
        return hour.parse(data.data);
    },
        {
            refetchInterval: 5000
        }

    );
}