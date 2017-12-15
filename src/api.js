import assert from 'assert'
import qs from 'querystring'
import join from 'url-join'
import fetch from 'isomorphic-unfetch'
import config from './config'

function request(path, opts) {
  opts = opts || {}
  if (opts.query) {
    path += '?' + qs.stringify(opts.query)
  }

  return fetch(join(config.api.base, path), {
    headers: {
      Accept: 'application/json',
      ...opts.headers
    },
    ...opts
  }).then(res => {
    return res.json().then(json => {
      return res.ok ? json : Promise.reject(json)
    })
  })
}

export default {
  server: () => request('server'),
  backlog: () => request('backlog').then(d => d.backlog),
  lastpaid: () => request('lastpaid').then(d => d.lastpaid),
  walletStats,
  walletHashrate,
  walletBalance,
  walletPaid
}

function walletStats(opts) {
  assert.equal(
    typeof opts.address,
    'string',
    'walletStats: string address required'
  )
  return request('stats', {
    query: { address: opts.address }
  })
}

function walletHashrate(opts) {
  assert.equal(
    typeof opts.address,
    'string',
    'walletHashrate: string address required'
  )
  return request('hashrate', {
    query: { address: opts.address }
  }).then(r => r[opts.address])
}

function walletBalance(opts) {
  assert.equal(
    typeof opts.address,
    'string',
    'walletBalance: string address required'
  )
  return request('balance', {
    query: { address: opts.address }
  }).then(r => r[opts.address])
}

function walletPaid(opts) {
  assert.equal(
    typeof opts.address,
    'string',
    'walletPaid: string address required'
  )
  return request('paid', {
    query: { address: opts.address }
  }).then(r => r[opts.address])
}
