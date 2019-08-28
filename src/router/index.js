import Vue from 'vue'
import Router from 'vue-router'
import util from '@/js/util'
import store from '@/vuex/store'
import config from '@/config/config'

// 登录
import Login from '@/page/Login'
// 酒吧列表
import BarList from '@/page/BarList'
// 首页
import HomeBase from '@/page/Home.vue'
// 首页之第一个
import Home from '@/page/home/Home.vue'
// 首页之酒吧
import BarSet from '@/page/home/BarSet'
// 首页之游戏
import GameList from '@/page/home/GameList'

// 上墙设置
import SqOccupySet from '@/page/SqOccupySet'
import ChatroomSwitch from '@/page/chatroom/ChatroomSwitch'
// 跑马灯
import MarqueesList from '@/page/marquees/MarqueesList'
import MarqueesAdd from '@/page/marquees/MarqueesAdd'
// 聊天室背景
import ChatroomBg from '@/page/chatroombg/ChatroomBg'
// qrcode设置
import Qrcode from '@/page/qrcode/Qrcode'
// 敏感词
import SensitiveList from '@/page/sensitive/SensitiveList'
// 霸屏
import OccupyImgList from '@/page/occupyimg/OccupyImgList'
import OccupyImgAdd from '@/page/occupyimg/OccupyImgAdd'
// 活动
import ActivityAdd from '@/page/activity/ActivityAdd'
import ActivityList from '@/page/activity/ActivityList'
// 消息
import MsgList from '@/page/msg/MsgList'
import MsgAdd from '@/page/msg/MsgAdd'
// 投票
import Vote from '@/page/vote/Vote'
import VoteAdd from '@/page/vote/VoteAdd'
// 奖品
import PrizesAdd from '@/page/prizes/PrizesAdd'
import PrizesList from '@/page/prizes/PrizesList'
// 在线抽奖
import GameOnlineSet from '@/page/gameonline/GameOnlineSet'
// 视频霸屏
import OccupyVideoList from '@/page/occupyvideo/OccupyVideoList'
import OccupyVideoAdd from '@/page/occupyvideo/OccupyVideoAdd'
// 免费发图
import OccupyFree from '@/page/occupyfree/OccupyFree'
// 大话骰
import LiarsDiceAdd from '@/page/liarsdice/LiarsDiceAdd'
import LiarsDiceList from '@/page/liarsdice/LiarsDiceList'
import LiarsDicePrizeSet from '@/page/liarsdice/LiarsDicePrizeSet'
// 跑马场
import HorseAdd from '@/page/horse/HorseAdd'
import HorseList from '@/page/horse/HorseList'
import HorseConditionAdd from '@/page/horse/HorseConditionAdd'
// 礼物
import GiftSet from '@/page/gift/GiftSet'
// 红包
import RedpackSet from '@/page/redpack/RedpackSet'
// 霸屏分享
import OccupyShare from '@/page/occupyshare/OccupyShare'
// 转动魔方
import GameMagicList from '@/page/gamemagic/GameMagicList'
import GameMagicPrizeSet from '@/page/gamemagic/GameMagicPrizeSet'
import GameMagicSet from '@/page/gamemagic/GameMagicSet'
// 摇摇赛跑
import RockRuningSet from '@/page/rockruning/RockRuningSet'
// 砸金蛋
import EggSetting from '@/page/egg/EggSetting'
import EggList from '@/page/egg/EggList'
// 夜聘
import NightHireUse from '@/page/nighthire/NightHireUse'

import NightHireContact from '@/page/nighthire/NightHireContact'
// 酒水牌
import GoodsCategoryAdd from '@/page/goods/GoodsCategoryAdd'
import GoodsCategoryList from '@/page/goods/GoodsCategoryList'
import GoodsList from '@/page/goods/GoodsList'
import GoodsAdd from '@/page/goods/GoodsAdd'

import GoodsUse from '@/page/goods/GoodsUse'

import TableStrick from '@/page/bar/TableStrick'
import MiniAppsQRCode from '@/page/bar/MiniAppsQRCode'
import BarMessage from '@/page/bar/BarMessage'
import WiFi from '@/page/bar/WiFi'

