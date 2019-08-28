let eventBusMixin = {
  computed: {
    eventbus () {
      return this.$store.state.eventbus
    }
  },
  watch: {
    eventbus (data) {
      console.log('event', data)
      this.onEventBus(data)
    }
  },
  methods: {
    onEventBus (data) {
      console.error('you must declear some event')
    }
  }
}
export default eventBusMixin
