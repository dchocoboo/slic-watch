'use strict'

const Ajv = require('ajv')
const { test } = require('tap')

const defaultConfig = require('../default-config')
const { pluginConfigSchema, slicWatchSchema, iso8601Pattern } = require('../config-schema')

test('Default config conforms to the config schema', (t) => {
  const slicWatchConfig = {
    ...defaultConfig,
    topicArn: 'dummy-topic-arn'
  }

  const ajv = new Ajv()
  const slicWatchValidate = ajv.compile(slicWatchSchema)
  const slicWatchValid = slicWatchValidate(slicWatchConfig)
  t.ok(slicWatchValid, slicWatchValidate.errors)

  const pluginValidate = ajv.compile(pluginConfigSchema)
  const testConfig = { slicWatch: slicWatchConfig }
  const pluginValid = pluginValidate(testConfig)
  t.ok(pluginValid, pluginValidate.errors)

  t.end()
})

test('Default config conforms to the config schema without topicArn', (t) => {
  const slicWatchConfig = {
    ...defaultConfig
  }

  const ajv = new Ajv()
  const slicWatchValidate = ajv.compile(slicWatchSchema)
  const slicWatchValid = slicWatchValidate(slicWatchConfig)
  t.ok(slicWatchValid, slicWatchValidate.errors)

  const pluginValidate = ajv.compile(pluginConfigSchema)
  const testConfig = { slicWatch: slicWatchConfig }
  const pluginValid = pluginValidate(testConfig)
  t.ok(pluginValid, pluginValidate.errors)

  t.end()
})

test('Test dashboard time period regex', (t) => {
  const re = new RegExp(iso8601Pattern)
  t.ok(re.test('2020-01-01T00:00:00.000Z'))
  t.end()
})
