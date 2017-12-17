import { Component, h } from 'preact'
import qs from 'querystring'
import Router from 'preact-router'
import WalletStats from '../../components/wallet'
import walletValidator from 'wallet-address-validator'

export default class WalletPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      address: ''
    }
  }

  componentDidMount() {
    const { address } = this.props
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
      error: !valid,
      address: valid ? value : ''
    })
    if (valid) {
      Router.route('/stats/' + value, true)
    }
  }

  render(props, state) {
    return (
      <div>
        <div className="flex items-center">
          <h2>
            {state.address ? 'Wallet Stats' : 'Enter Wallet Address for Stats'}
          </h2>
          {state.address && (
            <a
              className="ml3 blue pointer"
              onClick={() => this.setState({ address: '' })}
            >
              Change Address
            </a>
          )}
        </div>

        {!state.address && (
          <div className="mw-100 w8">
            {state.error && (
              <div className="w-100 pa2 ba b--dark-red">
                Please enter a valid wallet address.
              </div>
            )}
            <form onSubmit={this.handleSubmit} className="flex-ns w-100">
              <input
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
                className="ba b--light-gray h2 pa2 flex-auto w-100 w-auto-ns"
                autofocus
                type="text"
                placeholder="Wallet Address"
              />
              <button
                className="f6 link dim ph3 pv2 dib white bg-dark-green"
                type="submit"
              >
                {state.address ? 'Change Address' : 'Use Address'}
              </button>
            </form>
          </div>
        )}

        {state.address && (
          <WalletStats address={state.address} key={state.address} />
        )}
      </div>
    )
  }
}
