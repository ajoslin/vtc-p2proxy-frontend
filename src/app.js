import { Component, h } from 'preact'
import qs from 'querystring'
import ServerStats from './components/server'
import WalletStats from './components/wallet'
import walletValidator from 'wallet-address-validator'

console.log('well?', process.env.HELLO_THERE_SIR)

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      walletError: null,
      walletAddress: ''
    }
    const { address } = qs.parse(window.location.search.substring(1))
    if (address) {
      this.processAddress(address)
    }
  }

  handleSubmit = ev => {
    ev.preventDefault()
    this.processAddress(ev.target.querySelector('input').value)
  }

  processAddress(value) {
    const valid = walletValidator.validate(value, 'vtc', 'both')
    this.setState({
      walletError: !valid,
      walletAddress: valid ? value : ''
    })
    if (valid) {
      window.history.replaceState(
        {},
        '',
        window.location.pathname + '?address=' + value
      )
    }
  }

  render(props, state) {
    return (
      <div>
        <div class="pt2">
          <ServerStats />
        </div>

        <h4>Wallet {state.walletAddress}</h4>

        {!state.walletAddress && (
          <form onSubmit={this.handleSubmit}>
            <input
              autofocus
              value={state.walletAddress}
              type="text"
              placeholder="Enter Wallet Address"
            />
            <button type="submit">Use Address</button>
            <p>{state.walletError && 'Please enter a valid wallet address.'}</p>
          </form>
        )}

        {state.walletAddress && (
          <div>
            <button onClick={() => this.setState({ walletAddress: '' })}>
              Change Address
            </button>
            <WalletStats
              address={state.walletAddress}
              key={state.walletAddress}
            />
          </div>
        )}
      </div>
    )
  }
}
