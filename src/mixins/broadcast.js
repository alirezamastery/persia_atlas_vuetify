export const broadcastMixin = {
  data() {
    return {
      broadcastChannel: new BroadcastChannel('persia_atlas'),
      broadcastCallbacks: {},
    }
  },
  methods: {
    addBroadcastCallback(type, callback) {
      this.broadcastCallbacks[type] = callback
      console.log('broadcastCallbacks' , this.broadcastCallbacks)
    },
    sendBroadcastMessage(type, payload = {}) {
      this.broadcastChannel.postMessage({type, payload})
    },
  },
  created() {
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
  beforeDestroy() {
    this.broadcastChannel.close()
  },
}

export default broadcastMixin