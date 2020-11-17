/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const pog = require('./server/pog')
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

// POG-Portal
app.get('/pog', (_, res) => {
  res.json({ text: 'succeeded' })
})
app.get('/pog/top', async (req, res) => {
  res.json(await pog('/top', req))
})
app.get('/pog/person', async (req, res) => {
  res.json(await pog('/person', req))
})
app.get('/pog/horse', async (req, res) => {
  res.json(await pog('/horse', req))
})
app.get('/pog/raceUrl', async (req, res) => {
  res.json(await pog('/raceUrl', req))
})
app.post('/pog/race', async (req, res) => {
  req.query.url = req.body.url
  res.json(await pog('/race', req))
})

app.listen(5000, () => {
  console.log('App started')
})

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
