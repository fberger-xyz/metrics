import { BeaconChainEpoch } from '@/enums'

export type BeaconchainRes<T> = {
    status: string
    data: T
}

export type Epoch = BeaconChainEpoch.LATEST | BeaconChainEpoch.FINALIZED | number
