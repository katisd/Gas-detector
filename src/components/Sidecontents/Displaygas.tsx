import React, { useEffect } from 'react'


const Displaygas: React.FC = () => {

    const gasStatus = 'Warning'

    useEffect(() => {
        console.log(gasStatus)
    }, [])

    const gasVolume = 90


    const getGasColor = (status: string) => {
        if (status === 'Normal') {
            return 'bg-success border-success'
        } else if (status === 'Danger') {
            return 'bg-warning border-warning'
        } else {
            return 'bg-error border-error'
        }
    }

    return (
        <div className="card w-96 bg-primary text-primary-content">
            <div className="card-body">
                <h2 className="text-4xl font-semibold gas-title">Volume</h2>
                <div className='w-fit m-auto'>
                    <h1 className='text-4xl text-center hover:scale-150 font-bold transition '>{gasVolume}</h1>
                </div>
                <div className='Status-show'></div>
                <div className="flex flex-row justify-item-center justify-evenly">
                    <div className='flex justify-center items-center'>
                        <p className='text-xl font-semibold'>Status : </p>
                    </div>
                    <div className={`border-8 ${getGasColor(gasStatus)} rounded-full`}>
                    <p className={`text-white`}>{gasStatus}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Displaygas