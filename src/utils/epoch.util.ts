import { GENESIS_TIMESTAMP, SECONDS_PER_EPOCH, FINALIZED_EPOCH_OFFSET } from '@/constants/ethereum.constants'
import { BeaconChainEpoch } from '@/enums'
import { Epoch } from '@/types'

/**
 * epoch -> x
 */

export const epochToTimestampMs = (epoch: Epoch): number => {
    if (epoch === BeaconChainEpoch.LATEST) return epochAsNumberToTimestampMs(getLatestEpochNumber())
    if (epoch === BeaconChainEpoch.FINALIZED) return epochAsNumberToTimestampMs(getFinalizedEpochNumber())
    return epochAsNumberToTimestampMs(epoch)
}

export const epochAsNumberToTimestampMs = (epochNumber: number): number => {
    return (GENESIS_TIMESTAMP + SECONDS_PER_EPOCH * epochNumber) * 1000
}

export const countDaysSinceGenesis = (epoch: Epoch): number => {
    const oneDayInSeconds = 60 * 60 * 24
    if (epoch === BeaconChainEpoch.LATEST) return Math.floor((Date.now() / 1000 - GENESIS_TIMESTAMP) / oneDayInSeconds)
    if (epoch === BeaconChainEpoch.FINALIZED)
        return Math.floor((Date.now() / 1000 - SECONDS_PER_EPOCH * FINALIZED_EPOCH_OFFSET - GENESIS_TIMESTAMP) / oneDayInSeconds)
    return Math.floor((epochAsNumberToTimestampMs(epoch) / 1000 - GENESIS_TIMESTAMP) / oneDayInSeconds)
}

/**
 * x -> epoch
 */

export const timestampMsToEpoch = (timestampInMs: number): number => {
    return timestampSecondsToEpoch(timestampInMs / 1000)
}

export const timestampSecondsToEpoch = (timestampInSeconds: number): number => {
    const genesisEpoch = 0
    const epochNumber = Math.floor(genesisEpoch + (timestampInSeconds - GENESIS_TIMESTAMP) / SECONDS_PER_EPOCH) // 384 seconds per epoch
    return epochNumber
}

export const dateToEpoch = (date: Date): number => {
    return timestampSecondsToEpoch(date.getTime() / 1000)
}

export const shortDateToEpoch = (shortDate: string): number => {
    return dateToEpoch(new Date(shortDate))
}

/**
 * validate
 */

export const isValidAndOccuredEpoch = (mayBBeaconChainEpoch: string | number): boolean => {
    if (BeaconChainEpoch.LATEST === String(mayBBeaconChainEpoch)) return false
    if (BeaconChainEpoch.FINALIZED === String(mayBBeaconChainEpoch)) return true
    if (typeof mayBBeaconChainEpoch !== 'number') return false
    if (isNaN(mayBBeaconChainEpoch)) return false
    if (mayBBeaconChainEpoch < 0 || mayBBeaconChainEpoch > getLatestEpochNumber()) return false
    return true
}

/**
 * misc
 */

export const getLatestEpochNumber = () => timestampMsToEpoch(Date.now())
export const getFinalizedEpochNumber = () => getLatestEpochNumber() - 5
