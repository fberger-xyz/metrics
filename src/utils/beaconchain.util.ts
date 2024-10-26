import { BeaconChainEpoch } from '@/enums'
import { IBeaconchainEpochData, IBeaconchainQueueData, IBeaconchainAPRData } from '@/interfaces'
import { BeaconchainRes, Epoch, FunctionReturn } from '@/types'
import { countDaysSinceGenesis } from './epoch.util'

/**
 * 10 requests / 1 minute / IP. All API results are cached for 1 minute.
 */

// epoch https://beaconcha.in/api/v1/docs/index.html#/Epoch/get_api_v1_epoch__epoch_
const getEpoch = async (epoch: Epoch) => {
    const res: FunctionReturn<BeaconchainRes<IBeaconchainEpochData>> = { success: true, raw: null, error: '', ts: Date.now() }
    const apiKey = String(process.env.BEACONCHAIN_API_KEY_1)
    const url = `https://beaconcha.in/api/v1/epoch/${epoch}?apikey=${apiKey}`
    const response = await fetch(url, { method: 'GET' })
    res.raw = await response.json()
    return res
}

// queue https://beaconcha.in/api/v1/docs/index.html#/Validator/get_api_v1_validators_queue
const getQueue = async () => {
    const res: FunctionReturn<BeaconchainRes<IBeaconchainQueueData>> = { success: true, raw: null, error: '', ts: Date.now() }
    const apiKey = String(process.env.BEACONCHAIN_API_KEY_2)
    const url = `https://beaconcha.in/api/v1/validators/queue?apikey=${apiKey}`
    const response = await fetch(url, { method: 'GET' })
    res.raw = await response.json()
    return res
}

// APR https://beaconcha.in/api/v1/docs/index.html#/ETH.STORE%C2%AE/get_api_v1_ethstore__day_
const getAPR = async (epoch: Epoch) => {
    const res: FunctionReturn<BeaconchainRes<IBeaconchainAPRData>> = { success: true, raw: null, error: '', ts: Date.now() }
    const apiKey = String(process.env.BEACONCHAIN_API_KEY_3)
    const day = typeof epoch === 'string' ? BeaconChainEpoch.LATEST : countDaysSinceGenesis(epoch) - 1
    const url = `https://beaconcha.in/api/v1/ethstore/${day}?apikey=${apiKey}`
    const response = await fetch(url, { method: 'GET' })
    res.raw = await response.json()
    return res
}

export const BeaconChainAPI = {
    getEpoch,
    getQueue,
    getAPR,
}
