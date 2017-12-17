## VTC P2Proxy Frontend

Frontend for VTC P2Proxy.

Enter a valid wallet address or add it in the url via `?address=`

### Develop

- `npm install`.
- Run `npm start` to develop.
- Points to `http://198.204.233.158:9000` by default. set `API` environment variable to change.
- Pushes to master upload to `vtc-p2proxy.netlify.com`

### Build

- `npm run build` to build static app to dist folder.
- Set API environment variable to change server: `API=http://myp2proxy.com npm run build`.

### Info

Alpha testing a new Capped Pay-Per-Share with Recent Backpay (CPPSRB: http://eligius.st/wiki/index.php/Capped_PPS_with_Recent_Backpay) proxy for P2Pool network 1.

URL: https://p2proxy.vertcoin.org/

Stratum: stratum+tcp://p2proxy.vertcoin.org:9171

Username: VTC payout address

Password: anything

Payout threshold: 0.1 VTC

Shares pay to balances every 5 minutes.

The UI is still in development but the pool is otherwise fully functional. It is especially useful if you are a small miner and are struggling to get shares, but still wish to mine as part of the larger P2Pool network. Essentially it's a centralised pool that mines like one big miner on P2Pool, then pays out via pay-per-share to its miners.
