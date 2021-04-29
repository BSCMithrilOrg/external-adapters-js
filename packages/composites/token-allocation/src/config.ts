import { util, Requester } from '@chainlink/ea-bootstrap'
import { AdapterImplementation } from '@chainlink/types'
import Amberdata from '@chainlink/amberdata-adapter'
import CoinApi from '@chainlink/coinapi-adapter'
import CoinGecko from '@chainlink/coingecko-adapter'
import CoinMarketCap from '@chainlink/coinmarketcap-adapter'
import CoinPaprika from '@chainlink/coinpaprika-adapter'
import CryptoCompare from '@chainlink/cryptocompare-adapter'
import Kaiko from '@chainlink/kaiko-adapter'
import Nomics from '@chainlink/nomics-adapter'
import { Config, SourceRequestOptions } from './types'

/**
 * @swagger
 * securityDefinitions:
 *  environment-variables:
 *    adapter:
 *      oneOf:
 *        - AMBERDATA_DATA_PROVIDER_URL
 *        - COINAPI_DATA_PROVIDER_URL
 *        - COINGECKO_DATA_PROVIDER_URL
 *        - COINMARKETCAP_DATA_PROVIDER_URL
 *        - COINPAPRIKA_DATA_PROVIDER_URL
 *        - CRYPTOCOMPARE_DATA_PROVIDER_URL
 *        - KAIKO_DATA_PROVIDER_URL
 *        - NOMICS_DATA_PROVIDER_URL
 *    DEFAULT_QUOTE:
 *      required: false
 *      default: USD
 *    DEFAULT_METHOD:
 *      required: false
 *      default: price
 *      enum:
 *        - price
 *        - marketcap
 */

export const adapters: AdapterImplementation[] = [
  Amberdata,
  CoinApi,
  CoinGecko,
  CoinMarketCap,
  CoinPaprika,
  CryptoCompare,
  Kaiko,
  Nomics,
]

export type Source = typeof adapters[number]['NAME']

export const DEFAULT_TOKEN_DECIMALS = 18
export const DEFAULT_TOKEN_BALANCE = 1

export const ENV_DATA_PROVIDER_URL = 'DATA_PROVIDER_URL'

export const getURL = (prefix: string, required = false) =>
  required
    ? util.getRequiredEnv(ENV_DATA_PROVIDER_URL, prefix)
    : util.getEnv(ENV_DATA_PROVIDER_URL, prefix)

export const makeConfig = (prefix = ''): Config => {
  const sources: SourceRequestOptions = {}

  for (const a of adapters) {
    const name = a.NAME
    const url = getURL(name.toUpperCase())
    if (url) {
      const defaultConfig = Requester.getDefaultConfig(prefix)
      defaultConfig.api.baseURL = url
      defaultConfig.api.method = 'post'
      sources[name.toLowerCase()] = defaultConfig
    }
  }

  return {
    sources,
    defaultMethod: util.getEnv('DEFAULT_METHOD', prefix) || 'price',
    defaultQuote: util.getEnv('DEFAULT_QUOTE') || 'USD',
  }
}

export const makeOptions = ({ sources }: Config) => {
  const sourceOptions = Object.keys(sources).map((s) => s.toLowerCase())
  return {
    source: sourceOptions,
  }
}