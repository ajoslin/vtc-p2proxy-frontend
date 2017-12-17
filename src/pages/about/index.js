import { h } from 'preact'
import { Link } from 'preact-router'
import StatTable from '../../components/stat-table'

export default function About() {
  const items = [
    ['Stratum', 'stratum+tcp://p2proxy.vertcoin.org:9171'],
    ['Username', 'Your VTC Payout Address'],
    ['Password', 'Anything'],
    ['Payout Threshold', '0.1 VTC']
  ]

  return (
    <div>
      <h2>About</h2>
      <p>
        P2Proxy Pool is a Capped Pay-Per-Share with Recent Backpay (<a href="http://eligius.st/wiki/index.php/Capped_PPS_with_Recent_Backpay">
          CPPSRB
        </a>) proxy for <a href="http://p2pool.org/">P2Pool</a> network 1.
      </p>
      <p>
        It's most useful if you're a small miner and are struggling to get
        shares, but still wish to mine as part of the larger P2Pool network.
        Essentially, it's a centralized pool that mines like one big miner on
        P2Pool, then pays out via pay-per-share to its miners.
      </p>
      <p>
        Shares pay to balances every 5 minutes. Mine with the following info:
      </p>

      <StatTable items={items} />

      <Link className="db mt4" href="/stats">
        View Wallet Stats
      </Link>
    </div>
  )
}
