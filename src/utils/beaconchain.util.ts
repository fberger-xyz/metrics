// import { BeaconChainEpoch } from '@/enums'
// import { IBeaconchainEpochData, IBeaconchainQueueData, IBeaconchainAPRData } from '@/interfaces'
// import { BeaconchainRes, Epoch, FunctionReturn } from '@/types'

// export const getBcDataForEpoch = async <T extends BeaconchainRes<IBeaconchainEpochData>>(epoch: Epoch) => {
//     const method = 'getBcDataForEpoch'
//     const log = true
//     const apiKey = String(process.env.BEACONCHAIN_API_KEY_1)
//     const url = `https://beaconcha.in/api/v1/epoch/${epoch}?apikey=${apiKey}`
//     // if (log) console.log(method, url);
//     // return safeRequest<T>({ httpService: this.httpService, method, url });
// }

// // queue
// // see https://beaconcha.in/api/v1/docs/index.html#/Validator/get_api_v1_validators_queue
// export const getBcDataForQueue = async <T extends BeaconchainRes<IBeaconchainQueueData>>() => {
//     const method = 'getBcDataForQueue'
//     const log = true
//     const apiKey = String(process.env.BEACONCHAIN_API_KEY_2)
//     const url = `https://beaconcha.in/api/v1/validators/queue?apikey=${apiKey}`
//     // if (log) console.log(method, url);
//     // return safeRequest<T>({ httpService: this.httpService, method, url });
// }

// // APR
// // see https://beaconcha.in/api/v1/docs/index.html#/ETH.STORE%C2%AE/get_api_v1_ethstore__day_
// export const getBcDataForAPR = <T extends BeaconchainRes<IBeaconchainAPRData>>(epoch: Epoch): Promise<FunctionReturn<T>> => {
//     const method = 'getBcDataForAPR'
//     const log = true
//     const apiKey = String(process.env.BEACONCHAIN_API_KEY_3)
//     const day = typeof epoch === 'string' ? BeaconChainEpoch.LATEST : countDaysSinceGenesis(epoch) - 1
//     const url = `https://beaconcha.in/api/v1/ethstore/${day}?apikey=${apiKey}`
//     // if (log) console.log(method, url)
//     // return safeRequest<T>({ httpService: this.httpService, method, url })
// }