// 票选大赛
import Extension from '@/page/goddess/Extension'
import GoddessDetail from '@/page/goddess/GoddessDetail'
import GoddessList from '@/page/goddess/GoddessList'
import GoddessUse from '@/page/goddess/GoddessUse'
import GoddessAddOne from '@/page/goddess/GoddessAddOne'

// 存酒
import Drink from '@/page/drink/Drink'
import DrinkList from '@/page/drink/DrinkList'
import DrinkAdd from '@/page/drink/DrinkAdd'
import DrinkManager from '@/page/drink/DrinkManager'
import DrinkWaiter from '@/page/drink/DrinkWatiter'
import DrinkGet from '@/page/drink/DrinkGet'
import DrinkEntry from '@/page/drink/DrinkEntry'

// 点舞
import Dance from '@/page/dance/Dance'

// 用户管理
import UserManager from '@/page/bar/UserManager'
import UserComsumption from '@/page/bar/UserComsumption'

// vj播报
import Broadcast from '@/page/broadcast/Broadcast'
import BroadcastUser from '@/page/broadcast/User'
import BroadcastUserAdd from '@/page/broadcast/UserAdd'

// 台号
import TablePrizeUser from '@/page/table/TablePrizeUser'
import TableSetting from '@/page/table/TableSetting'

import Song from '@/page/song/Song'

import BigPicView from '@/page/BigPicView'
import ComponentSetting from '@/page/component/ComponentSet'
import OccupyScreenWordCount from '@/page/occupyscreen/OccupyScreenWordCount'

Vue.use(Router)

