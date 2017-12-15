export default function poll(fn, callback, time = 5000) {
  let stopped = false

  run()

  return function stop() {
    stopped = true
  }

  function run() {
    if (stopped) return
    return fn()
      .then(result => !stopped && callback(null, result))
      .catch(error => !stopped && callback(error))
      .then(() => !stopped && setTimeout(run, time))
  }
}
