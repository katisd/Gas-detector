import axios from "axios"
import {  useQuery } from "react-query"
import { z } from "zod"
import { type windowButtonProps } from "../SideContent/WindowButton"

// static variable
// const url="http://group2.exceed19.online"
const url="https://ecourse.cpe.ku.ac.th/exceed02"
console.log("asasss",url);
const delayGraph = 5000
const delayStatus = 1000
const delayCommand = 1000

// response of ferchCommand schema
const commandResponseShema = z.object({
    isOpen: z.boolean(),
})
type CommandResponse = z.infer<typeof commandResponseShema>
// fetch command function
const fetchCommand= (setLocalCommand: React.Dispatch<React.SetStateAction<boolean | undefined>>) => {
    setLocalCommand(undefined)
    return axios.get<CommandResponse>(`${url}/record/command`).then((res) => {
        return commandResponseShema.parse(res.data)
    }).catch((err) => {
        console.log(err)
    })
}
// get last command in server
export const useGetCommand = (setLocalCommand: React.Dispatch<React.SetStateAction<boolean | undefined>>) => {
    const query=useQuery({
        queryKey: ["command"],
        queryFn: ()=>fetchCommand(setLocalCommand),
        refetchInterval: delayCommand,
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
        refetchInterval: delayStatus,
    })
    return {...query}
}

// schema of chart data
const chartDataSchema = z.array(z.object({
    x: z.string(),
    y: z.number()
}));
// get data 24 hour
export const useGetLastDay = () => {
    return useQuery('day', async () => {
        const data = await axios.get(`${url}/record/last_day`);
        return chartDataSchema.parse(data.data);
    },
        {
            refetchInterval: delayGraph
        }
    )
};
// get data 1 hour
export const useGetLastHour = () => {
    return useQuery('hour', async () => {
        const data = await axios.get(`${url}/record/last_hour`);
        return chartDataSchema.parse(data.data);
    },
        {
            refetchInterval: delayGraph
        }

    );
}
// put command to server and update local state
export const UpadateCommand = ({LocalCommand,setLocalCommand,windowCommand}:windowButtonProps) => {
    axios
      .put(
        `${url}/update/${
          (LocalCommand === undefined ? !windowCommand : !LocalCommand)
            ? "true"
            : "false"
        }`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    if (LocalCommand === undefined) {
    setLocalCommand(!windowCommand);
    } else {
    setLocalCommand(!LocalCommand);
    }
}
const getAll=()=>{
    return axios.get(`${url}/record/all`).then((res) => {
        return chartDataSchema.parse(res.data)
    }).catch((err) => {
        console.log(err)
    })
}

export const useGetALL = () => {
    return useQuery({
        queryKey: ["all"],
        queryFn:getAll,
    })
}