const router = new Router({
  routes: [
    // 登录路由
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        unAuth: true,
        title: '登录'
      }
    },

    {
      path: '/',
      redirect: '/BarList'
    },

    {
      path: '/BarList',
      name: 'BarList',
      component: BarList,
      meta: {
        title: '请选择下列酒吧',
        noShowBar: true
      }
    },

    // 酒吧首頁
    {
      path: '/Home',
      name: 'HomeBase',
      component: HomeBase,
      redirect: '/Home/Home',
      children: [
        {
          path: 'Home',
          name: 'HomeHome',
          component: Home
        },
        {
          path: 'GameList',
          name: 'HomeGameList',
          component: GameList
        },
        {
          path: 'BarSet',
          name: 'HomeBarSet',
          component: BarSet
        }
      ]
    },

    // 上墙设置

    {
      path: '/SqOccupySet',
      name: 'SqOccupySet',
      component: SqOccupySet,
      meta: {
        title: '上墙霸屏设置'
      }
    },
    // 聊天室开关
    {
      path: '/chatroom/ChatroomSwitch',
      name: 'ChatroomSwitch',
      component: ChatroomSwitch,
      meta: {
        title: '聊天室功能开关'
      }
    },

    // 跑马灯

    {
      path: '/marquees/MarqueesList',
      name: 'MarqueesList',
      component: MarqueesList,
      meta: {
        title: '走马灯列表'
      }
    },

    {
      path: '/marquees/MarqueesAdd',
      name: 'MarqueesAdd',
      component: MarqueesAdd,
      meta: {
        title: '新增走马灯'
      }
    },

    // 二维码设置
    {
      path: '/qrcode/Qrcode',
      name: 'Qrcode',
      component: Qrcode,
      meta: {
        title: '二维码设置'
      }
    },

    // 聊天室更换背景
    {
      path: '/chatroombg/ChatroomBg',
      name: 'ChatroomBg',
      component: ChatroomBg,
      meta: {
        title: '聊天室背景'
      }
    },
    // 霸屏
    {
      path: '/occupyimg/OccupyImgList',
      name: 'OccupyImgList',
      component: OccupyImgList,
      meta: {
        title: '图片霸屏套餐列表'
      }
    },

    {
      path: '/occupyimg/OccupyImgAdd',
      name: 'OccupyImgAdd',
      component: OccupyImgAdd,
      meta: {
        title: '新增图片霸屏套餐'
      }
    },

    // 视频霸屏

    {
      path: '/occupyvideo/OccupyVideoList',
      name: 'OccupyVideoList',
      component: OccupyVideoList,
      meta: {
        title: '视频霸屏套餐列表'
      }
    },

    {
      path: '/occupyvideo/OccupyVideoAdd',
      name: 'OccupyVideoAdd',
      component: OccupyVideoAdd,
      meta: {
        title: '新增视频霸屏套餐'
      }
    },

    {
      path: '/sensitive/SensitiveList',
      name: 'SensitiveList',
      component: SensitiveList,
      meta: {
        title: '敏感词列表'
      }
    },
    // 礼物
    {
      path: '/gift/GiftSet',
      name: 'GiftSet',
      component: GiftSet,
      meta: {
        title: '礼物列表设置'
      }
    },

    {
      path: '/redpack/RedpackSet',
      name: 'RedpackSet',
      component: RedpackSet,
      meta: {
        title: '红包分成设置'
      }
    },

    {
      path: '/ComponentSetting',
      name: 'ComponentSetting',
      component: ComponentSetting,
      meta: {
        title: '组件设置'
      }
    },

    // 免费发图
    {
      path: '/occupyfree/OccupyFree',
      name: 'OccupyFree',
      component: OccupyFree,
      meta: {
        title: '免费发图设置'
      }
    },

    // 霸屏分享
    {
      path: '/occupyshare/OccupyShare',
      name: 'OccupyShare',
      component: OccupyShare,
      meta: {
        title: '霸屏分享设置'
      }
    },

    {
      path: '/OccupyScreenWordCount',
      name: 'OccupyScreenWordCount',
      component: OccupyScreenWordCount,
      meta: {
        title: '霸屏字数设置'
      }
    },

    // 票选
    {
      path: '/goddess/GoddessUse',
      name: 'GoddessUse',
      component: GoddessUse,
      meta: {
        title: '票选设置'
      }
    },
    {
      path: '/goddess/Extension',
      name: 'Extension',
      component: Extension,
      meta: {
        title: '票选推广链接和二维码'
      }
    },

    {
      path: '/goddess/GoddessList',
      name: 'GoddessList',
      component: GoddessList,
      meta: {
        title: '票选列表'
      }
    },

    {
      path: '/goddess/GoddessAddOne',
      name: 'GoddessAddOne',
      component: GoddessAddOne,
      meta: {
        title: '新增票选大赛'
      }
    },

    {
      path: '/goddess/GoddessDetail',
      name: 'GoddessDetail',
      component: GoddessDetail,
      meta: {
        title: '票选详情'
      }
    },
    // 夜聘
    {
      path: '/nighthire/NightHireUse',
      name: 'NightHireUse',
      component: NightHireUse,
      meta: {
        title: '夜聘设置'
      }
    },

    {
      path: '/nighthire/NightHireContact',
      name: 'NightHireContact',
      component: NightHireContact,
      meta: {
        title: '夜聘联系人设置'
      }
    },

    // 酒水牌
    {
      path: '/goods/GoodsCategoryAdd',
      name: 'GoodsCategoryAdd',
      component: GoodsCategoryAdd,
      meta: {
        title: '新增酒水分类'
      }
    },

    {
      path: '/goods/GoodsCategoryList',
      name: 'GoodsCategoryList',
      component: GoodsCategoryList,
      meta: {
        title: '酒水分类列表'
      }
    },

    {
      path: '/goods/GoodsList',
      name: 'GoodsList',
      component: GoodsList,
      meta: {
        title: '酒水列表设置'
      }
    },

    {
      path: '/goods/GoodsAdd',
      name: 'GoodsAdd',
      component: GoodsAdd,
      meta: {
        title: '新增酒水'
      }
    },

    {
      path: '/goods/GoodsUse',
      name: 'GoodsUse',
      component: GoodsUse,
      meta: {
        title: '酒水设置'
      }
    },
    // 活动

    {
      path: '/activity/ActivityAdd',
      name: 'ActivityAdd',
      component: ActivityAdd,
      meta: {
        title: '新增活动'
      }
    },

    {
      path: '/activity/ActivityList',
      name: 'ActivityList',
      component: ActivityList,
      meta: {
        title: '活动列表'
      }
    },

    // 消息

    {
      path: '/msg/MsgAdd',
      name: 'MsgAdd',
      component: MsgAdd,
      meta: {
        title: '新增消息'
      }
    },

    {
      path: '/msg/MsgList',
      name: 'MsgList',
      component: MsgList,
      meta: {
        title: '消息列表'
      }
    },

    // 投票

    {
      path: '/vote/Vote',
      name: 'Vote',
      component: Vote,
      meta: {
        title: '投票列表'
      }
    },

    {
      path: '/vote/VoteAdd',
      name: 'VoteAdd',
      component: VoteAdd,
      meta: {
        title: '新增投票'
      }
    },

    // 存酒
    {
      path: '/drink/Drink',
      name: 'Drink',
      component: Drink,
      meta: {
        title: '存酒设置'
      }
    },
    {
      path: '/drink/DrinkList',
      name: 'DrinkList',
      component: DrinkList,
      meta: {
        title: '仓库酒类管理'
      }
    },
    {
      path: '/drink/DrinkAdd',
      name: 'DrinkAdd',
      component: DrinkAdd,
      meta: {
        title: '新增酒类'
      }
    },
    {
      path: '/drink/DrinkManager',
      name: 'DrinkManager',
      component: DrinkManager,
      meta: {
        title: '仓库管理员管理'
      }
    },
    {
      path: '/drink/DrinkWaiter',
      name: 'DrinkWaiter',
      component: DrinkWaiter,
      meta: {
        title: '服务员管理'
      }
    },
    {
      path: '/drink/DrinkGet',
      name: 'DrinkGet',
      component: DrinkGet,
      meta: {
        title: '存取申请管理'
      }
    },
    {
      path: '/drink/DrinkEntry',
      name: 'DrinkEntry',
      component: DrinkEntry,
      meta: {
        title: '存酒入口'
      }
    },
    // 点舞
    {
      path: '/dance/Dance',
      name: 'Dance',
      component: Dance,
      meta: {
        title: '点舞设置'
      }
    },

    // 点舞
    {
      path: '/song/Song',
      name: 'Song',
      component: Song,
      meta: {
        title: '点歌设置'
      }
    },

    {
      path: '/bar/WiFi',
      name: 'WiFi',
      component: WiFi,
      meta: {
        title: 'WiFi设置'
      }
    },

    {
      path: '/bar/TableStrick',
      name: 'TableStrick',
      component: TableStrick,
      meta: {
        title: '桌贴'
      }
    },

    {
      path: '/bar/MiniAppsQRCode',
      name: 'MiniAppsQRCode',
      component: MiniAppsQRCode,
      meta: {
        title: '小程序二维码'
      }
    },

    {
      path: '/bar/BarMessage',
      name: 'BarMessage',
      component: BarMessage,
      meta: {
        title: '酒吧资料'
      }
    },

    {
      path: '/bar/UserManager',
      name: 'UserManager',
      component: UserManager,
      meta: {
        title: '用户管理'
      }
    },

    {
      path: '/bar/UserComsumption',
      name: 'UserComsumption',
      component: UserComsumption,
      meta: {
        title: '用户消费详情'
      }
    },

    // 奖品库

    {
      path: '/prizes/PrizesAdd',
      name: 'PrizesAdd',
      component: PrizesAdd,
      meta: {
        title: '添加奖品'
      }
    },

    {
      path: '/prizes/PrizesList',
      name: 'PrizesList',
      component: PrizesList,
      meta: {
        title: '奖品列表'
      }
    },

    {
      path: '/egg/EggSetting',
      name: 'EggSetting',
      component: EggSetting,
      meta: {
        title: '砸金蛋设置'
      }
    },
    {
      path: '/egg/EggList',
      name: 'EggList',
      component: EggList,
      meta: {
        title: '砸金蛋设置'
      }
    },

    // 在线抽奖

    {
      path: '/gameonline/GameOnlineSet',
      name: 'GameOnlineSet',
      component: GameOnlineSet,
      meta: {
        title: '抽奖设置'
      }
    },

    // 跑马场

    {
      path: '/horse/HorseList',
      name: 'HorseList',
      component: HorseList,
      meta: {
        title: '跑马奖品梯度设置'
      }
    },

    {
      path: '/horse/HorseAdd',
      name: 'HorseAdd',
      component: HorseAdd,
      meta: {
        title: '跑马设置'
      }
    },

    {
      path: '/horse/HorseConditionAdd',
      name: 'HorseConditionAdd',
      component: HorseConditionAdd,
      meta: {
        title: '添加跑马奖励'
      }
    },

    // 转动魔方

    {
      path: '/gamemagic/GameMagicSet',
      name: 'GameMagicSet',
      component: GameMagicSet,
      meta: {
        title: '转动魔方游戏设置'
      }
    },

    {
      path: '/gamemagic/GameMagicPrizeSet',
      name: 'GameMagicPrizeSet',
      component: GameMagicPrizeSet,
      meta: {
        title: '转动魔方奖励设置'
      }
    },

    {
      path: '/gamemagic/GameMagicList',
      name: 'GameMagicList',
      component: GameMagicList,
      meta: {
        title: '转动魔方奖励列表'
      }
    },

    {
      path: '/rockruning/RockRuningSet',
      name: 'RockRuningSet',
      component: RockRuningSet,
      meta: {
        title: '摇摇赛跑游戏设置'
      }
    },

    // 大话骰

    {
      path: '/liarsdice/LiarsDiceList',
      name: 'LiarsDiceList',
      component: LiarsDiceList,
      meta: {
        title: '大话骰奖励列表'
      }
    },

    {
      path: '/liarsdice/LiarsDiceAdd',
      name: 'LiarsDiceAdd',
      component: LiarsDiceAdd,
      meta: {
        title: '大话骰游戏设置'
      }
    },

    {
      path: '/liarsdice/LiarsDicePrizeSet',
      name: 'LiarsDicePrizeSet',
      component: LiarsDicePrizeSet,
      meta: {
        title: '大话骰奖励设置'
      }
    },
    {
      path: '/table/TablePrizeUser',
      name: 'TablePrizeUser',
      component: TablePrizeUser,
      meta: {
        title: '中奖设置'
      }
    },
    {
      path: '/table/TableSetting',
      name: 'TableSetting',
      component: TableSetting,
      meta: {
        title: '台号设置'
      }
    },
    {
      path: '/broadcast',
      name: 'Broadcast',
      component: Broadcast,
      meta: {
        title: '播报功能'
      }
    },
    {
      path: '/broadcast/user',
      name: 'BroadcastUser',
      component: BroadcastUser,
      meta: {
        title: '播报人员管理'
      }
    },
    {
      path: '/AddManager',
      name: 'AddManager',
      component: BroadcastUserAdd,
      meta: {
        title: '添加接收人'
      }
    },
    {
      path: '/BigPicView',
      name: 'BigPicView',
      component: BigPicView,
      meta: {
        title: '查看大图'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
  // 先设置token，currentBar，user
  let token = store.state.token
  let currentBar = store.state.currentBar
  let userInfo = store.state.userInfo
  if (!token) {
    token = util.getStorage(config.STORAGE.USER_TOKEN)
    if (token) {
      store.commit(config.STORAGE.USER_TOKEN, token)
    }
  }
  if (!currentBar) {
    currentBar = util.getSStorage(config.STORAGE.BAR_INFO)
    if (currentBar) {
      store.commit(config.STORAGE.BAR_INFO, currentBar)
      store.dispatch(config.STORAGE.BAR_INFO, currentBar.id)
    }
  }
  if (!userInfo) {
    userInfo = util.getStorage(config.STORAGE.USER_INFO)
    if (userInfo) {
      store.commit(config.STORAGE.USER_INFO, userInfo)
    }
  }
  if (to.meta.unAuth) {
    if (to.name === 'Login') {
      if (token && token.refresh_token && userInfo) {
        console.log('store里有token和user,当前处于登录状态,这应该是微信登陆成功后按返回回来的，此时直接退出应用吧')
        // window.wx.closeWindow()
        next(false)
        return
      }
    }
    console.log('无需权限验证，维持原路径')
    next()
    return
  }
  if (token && token.refresh_token && userInfo) {
    if (currentBar || to.name === 'BarList') {
      console.log('当前登陆又选择过酒吧了')
      if (currentBar) {
        Vue.prototype.$barId = currentBar.id
      }
      next()
    } else {
      console.log('当前没有选择酒吧，跳到酒吧选择界面')
      next({path: '/BarList'})
    }
  } else {
    console.log('当前没有登陆,跳到登陆页')
    next({path: '/Login'})
  }
})

export default router
