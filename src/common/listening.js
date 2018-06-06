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
  off = (event, handler = null) => {
    if (!(event in this.eventHandlers)) {
      return
    }

    if (handler === null) {
      this.eventHandlers[event] = []
    } else {
      this.eventHandlers[event] = this.eventHandlers[event].filter(x => handler)
    }
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
