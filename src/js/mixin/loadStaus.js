let loadStatusMixin = {
  data () {
    return {
      list: [],
      page: 1,
      loadStatus: {
        type: 0,
        desc: '正在加载...'
      }
    }
  },
  methods: {
    onloadStart (desc) {
      this.loadStatus = {
        type: 0,
        desc: desc || '正在加载..'
      }
    },
    onLoadSuccess (desc) {
      this.loadStatus = {
        type: 1,
        desc: desc || '暂无数据,点击重新加载'
      }
    },
    onLoadError (desc) {
      this.loadStatus = {
        type: 2,
        desc: desc || '加载失败,点击重新加载'
      }
      this.$refs.scroll.forceUpdate()
    }
  },
  activated () {
    if (this.$refs.scroll) {
      this.$refs.scroll.forceUpdate()
    }
  }
}
export default loadStatusMixin
