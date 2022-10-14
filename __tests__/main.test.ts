import * as core from '@actions/core'
import {run} from '../src/main'

jest.mock('@actions/core')

describe('When running the action', () => {
  const fakeSetoutput = core.setOutput as jest.MockedFunction<
    typeof core.setOutput
  >

  test('it should set the relese-url output parameter', async () => {
    await run()
    expect(fakeSetoutput).toHaveBeenCalledWith('release-url', expect.anything())
  })
})
