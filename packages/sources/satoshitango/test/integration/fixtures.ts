import nock from 'nock'

export const mockResponseSuccess = (): nock =>
  nock('https://api.satoshitango.com/v3', {
    encodedQueryParams: true,
  })
    .get('/ticker/ARS')
    .reply(
      200,
      (_, request) => ({
        data: {
          ticker: {
            BTC: {
              date: '2021-11-30 16:23:04',
              timestamp: 1638289384,
              bid: 11161854.6,
              ask: 11724743.65,
              high: 0,
              low: 0,
              volume: 0,
            },
            ETH: {
              date: '2021-11-30 16:23:04',
              timestamp: 1638289384,
              bid: 898714.07,
              ask: 945231.42,
              high: 0,
              low: 0,
              volume: 0,
            },
            LTC: {
              date: '2021-11-30 16:23:04',
              timestamp: 1638289384,
              bid: 40837.06,
              ask: 42890.6,
              high: 0,
              low: 0,
              volume: 0,
            },
            XRP: {
              date: '2021-11-30 16:23:04',
              timestamp: 1638289384,
              bid: 194.94,
              ask: 204.69,
              high: 0,
              low: 0,
              volume: 0,
            },
            BCH: {
              date: '2021-11-30 16:23:04',
              timestamp: 1638289384,
              bid: 112124.88,
              ask: 117602.72,
              high: 0,
              low: 0,
              volume: 0,
            },
            ADA: {
              date: '2021-11-30 16:23:04',
              timestamp: 1638289384,
              bid: 307.75,
              ask: 322.81,
              high: 0,
              low: 0,
              volume: 0,
            },
            DOGE: {
              date: '2021-11-30 16:23:04',
              timestamp: 1638289384,
              bid: 42.28,
              ask: 44.38,
              high: 0,
              low: 0,
              volume: 0,
            },
            LINK: {
              date: '2021-11-30 16:23:04',
              timestamp: 1638289384,
              bid: 5058.71,
              ask: 5308.5,
              high: 0,
              low: 0,
              volume: 0,
            },
            UNI: {
              date: '2021-11-30 16:23:04',
              timestamp: 1638289384,
              bid: 4060.62,
              ask: 4267.95,
              high: 0,
              low: 0,
              volume: 0,
            },
            XLM: {
              date: '2021-11-30 16:23:04',
              timestamp: 1638289384,
              bid: 66.73,
              ask: 70.08,
              high: 0,
              low: 0,
              volume: 0,
            },
            SOL: {
              date: '2021-11-30 16:23:04',
              timestamp: 1638289384,
              bid: 41136.32,
              ask: 43275.96,
              high: 0,
              low: 0,
              volume: 0,
            },
            DOT: {
              date: '2021-11-30 16:23:04',
              timestamp: 1638289384,
              bid: 7356.24,
              ask: 7717.83,
              high: 0,
              low: 0,
              volume: 0,
            },
            DAI: {
              date: '2021-11-30 16:23:04',
              timestamp: 1638289384,
              bid: 195.43,
              ask: 205.18,
              high: 0,
              low: 0,
              volume: 0,
            },
            USDC: {
              date: '2021-11-30 16:23:04',
              timestamp: 1638289384,
              bid: 195.48,
              ask: 205.09,
              high: 0,
              low: 0,
              volume: 0,
            },
            USDT: {
              date: '2021-11-30 16:23:04',
              timestamp: 1638289384,
              bid: 195.66,
              ask: 205.27,
              high: 0,
              low: 0,
              volume: 0,
            },
          },
          code: 'success',
        },
      }),
      [
        'Content-Type',
        'application/json',
        'Connection',
        'close',
        'Vary',
        'Accept-Encoding',
        'Vary',
        'Origin',
      ],
    )
