const assert = require('power-assert')
const logger = require('@acyort/logger')()
const processor = require('../../lib/utility/processor')

describe('processor', () => {
  it('test', async () => {
    const test = []
    const error = []
    const acyort = {
      workflow: {
        scripts: [
          () => new Promise((resolve) => {
            setTimeout(() => {
              test.push('b')
              resolve()
            }, 100)
          }),
          () => test.push('a'),
          () => { throw new Error('error') },
        ],
      },
      logger,
    }

    try {
      await processor.call(acyort)
    } catch (e) {
      error.push(e.message)
    }

    assert(test.join('') === 'ba')
    assert(error.join('') === 'error')

    acyort.workflow.scripts = []

    try {
      await processor.call(acyort)
    } catch (e) {
      error.push(e.message)
    }

    assert(test.join('') === 'ba')
    assert(error.join('') === 'error')
  })
})
