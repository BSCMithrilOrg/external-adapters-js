import { AdapterError, Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/ea-bootstrap'
import { makeExecute } from '../../src'
import { TInputParameters } from '../../src/endpoint'

describe('execute', () => {
  const jobID = '1'
  const execute = makeExecute()
  process.env.API_KEY = process.env.API_KEY ?? 'test_api_key'

  describe('validation error', () => {
    const requests = [
      { name: 'empty data', testData: { data: { endpoint: 'forex' } } },
      { name: 'missing quote', testData: { data: { endpoint: 'forex', base: 'GBP' } } },
      { name: 'missing base', testData: { data: { endpoint: 'forex', quote: 'USD' } } },
      { name: 'empty data', testData: { data: { endpoint: 'commodities' } } },
      { name: 'missing quote', testData: { data: { endpoint: 'commodities', base: 'WTI' } } },
      { name: 'missing base', testData: { data: { endpoint: 'commodities', quote: 'USD' } } },
    ]

    requests.forEach((req) => {
      it(`${req.name}`, async () => {
        try {
          await execute(req.testData as AdapterRequest<TInputParameters>, {})
        } catch (error) {
          const errorResp = Requester.errored(jobID, error as AdapterError)
          assertError({ expected: 400, actual: errorResp.statusCode }, errorResp, jobID)
        }
      })
    })
  })
})
