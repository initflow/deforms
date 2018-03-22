import unenumerable from './unenumerable'

class Listening {
  @unenumerable
  eventHandlers = {}

  @unenumerable
  on = (event, handler) => {
    if (!(event in this.eventHandlers)) {
      this.eventHandlers[event] = []
    }

    this.eventHandlers[event].push(handler)
  }

  @unenumerable
  trigger = (event, data) => {
    if (!(event in this.eventHandlers)) {
      return
    }
    this.eventHandlers[event].forEach(handler => handler(data))
  }
}

export default Listening
