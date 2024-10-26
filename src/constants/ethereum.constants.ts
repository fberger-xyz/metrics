/**
 * protocol constants
 * see https://github.com/ethereum/consensus-specs/blob/dev/configs/mainnet.yaml
 */

// beacon chain genesis Dec-01-2020 12:00:23 PM
export const GENESIS_TIMESTAMP = 1606824023 // unofficial | MIN_GENESIS_TIME official ✅ see https://github.com/ethereum/consensus-specs/blob/dev/configs/mainnet.yaml#L28C29-L28C29
export const SHORT_DATE_GENESIS = '2020-12-01' // unofficial

// a slot every 12 seconds (32/epoch, 225/day) starting from genesis https://beaconcha.in/slot/0
export const SECONDS_PER_SLOT = 12 // unofficial
export const SLOTS_PER_EPOCH = 32 // official ✅ see https://eth2book.info/capella/part3/config/preset/#slots_per_epoch
export const BLOCKS_PER_EPOCH = 32 // unofficial, best case scenario
export const SECONDS_PER_EPOCH = SECONDS_PER_SLOT * SLOTS_PER_EPOCH // unofficial
export const EPOCH_PER_DAY = (60 * 60 * 24) / SECONDS_PER_EPOCH // unofficial, 225 epochs per day

// voluntary exit
export const MAX_VOLUNTARY_EXITS = 16 // official ✅ see https://github.com/ethereum/consensus-specs/blob/dev/presets/mainnet/phase0.yaml#L88 ; per block
export const MAX_VOLUNTARY_EXITS_PER_EPOCH = MAX_VOLUNTARY_EXITS * BLOCKS_PER_EPOCH // unofficial

// validator queue
export const MIN_SEED_LOOKAHEAD = 1 // official ✅ see https://eth2book.info/capella/part3/config/preset/#min_seed_lookahead, expressed in epochs, 6.4 minutes
export const MAX_SEED_LOOKAHEAD = 4 // official ✅ see https://eth2book.info/capella/part3/config/preset/#max_seed_lookahead, expressed in epochs, 25.6 minutes
export const MIN_PER_EPOCH_CHURN_LIMIT = 4 // official ✅ see https://eth2book.info/capella/part3/config/configuration/#min_per_epoch_churn_limit
export const CHURN_LIMIT_QUOTIENT = 2 ** 16 // official ✅ see https://eth2book.info/capella/part3/config/configuration/#churn_limit_quotient
export const FAR_FUTURE_EPOCH = 2 ** 64 - 1 // official ✅ see https://eth2book.info/capella/part3/config/constants/#far_future_epoch
export const ETH1_FOLLOW_DISTANCE = 2 ** 11 // 2048 eth blocks ~8 hours | tba
export const EPOCHS_PER_ETH1_VOTING_PERIOD = 64 // official ✅ see https://eth2book.info/capella/part3/config/preset/#epochs_per_eth1_voting_period, expressed in epochs ~6.8 hours

// protocol delay
export const MIN_VALIDATOR_WITHDRAWABILITY_DELAY = 2 ** 8 // 256 epochs ~27 hours | https://eth2book.info/capella/part3/config/configuration/#min_validator_withdrawability_delay

// withdrawal sweep
export const MAXIMUM_CHECKED_FOR_SWEEP_PER_BLOCK = 2 ** 14 // unofficial, https://launchpad.ethereum.org/en/withdrawals#payout-frequency
export const MAXIMUM_CHECKED_FOR_SWEEP_PER_EPOCH = SLOTS_PER_EPOCH * MAXIMUM_CHECKED_FOR_SWEEP_PER_BLOCK // unofficial, https://launchpad.ethereum.org/en/withdrawals#payout-frequency
export const MAXIMUM_SWEPT_PER_BLOCK = 16 // unofficial, maximum number of withdrawals that can be processed in a single block https://launchpad.ethereum.org/en/withdrawals#payout-frequency
export const MAXIMUM_SWEPT_PER_EPOCH = SLOTS_PER_EPOCH * MAXIMUM_SWEPT_PER_BLOCK // unofficial

/**
 * misc.
 */

// safe approximation
export const FINALIZED_EPOCH_OFFSET = 5

/**
 * deprecated
 */

// ?
export const PERSISTENT_COMMITTEE_PERIOD = 2 ** 11 // 2048 epochs ~9 days | minimum service time https://notes.ethereum.org/@hww/lifecycle#4331-Minimum-service-time
export const SHARD_COMMITTEE_PERIOD = 256 // useless | official ✅ see https://eth2book.info/capella/part3/config/configuration/#shard_committee_period
