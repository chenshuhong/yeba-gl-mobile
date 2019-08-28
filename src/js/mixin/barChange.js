let barChangeMixin = {
  data () {
    return {
      barId: ''
    }
  },
  created () {
    this.barId = this.$barId
  },
  activated () {
    console.log('barchange mixin activiated', this.barId, this.$barId)
    if (this.barId) {
      if (this.barId !== this.$barId) {
        this.onBarChange()
        this.barId = this.$barId
      }
    } else {
      this.barId = this.$barId
    }
  },
  methods: {
    onBarChange () {
      console.error('you must overwrite this method when change bar')
    }
  }
}
export default barChangeMixin
