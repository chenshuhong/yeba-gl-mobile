<template>
  <div class="scroll-wrapper">
    <slot name="top">
    </slot>
    <div ref="wrapper" class="list-wrapper">
      <div class="scroll-content" ref="listWrapper">
        <slot>
          <ul class="list-content">
            <li @click="clickItem($event,item)" class="list-item" v-for="item in data">{{item}}</li>
          </ul>
        </slot>
        <slot name="pullup"
              :pullUpLoad="pullUpLoad"
              :isPullUpLoad="isPullUpLoad">
          <div class="pullup-wrapper" v-if="pullUpLoad&&data.length>0">
            <div class="before-trigger" v-if="!isPullUpLoad">
              <span>{{pullUpTxt}}</span>
            </div>
            <div class="after-trigger" v-else>
              <span class="weui-loading"></span>
            </div>
          </div>
        </slot>
      </div>
      <slot name="pulldown"
            :pullDownRefresh="pullDownRefresh"
            :pullDownStyle="pullDownStyle"
            :beforePullDown="beforePullDown"
            :isPullingDown="isPullingDown"
            :bubbleY="bubbleY"
      >
        <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
          <div class="before-trigger" v-if="beforePullDown">
            <span>下拉刷新</span>
          </div>
          <div class="after-trigger" v-else>
            <span class="weui-loading" v-if="isPullingDown"></span>
            <div v-else><span>{{refreshTxt}}</span></div>
          </div>
        </div>
      </slot>
      <div class="csh-status" @click="reLoad" v-if="data.length===0">
        <img src="../assets/load_status.png"/>
        <br/>
        <span v-html="loadStatus.desc"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  const COMPONENT_NAME = 'scroll'
  const DIRECTION_H = 'horizontal'
  const DIRECTION_V = 'vertical'
  export default {
    name: COMPONENT_NAME,
    props: {
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      probeType: {
        type: Number,
        default: 0
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      listenBeforeScroll: {
        type: Boolean,
        default: false
      },
      direction: {
        type: String,
        default: DIRECTION_V
      },
      scrollbar: {
        type: null,
        default: false
      },
      pullDownRefresh: {
        type: null,
        default: true
      },
      pullUpLoad: {
        type: null,
        default: false
      },
      startY: {
        type: Number,
        default: 0
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      freeScroll: {
        type: Boolean,
        default: false
      },
      marginTop: {
        type: String,
        default: '0px'
      },
      loadStatus: {
        type: Object,
        default () {
          return {
            type: 0,
            desc: '正在加载'
          }
        }
      },
    },
    data () {
      return {
        beforePullDown: true,
        isRebounding: false,
        isPullingDown: false,
        isPullUpLoad: false,
        pullUpDirty: true,
        pullDownStyle: '',
        bubbleY: 0,
      }
    },
    computed: {
      pullUpTxt () {
        const moreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more) || '正在加载'
        const noMoreTxt = (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore) || '没有更多数据了'
        return this.pullUpDirty ? moreTxt : noMoreTxt
      },
      refreshTxt () {
        return (this.pullDownRefresh && this.pullDownRefresh.txt) || '刷新成功'
      }
    },
    created () {
      this.pullDownInitTop = -35
    },
    mounted () {
      setTimeout(() => {
        this.initScroll()
      }, 20)
    },
    methods: {
      getRect (el) {
        if (el instanceof window.SVGElement) {
          let rect = el.getBoundingClientRect()
          return {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
          }
        } else {
          return {
            top: el.offsetTop,
            left: el.offsetLeft,
            width: el.offsetWidth,
            height: el.offsetHeight
          }
        }
      },
      initScroll () {
        if (!this.$refs.wrapper) {
          return
        }
        if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
          this.$refs.listWrapper.style.minHeight = `${this.getRect(this.$refs.wrapper).height + 1}px`
        }
        let options = {
          probeType: this.probeType,
          click: this.click,
          scrollY: this.freeScroll || this.direction === DIRECTION_V,
          scrollX: this.freeScroll || this.direction === DIRECTION_H,
          scrollbar: this.scrollbar,
          pullDownRefresh: this.pullDownRefresh,
          pullUpLoad: this.pullUpLoad,
          startY: this.startY,
          freeScroll: this.freeScroll,
          preventDefaultException: {
            className: /(^|\s)mask(\s|$)/
          }
        }
        this.scroll = new BScroll(this.$refs.wrapper, options)
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }
        if (this.listenBeforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScrollStart')
          })
        }
        if (this.pullDownRefresh) {
          this._initPullDownRefresh()
        }
        if (this.pullUpLoad) {
          this._initPullUpLoad()
        }
      },
      disable () {
        this.scroll && this.scroll.disable()
      },
      enable () {
        this.scroll && this.scroll.enable()
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      },
      scrollTo () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      clickItem (e, item) {
        console.log(e)
        this.$emit('click', item)
      },
      destroy () {
        this.scroll.destroy()
      },
      forceUpdate (dirty) {
        if (this.pullDownRefresh && this.isPullingDown) {
          this.isPullingDown = false
          this._reboundPullDown().then(() => {
            this._afterPullDown()
          })
        } else if (this.pullUpLoad && this.isPullUpLoad) {
          this.isPullUpLoad = false
          this.scroll.finishPullUp()
          this.pullUpDirty = dirty
          this.refresh()
        } else {
          this.refresh()
        }
      },
      _initPullDownRefresh () {
        this.scroll.on('pullingDown', () => {
          this.beforePullDown = false
          this.isPullingDown = true
          this.$emit('pullingDown')
        })
        this.scroll.on('scroll', (pos) => {
          if (this.beforePullDown) {
            this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
            this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
          } else {
            this.bubbleY = 0
          }
          if (this.isRebounding) {
            this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
          }
        })
      },
      _initPullUpLoad () {
        this.scroll.on('pullingUp', () => {
          this.isPullUpLoad = true
          this.$emit('pullingUp')
        })
      },
      _reboundPullDown () {
        const {stopTime = 600} = this.pullDownRefresh
        return new Promise((resolve) => {
          setTimeout(() => {
            this.isRebounding = true
            this.scroll.finishPullDown()
            resolve()
          }, stopTime)
        })
      },
      _afterPullDown () {
        setTimeout(() => {
          this.pullDownStyle = `top:${this.pullDownInitTop}px`
          this.beforePullDown = true
          this.isRebounding = false
          this.refresh()
        }, this.scroll.options.bounceTime)
      },
      reLoad () {
        if (this.loadStatus.type !== 0) {
          this.$emit('reLoadData')
        }
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          console.log('update scroll')
          this.forceUpdate(true)
        }, this.refreshDelay)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .scroll-wrapper
    display flex
    flex-direction column
    position relative
    height 100%
    width 100%
    overflow hidden
  .list-wrapper
    position: relative
    width: 100%
    height 100%
    overflow: hidden
    .scroll-content
      position: relative
      overflow: hidden
    .list-content
      position: relative
      z-index: 10
      background: #fff
      .list-item
        height: 60px
        line-height: 60px
        font-size: 18px
        padding-left: 20px
        border-bottom: 1px solid #e5e5e5
  .pulldown-wrapper
    position: absolute
    width: 100%
    left: 0
    display: flex
    justify-content center
    align-items center
    transition: all
    color: #c0c0c0
    font-size: 4vw
    z-index -1
    .after-trigger
      margin-top: 10px
  .pullup-wrapper
    width: 100%
    display: flex
    justify-content center
    align-items center
    padding: 2vw 0
    color: #c0c0c0
    font-size: 4vw

  .csh-status
    position: absolute
    top 0
    left 0
    width: 100%
    height: 100%
    z-index: 5
    text-align: center
    img
      height:60vw
      margin-top: 20vw
      margin-bottom: 8vw
    span
      color: #929297
      font-size: 4vw
</style>
