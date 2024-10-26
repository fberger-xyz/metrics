import { FunctionReturn } from '@/types'
import { NextResponse } from 'next/server'

// https://blue-api.morpho.org/graphql
// from frontend https://app.morpho.org/vault?vault=0xd63070114470f685b75B74D60EEc7c1113d33a3D&network=mainnet

// graphql?operationName=getVaultTotalDepositsTimeser…2c7a7136d1a6897b80c477f02dc591f99a75c703%22%7D%7D
// graphql?operationName=getVaultReallocates&variable…84989b0af776f380b4a70b8426230a13b1f02a7a%22%7D%7D
// graphql?operationName=getVaultPositions&variables=…71dbbdaff6f6d83ea8b2fd7b6ccab868d4e1bb72%22%7D%7D
// graphql?operationName=getTransactions&variables=%7…b7b56789b60a7f38864cdffb867614267e91dffa%22%7D%7D
// graphql?operationName=GetToken&variables=%7B%22add…7912403bab3be328a7b797b11dfafa8d09b4943a%22%7D%7D
// graphql?operationName=GetBundlerConfiguration&vari…b6cc5445db4346a441f797dc22a275434457bb2f%22%7D%7D
// graphql?operationName=getBlueMetrics&variables=%7B…62335c815d2681d18a47542d9a0f51e7679272f4%22%7D%7D
// metrics?format=number&apysFormat=number
// graphql?operationName=getMarkets&variables=%7B%22f…98c4164617659f1d5184648605934ba693cbae2d%22%7D%7D
// graphql?operationName=getVaults&variables=%7B%22fi…87463f2a03f9998617ea9d077015919c9f3e3509%22%7D%7D
// graphql?operationName=getVaultApyTimeseries&variab…07dc41d875f402d1f659841934a271b02dc5abbf%22%7D%7D
// graphql?operationName=getVaults&variables=%7B%22fi…87463f2a03f9998617ea9d077015919c9f3e3509%22%7D%7D

// https://blue-api.morpho.org/graphql?operationName=getTransactions&variables=%7B%22first%22%3A10%2C%22skip%22%3A30%2C%22where%22%3A%7B%22chainId_in%22%3A%5B1%5D%2C%22vaultAddress_in%22%3A%5B%220xd63070114470f685b75B74D60EEc7c1113d33a3D%22%5D%7D%2C%22orderBy%22%3A%22Timestamp%22%2C%22orderDirection%22%3A%22Desc%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22fd00c75aaa65ae49035b8c41b7b56789b60a7f38864cdffb867614267e91dffa%22%7D%7D
// https://blue-api.morpho.org/graphql?operationName=getTransactions&variables={"first":10,"skip":30,"where":{"chainId_in":[1],"vaultAddress_in":["0xd63070114470f685b75B74D60EEc7c1113d33a3D"]},"orderBy":"Timestamp","orderDirection":"Desc"}&extensions={"persistedQuery":{"version":1,"sha256Hash":"fd00c75aaa65ae49035b8c41b7b56789b60a7f38864cdffb867614267e91dffa"}}

// query {
//     transactions(
//       first: 3
//       skip: 0
//       orderBy: Timestamp
//       orderDirection: Desc
//     ) {
//       pageInfo {
//         count
//         countTotal
//       }
//       items {
//         blockNumber
//         chain {
//           network
//         }
//         id
//         timestamp
//         hash
//         logIndex
//         type
//       }
//     }
//   }

// {
//     "data": {
//       "transactions": {
//         "pageInfo": {
//           "count": 3,
//           "countTotal": 574384
//         },
//         "items": [
//           {
//             "blockNumber": 21153095,
//             "chain": {
//               "network": "base"
//             },
//             "id": "2499c428-76c3-46f0-a873-05f73332509e",
//             "timestamp": 1729095537,
//             "hash": "0x4d8f9b79e0320caee51422bdb956d99f05d099eae72581e24430a3139a01aa4d",
//             "logIndex": 173,
//             "type": "MarketSupplyCollateral"
//           },
//           {
//             "blockNumber": 21153095,
//             "chain": {
//               "network": "base"
//             },
//             "id": "065de8d0-658f-44d8-965c-808af463db4c",
//             "timestamp": 1729095537,
//             "hash": "0x4d8f9b79e0320caee51422bdb956d99f05d099eae72581e24430a3139a01aa4d",
//             "logIndex": 177,
//             "type": "MarketBorrow"
//           },
//           {
//             "blockNumber": 21153086,
//             "chain": {
//               "network": "base"
//             },
//             "id": "252897a7-d2c0-43f0-8946-28c5071c881e",
//             "timestamp": 1729095519,
//             "hash": "0x3e1a351c88b46227083c70182515395e1e99d9a5e32ae31a604f476a14da0249",
//             "logIndex": 146,
//             "type": "MetaMorphoDeposit"
//           }
//         ]
//       }
//     }
//   }

export async function GET() {
    const responseJson: FunctionReturn<null> = { success: true, raw: null, error: '', ts: Date.now() }
    const morphoApiRoot = 'https://api.morpho.org'
    const morphoAnalytics = `${morphoApiRoot}/analytics`
    try {
        const response = await fetch(morphoAnalytics, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            next: { revalidate: false }, // https://nextjs.org/docs/app/api-reference/functions/fetch#optionsnextrevalidate
        })
        responseJson.raw = await response.json()
    } catch (error) {
        responseJson.success = false
        responseJson.error = 'Unexpected error'
    }
    responseJson.ts = Date.now()
    return NextResponse.json(responseJson)
}
