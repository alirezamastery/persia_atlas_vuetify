import Vue from 'vue'

Vue.prototype.$broadcast = {
  broadcastChannel: new BroadcastChannel('persia_atlas'),
  broadcastCallbacks: {},

  addBroadcastCallback(type, callback) {
    this.broadcastCallbacks[type] = callback
  },
  sendBroadcastMessage(type, payload = {}) {
    this.broadcastChannel.postMessage({type, payload})
  },

  setup() {
    this.broadcastChannel.onmessage = event => {
      if (event.data && event.data.type) {
        let callback = this.broadcastCallbacks[event.data.type]
        if (callback && typeof callback === 'function')
          callback(event.data.payload)
        else
          console.log('RECEIVED AN UNKNOWN BROADCAST MESSAGE')
      }
    }
  },
}

Vue.prototype.$broadcast.setup()
