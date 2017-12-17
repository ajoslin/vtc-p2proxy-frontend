import { h, Component } from 'preact'
import callAll from 'call-all-fns'
import delve from 'dlv'
import api from '../../api'
import poll from '../../util/poll'
import StatTable from '../stat-table'

export default class ServerStats extends Component {
  state = {
    server: {},
    backlog: 0,
    lastpaid: []
  }

  componentDidMount() {
    this.stop = callAll([
      poll(
        api.server,
        (err, result) => this.setState({ server: result }),
        1000
      ),
      poll(api.backlog, (err, result) => this.setState({ backlog: result })),
      poll(api.lastpaid, (err, result) => this.setState({ lastpaid: result }))
    ])
  }

  componentWillUnmount() {
    this.stop()
  }

  render(props, state) {
    const lastTxn = delve(state.lastpaid, '0.0')
    const items = [
      ['Shares', state.server && Math.round(state.server.shares * 1e5) / 1e5],
      ['Active', delve(state.server, 'active')],
      ['Backlog', state.backlog],
      [
        'Last Txn',
        `<a className='blue' href="http://bitinfocharts.com/vertcoin/tx/${lastTxn}">${lastTxn}</a>`
      ]
    ]

    return <StatTable items={items} />
  }
}
