import { Config } from '@chainlink/ea-bootstrap'
import { Requester } from '@chainlink/ea-bootstrap'

export const NAME = 'IPFS'
export const DEFAULT_ENDPOINT = 'read'
export const DEFAULT_API_URL = 'https://mithrilverse.infura-ipfs.io/ipfs/'

export const makeConfig = (prefix?: string): Config => {
  const config = Requester.getDefaultConfig(prefix)
  config.api.baseURL = config.api.baseURL || DEFAULT_API_URL
  config.defaultEndpoint = DEFAULT_ENDPOINT
  return config
}
