import { Requester, Validator } from '@chainlink/ea-bootstrap'
import type { ExecuteWithConfig, Config, InputParameters } from '@chainlink/ea-bootstrap'

export const supportedEndpoints = ['nft-floor', 'nft-floor-price']

export type TInputParameters = {
  network?: string
  contractAddress: string
  start: string
  end: string
}
export const inputParameters: InputParameters<TInputParameters> = {
  network: {
    required: false,
    description: 'The blockchain network to get data from',
    default: 'ethereum-mainnet',
    type: 'string',
    options: ['ethereum-mainnet', 'polygon-mainnet'],
  },
  contractAddress: {
    description: 'The NFT contract address',
    type: 'string',
    required: true,
  },
  start: {
    required: true,
    description: 'The beginning of the time window (inclusive, yyyy-mm-dd hh:mm:ss)',
    type: 'string',
  },
  end: {
    required: true,
    description: 'The end of the time window (inclusive, yyyy-mm-dd hh:mm:ss)',
    type: 'string',
  },
}

export interface ResponseSchema {
  floorPriceDailyValue: [
    {
      date: string
      multiplier: number
      priceStdDev: number
      logFloorPrice: number
      adjustedFloorPrice: number
    },
  ]
}

export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const network = validator.validated.data.network
  const contractAddress = validator.validated.data.contractAddress
  const start = validator.validated.data.start
  const end = validator.validated.data.end

  const baseURL = `${config.adapterSpecificParams?.nftBaseURL}/api/nft/v1/GetFloorPriceEstimate`
  const params = {
    networkName: network,
    contractAddress: contractAddress,
    startDay: start,
    endDay: end,
  }

  const options = {
    ...config.api,
    headers: {
      ...(config.api?.headers || {}),
    },
    baseURL,
    params,
  }
  if (config.adapterSpecificParams?.nftApiAuthHeader)
    options.headers['CB-NFT-API-TOKEN'] = String(config.adapterSpecificParams?.nftApiAuthHeader)
  const response = await Requester.request<ResponseSchema>(options)
  const result = Requester.validateResultNumber(response.data, [
    'floorPriceDailyValue',
    0,
    'adjustedFloorPrice',
  ])
  return Requester.success(jobRunID, Requester.withResult(response, result), config.verbose)
}
