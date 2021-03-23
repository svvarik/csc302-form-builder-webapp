import { PublishForm, HelloWorld, SaveRequest } from '../requests'

describe('basic api tests', () => {
  it('ping hello world', async () => {
    const response = await HelloWorld()
    expect(response).toBe('Hello World!')
  })

  it('publish form template', async () => {
      const response = await PublishForm("{'HI', []}")
      if (response.status) {
        // proper axios response
        expect(response.status).toBe(200)
      } else {
        // it errored
        console.error(response)
        fail()
      }
    })

  it('save form', async () => {
      const response = await SaveRequest("{'HI', []}")
      if (response.status) {
        // proper axios response
        expect(response.status).toBe(200)
      } else {
        // it errored
        console.error(response)
        fail()
      }
    })
})
