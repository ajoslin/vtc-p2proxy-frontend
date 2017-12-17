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
    const items = [
      ['Shares', state.server && Math.round(state.server.shares * 1e5) / 1e5],
      ['Active', delve(state.server, 'active')],
      ['Backlog', state.backlog],
      ['Last Txn', delve(state.lastpaid, '0.0')]
    ]

    return <StatTable items={items} />
  }
}
/*
      <table class="f6 w-100 mw8 center tc" cellspacing="0">
        <thead>
          <tr>
            <th class="fw6 bb b--black-20 t1 pb3 pr3">Shares</th>
            <th class="fw6 bb b--black-20 t1 pb3 pr3">Active</th>
            <th class="fw6 bb b--black-20 t1 pb3 pr3">Backlog</th>
            <th class="fw6 bb b--black-20 t1 pb3 pr3">Last Paid</th>
          </tr>
        </thead>
        <tbody class="1h-copy">
          <tr>
            <td class="pv3 pr3 bb b--black-20">
              {state.server && Math.round(state.server.shares * 1000) / 1000}
            </td>
            <td class="pv3 pr3 bb b--black-20">
              {state.server && state.server.active}
            </td>
            <td class="pv3 pr3 bb b--black-20">{state.backlog}</td>
            <td class="pv3 pr3 bb b--black-20">
              txid:
               {state.lastpaid && state.lastpaid[0]}
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

*/
