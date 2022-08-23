class TMitt {
  constructor() {
    this.emitter = {}
    this.all = {
      clear: () => {
        this.emitter = {}
      }
    }
  }

  /**
   * 
   * @param {string} eventName 监听事件名 
   * @param {function} callbackFn 回调函数
   */
  on(eventName, callbackFn) {
    // 拿到监听事件名的数组,数组中存放一个个函数
    let eventFns = this.emitter[eventName]
    // 第一次进来没有,给value赋值为数组并保存下来
    if (!eventFns) {
      eventFns = []
      this.emitter[eventName] = eventFns
    }
    // 向事件推送对应的回调函数
    eventFns.push(callbackFn)
  }

  /**
   * @param {string} eventName 发出的事件名
   * @param  {...any} args 传入的参数
   */
  emit(eventName, ...args) {
    // 拿到监听事件名的数组,数组中存放一个个函数
    const eventFns = this.emitter[eventName]
    // 如果没有则返回不做任何操作
    if (!eventFns) return
    // 执行事件对应的每一个回调函数(并把参数传过去)
    eventFns.forEach(fn => fn(...args))
  }

  /**
   * 
   * @param {string} eventName 关闭监听的事件名
   * @param {function} callbackFn 回调函数
   */
  off(eventName, callbackFn) {
    // 拿到监听事件名的数组,数组中存放一个个函数
    const eventFns = this.emitter[eventName]
    // 如果没有则返回不做任何操作
    if (!eventFns) return
    // 遍历数组,找到传入的事件名并从数组中移除
    eventFns.forEach((fn, index) => {
      if (fn === callbackFn) {
        eventFns.splice(index, 1)
        return
      }
    })
  }

}

const mitt = new TMitt()

// const btn = document.querySelector('button')

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

setTimeout(() => {
  mitt.off('foo', foo)
}, 3000);

setTimeout(() => {
  mitt.all.clear()
}, 3000);
