import { balance } from '@chainlink/ea-factories'
import { Requester, util } from '@chainlink/ea-bootstrap'
import { Config, Account, ExecuteFactory, RequestConfig } from '@chainlink/types'
import { COINS, isCoinType, isChainType } from '../config'

export const supportedEndpoints = ['balance']

export const description = '[Address Balance Mass Check](https://blockchair.com/api/docs#link_390)'

export const inputParameters = balance.inputParameters

const getBalanceURI = (addresses: string[], coin: string, chain: string) => {
  coin = Requester.toVendorName(coin, COINS)
  if (chain === 'testnet') coin = `${coin}-${chain}`
  return util.buildUrlPath(`/:coin/addresses/balances`, { coin, addresses: addresses.join(',') })
}

const getBalances: balance.GetBalances = async (accounts, config) => {
  const { coin, chain } = accounts[0]
  const addresses = accounts.map((a) => a.address)

  const reqConfig: RequestConfig = {
    ...config.api,
    url: getBalanceURI(addresses, coin as string, chain as string),
  }

  console.log({ reqConfig })
  const response = await Requester.request(reqConfig)
  console.log({ response })

  const toResultWithBalance = (acc: Account) => {
    // NOTE: Blockchair does not return 0 balances
    const balance = String(response.data.data[acc.address] ?? 0)
    return { ...acc, balance }
  }
  const resultWithBalance = accounts.map(toResultWithBalance)

  return {
    payload: response.data,
    result: resultWithBalance,
  }
}

const isSupported: balance.IsSupported = (coin, chain) => isChainType(chain) && isCoinType(coin)

export const makeExecute: ExecuteFactory<Config> = (config?: Config) =>
  balance.make({ ...config, getBalances, isSupported })
