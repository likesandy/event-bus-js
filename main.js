class TMitt {
  constructor() {
    this.emitter = {}
    this.all = {
      clear: () => {
        this.emitter = {}
      }
    }
  }

  on(eventName, callbackFn) {
    let eventFns = this.emitter[eventName]
    if (!eventFns) {
      eventFns = []
      this.emitter[eventName] = eventFns
    }
    eventFns.push(callbackFn)
  }

  emit(eventName, ...args) {
    const eventFns = this.emitter[eventName]
    if (!eventFns) return
    for (const key in this.emitter) {
      if (key === '*') {
        eventFns.forEach(fn => fn(eventName, ...args))
        break
      }
    }
    eventFns.forEach(fn => fn(...args))
  }

  off(eventName, callbackFn) {
    const eventFns = this.emitter[eventName]
    if (!eventFns) return
    eventFns.forEach((fn, index) => {
      if (fn === callbackFn) {
        eventFns.splice(index, 1)
        return
      }
    })
  }

}

const mitt = new TMitt()

// let btn = document.querySelector('button')

// btn.addEventListener('click', () => {
//   mitt.emit('foo', 'abc', 123, {})
// })

function foo(...args) {
  console.log('a监听到了', ...args)
}

mitt.on('foo', foo)
mitt.on('foo', () => {
  console.log('b监听到了')
})
mitt.on('abc', () => {
  console.log('c监听到了')
})

// mitt.on('*', (type, e) => {
//   console.log(type, e);
// })

setTimeout(() => {
  mitt.off('foo', foo)
}, 3000);

setTimeout(() => {
  mitt.all.clear()
}, 5000);
