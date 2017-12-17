import { Component, h } from 'preact'
import qs from 'querystring'
import Router from 'preact-router'
import AboutPage from './pages/about'
import StatsPage from './pages/stats'
import WalletStats from './components/wallet'
import Nav from './components/nav'
import walletValidator from 'wallet-address-validator'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      walletError: null,
      walletAddress: ''
    }
  }

  componentDidMount() {
    const { address } = qs.parse(window.location.search.substring(1))
    if (address) {
      this.processAddress(address)
    }
  }

  handleSubmit = ev => {
    ev.preventDefault()
    this.processAddress(document.getElementById('wallet-input'))
  }

  processAddress(value) {
    const valid = walletValidator.validate(value, 'vtc', 'both')
    this.setState({
      walletError: !valid,
      walletAddress: valid ? value : ''
    })
    if (valid) {
      document.getElementById('wallet-input').value = value
      window.history.replaceState(
        {},
        '',
        window.location.pathname + '?address=' + value
      )
    }
  }

  render(props, state) {
    return (
      <div className="mw7 ml-auto mr-auto">
        <Nav />

        <div className="ph2 mt2">
          <Router>
            <AboutPage path="/" />
            <StatsPage path="/stats/:address?" />
          </Router>
        </div>
      </div>
    )
  }
}
