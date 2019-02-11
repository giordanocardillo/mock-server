module.exports = resName => {
  'use strict'

  const jsonServer = require('json-server')
  const express = require('express')
  const db = jsonServer.router(`${__dirname}/../data/${resName}.json`).db
  const router = express.Router()

  return { db, router }
}
