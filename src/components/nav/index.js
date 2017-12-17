import { h } from 'preact'
import { Link } from 'preact-router/match'
import ServerStats from '../server'
import logoUrl from '../../assets/vertcoin-check.png'

export default function Nav() {
  return (
    <nav>
      <div className="pa3 flex items-center">
        <a href="https://vertcoin.org">
          <img src={'/dist' + logoUrl} className="h2" />
        </a>
        <Link className="f3 ml2 pointer black link" href="/">
          <span className="dn di-ns">Vertcoin</span> P2Proxy Pool
        </Link>

        <div className="flex-auto" />

        <Link
          href="/stats"
          className="pointer dark-gray link f4"
          activeClassName="black underline"
        >
          Stats
        </Link>
      </div>
      <ServerStats />
    </nav>
  )
}
