import yebaApi from './yeba-api'
import config from '../../config/config'
import api from './resource'

const GRANTTYPE = 'grant_type'
const GRANTTYPE_REFRESH_TOKEN = 'refresh_token'
const GRANTTYPE_CLIENT = 'client_credentials'
const GRANTTYPE_PLATFORM = 'openid'
const GRANTTYPE_MOBILE = 'password'
const CLIENTID_KEY = 'client_id'
const CLIENTSECRET_KEY = 'client_secret'
const SCOPE_KEY = 'scope'
const PLATFORM = 'platform'
const OPENID = 'wechat_openid'

export default {

  getWxSignature () {
    let url = window.location.href.split('#')[0]
    console.log(url)
    let data = {
      url
    }
    return yebaApi.request(api.getWechatSignatureUrl(), {
      method: 'POST',
      data,
      changeMethod: 'WXSIGNATURE',
      showLoading: false
    })
  },
  /**
   * 获得当前用户可以进入哪些酒吧的管理后台
   * @returns {*}
   */
  getAdminUserBar () {
    return yebaApi.request(api.getAdminUserBarUrl(), {
      showLoading: false
    })
  },

  /**
   * 通过code获取用户的微信基本信息
   * @param code 微信code
   * @returns {*}
   */
  getWechatUserInfo (code) {
    return yebaApi.request(api.getWechatUserInfoUrl(code), {
      changeMethod: 'LOGIN'
    })
  },
  /**
   *根据barId获取酒吧资料
   * @param bar_id
   * @returns {*}
   */
  getBarInfo (barId, data) {
    return yebaApi.request(api.getBarInfoUrl(barId), data)
  },
  /**
   *根据barId获取走马灯列表
   * @param bar_id
   * @returns {*}
   */
  getMarQuee (barId) {
    return yebaApi.request(api.getMarQueeUrl(barId), {
      showLoading: false
    })
  },
  // 外网删除酒吧走马灯
  deletMarQuee (id) {
    return yebaApi.request(api.marQueeUrl(id), {
      method: 'DELETE'
    })
  },
  /**
   * 外网新增走马灯
   * @param bar_id
   * @returns {*}
   */
  addMarQuee (barId, data) {
    return yebaApi.request(api.addMarQueeUrl(barId), {
      method: 'POST',
      data
    })
  },
  updateMarQuee (id, data) {
    return yebaApi.request(api.marQueeUrl(id), {
      method: 'PUT',
      data
    })
  },
  /**
   * 根据barId获取敏感词列表
   * @param bar_id
   * @returns {*}
   */
  getSensitive (barId) {
    return yebaApi.request(api.getSensitiveUrl(barId), {
      showLoading: false
    })
  },
  /**
   *更新敏感词
   */
  updataSensitive (data, changeMethod) {
    return yebaApi.request(api.updateSensitiveUrl(), {
      method: 'POST',
      changeMethod: changeMethod || 'POST',
      data
    })
  },
  /**
   * 根据barId获取酒吧图片霸屏套餐列表
   * @param bar_id
   * @returns {*}
   */
  getOccupyImg (barId) {
    return yebaApi.request(api.getOccupyImgUrl(barId), {
      showLoading: false
    })
  },
  /**
   *添加自定义霸屏套餐
   */
  addOccupyImg (data) {
    return yebaApi.request(api.addOccupyImgUrl(), {
      method: 'POST',
      data
    })
  },
  /**
   * 获取酒吧主题霸屏框列表
   */
  getOccupyTheme () {
    return yebaApi.request(api.getOccupyThemeUrl())
  },
  /**
   * 根据occupyscreen_package_id删除酒吧霸屏套餐
   * @param occupyscreen_package_id
   * @returns {*}
   */
  deleteOccupyImg (occupyscreenPackageId) {
    return yebaApi.request(api.occupyScreenUrl(occupyscreenPackageId), {
      method: 'DELETE'
    })
  },
  /**
   * 修改酒吧霸屏套餐
   * @param occupyscreen_package_id
   * @returns {*}
   */
  updateOccupyScreen (occupyscreenPackageId, data) {
    return yebaApi.request(api.occupyScreenUrl(occupyscreenPackageId), {
      method: 'PUT',
      data
    })
  },
  /**
   * 根据barId获取酒吧图片霸屏套餐列表
   * @param bar_id
   * @returns {*}
   */
  getOccupyVideo (barId) {
    return yebaApi.request(api.getOccupyVideoUrl(barId), {
      showLoading: false
    })
  },
  /**
   * 获取礼物列表
   */
  giftsList (barId) {
    return yebaApi.request(api.giftsListUrl(barId), {
      showLoading: false
    })
  },
  /**
   * 修改礼物
   */
  updateGift (giftId, data) {
    return yebaApi.request(api.updateGiftUrl(giftId), {
      method: 'PUT',
      data
    })
  },

  /**
   *根据barId获取聊天室背景图列表
   * @param bar_id
   * @returns {*}
   */
  getChatroom (barId) {
    return yebaApi.request(api.getChatroomUrl(barId), {
      showLoading: false
    })
  },
  /**
   * 根据id修改聊天室背景图
   * @param id
   * @returns {*}
   */
  editChatroom (id, data) {
    return yebaApi.request(api.editChatroomUrl(id), {
      method: 'PUT',
      data
    })
  },
  /**
   * 根据id和酒吧id 删除聊天室背景图
   * @param id
   * @returns {*}
   */
  deleteChatroom (id, barId) {
    return yebaApi.request(api.deleteChatroomUrl(id, barId), {
      method: 'DELETE'
    })
  },
  /**
   *根据barId修改酒吧资料
   * @param bar_id
   * @returns {*}
   */
  changeBarInfo (barId, data) {
    return yebaApi.request(api.getBarInfoUrl(barId), {
      method: 'PUT',
      data
    })
  },
  /**
   *根据barId获取开关列表
   * @param bar_id
   * @returns {*}
   */
  getBarConfigs (barId, keyword) {
    return yebaApi.request(api.getBarConfigsUrl(barId, keyword))
  },
  /**
   *根据barId获取开关列表
   * @param bar_id
   * @returns {*}
   */
  getBarRank (barId) {
    return yebaApi.request(api.getBarRankUrl(barId))
  },
  /**
   *根据barId获取酒水分类列表
   * @param bar_id
   * @returns {*}
   */
  getGoodsCategory (barId, sort) {
    return yebaApi.request(api.getGoodsCategoryUrl(barId, sort), {
      showLoading: false
    })
  },
  /**
   *根据barId新增酒水分类
   * @param bar_id
   * @returns {*}
   */
  addGoodsCategory (barId, data) {
    return yebaApi.request(api.addGoodsCategoryUrl(barId), {
      method: 'POST',
      data
    })
  },
  /**
   *根据barId和id删除酒水分类
   * @param id
   * @returns {*}
   */
  deleteGoodsCategory (id, barId) {
    return yebaApi.request(api.deleteGoodsCategoryUrl(id, barId), {
      method: 'DELETE'
    })
  },
  /**
   *根据id编辑酒水分类
   * @param id
   * @returns {*}
   */
  editGoodsCategory (id, data) {
    return yebaApi.request(api.editGoodsCategoryUrl(id), {
      method: 'PUT',
      data
    })
  },
  /**
   *根据barId获取酒水列表
   * @param bar_id
   * @returns {*}
   */
  getGoods (barId) {
    return yebaApi.request(api.getGoodsUrl(barId), {
      showLoading: false
    })
  },
  /**
   *根据barId添加酒水
   * @param bar_id
   * @returns {*}
   */
  addGoods (barId, data) {
    return yebaApi.request(api.addGoodsUrl(barId), {
      method: 'POST',
      data
    })
  },
  /**
   *根据barId修改酒水
   * @param id
   * @returns {*}
   */
  editGoods (id, data) {
    return yebaApi.request(api.editGoodsUrl(id), {
      method: 'PUT',
      data
    })
  },
  /**
   *根据酒水ID获取酒水分类详情
   * @param bar_id
   * @returns {*}
   */
  getGoodsdetail (id, barId) {
    return yebaApi.request(api.getGoodsdetailUrl(id, barId))
  },
  /**
   *根据barId和id删除酒水
   * @param id
   * @returns {*}
   */
  deleteGoods (id, barId) {
    return yebaApi.request(api.deleteGoodsUrl(id, barId), {
      method: 'DELETE'
    })
  },
  /**
   *根据酒吧ID获取酒吧活动列表
   * @param bar_id
   * @returns {*}
   */
  getActivity (barId, sort) {
    return yebaApi.request(api.getActivityUrl(barId, sort), {
      showLoading: false
    })
  },
  /**
   *根据酒吧ID添加酒吧活动
   * @param bar_id
   * @returns {*}
   */
  addActivity (barId, data) {
    return yebaApi.request(api.addActivityUrl(barId), {
      method: 'POST',
      data
    })
  },
  /**
   *根据barId和id删除酒吧活动
   * @param id
   * @returns {*}
   */
  deleteActivity (id, barId) {
    return yebaApi.request(api.activityUrl(id, barId), {
      method: 'DELETE'
    })
  },
  /**
   *根据酒吧ID修改酒吧活动
   * @param bar_id
   * @returns {*}
   */
  editActivity (id, barId, data) {
    return yebaApi.request(api.activityUrl(id, barId), {
      method: 'PUT',
      data
    })
  },
  /**
   *根据酒吧ID获取推送记录列表
   * @param bar_id
   * @returns {*}
   */
  getMsg (barId) {
    return yebaApi.request(api.getMsgUrl(barId), {
      showLoading: false
    })
  },
  /**
   *根据酒吧ID获取推送记录列表
   * @param bar_id
   * @returns {*}
   */
  addMsg (data) {
    return yebaApi.request(api.addMsgUrl(), {
      method: 'POST',
      data
    })
  },
  /**
   *根据ID修改推送记录
   * @param id
   * @returns {*}
   */
  editMsg (id, data) {
    return yebaApi.request(api.editMsgUrl(id), {
      method: 'PUT',
      data
    })
  },
  /**
   *根据ID删除推送记录
   * @param id
   * @returns {*}
   */
  deleteMsg (id) {
    return yebaApi.request(api.deleteMsgUrl(id), {
      method: 'DELETE'
    })
  },
  /**
   *根据酒吧ID获取酒吧投票场次列表
   * @param bar_id
   * @returns {*}
   */
  getVote (barId) {
    return yebaApi.request(api.getVoteUrl(barId), {
      showLoading: false
    })
  },
  /**
   *根据barId酒吧新增投票设置信息
   * @param bar_id
   * @returns {*}
   */
  addVote (barId, data) {
    return yebaApi.request(api.addVoteUrl(barId), {
      method: 'POST',
      data
    })
  },
  /**
   *根据barId酒吧新增修改设置信息
   * @param bar_id,id
   * @returns {*}
   */
  editVote (barId, id, data) {
    return yebaApi.request(api.editVoteUrl(barId, id), {
      method: 'PUT',
      data
    })
  },

  /**
   *根据酒吧ID获取奖品列表
   * @param bar_id
   * @returns {*}
   */
  getPrizesList (barId, status) {
    return yebaApi.request(api.getPrizesListUrl(barId, status), {
      showLoading: false
    })
  },
  /**
   *根据酒吧ID添加奖品
   * @param bar_id
   * @returns {*}
   */
  addPrizes (barId, data) {
    return yebaApi.request(api.editPrizesUrl(barId), {
      method: 'POST',
      data
    })
  },
  /**
   *根据酒吧ID修改奖品
   * @param bar_id
   * @returns {*}
   */
  editPrizes (barId, data) {
    return yebaApi.request(api.editPrizesUrl(barId), {
      method: 'PUT',
      data
    })
  },
  /**
   *根据酒吧ID删除奖品
   * @param bar_id
   * @returns {*}
   */
  deletePrizes (barId, id) {
    return yebaApi.request(api.deletePrizesUrl(barId, id), {
      method: 'DELETE'
    })
  },
  /**
   *根据酒吧ID获取大话骰规则设置
   * @param bar_id
   * @returns {*}
   */
  getDiceRule (barId) {
    return yebaApi.request(api.getDiceRuleUrl(barId))
  },
  /**
   *根据酒吧ID设置大话骰规则
   * @param bar_id
   * @returns {*}
   */
  setDiceRule (data) {
    return yebaApi.request(api.setDiceRuleUrl(), {
      method: 'POST',
      data
    })
  },
  /**
   *根据酒吧ID获取大话骰奖品列表
   * @param bar_id
   * @returns {*}
   */
  getDicePrize (barId) {
    return yebaApi.request(api.getDicePrizeUrl(barId), {
      showLoading: false
    })
  },
  /**
   *根据酒吧ID大话骰添加奖品设置
   * @param bar_id
   * @returns {*}
   */
  addDicePrize (barId, data) {
    return yebaApi.request(api.addDicePrizeUrl(barId), {
      method: 'POST',
      data
    })
  },
  /**
   *根据酒吧ID大话骰修改奖品设置
   * @param bar_id
   * @returns {*}
   */
  editDicePrize (barId, id, data) {
    return yebaApi.request(api.editDicePrizeUrl(barId, id), {
      method: 'PUT',
      data
    })
  },
  /**
   *根据酒吧ID大话骰删除奖品设置
   * @param bar_id
   * @returns {*}
   */
  deleteDicePrize (barId, id) {
    return yebaApi.request(api.deleteDicePrizeUrl(barId, id), {
      method: 'DELETE'
    })
  },
  /**
   *根据酒吧ID添加夜吧飞镖奖品
   * @param bar_id
   * @returns {*}
   */
  addDartPrize (barId, data) {
    return yebaApi.request(api.addDartPrizeUrl(barId), {
      method: 'POST',
      data
    })
  },
  /**
   *根据酒吧ID添加夜吧飞镖奖品
   * @param bar_id
   * @returns {*}
   */
  editDartPrize (barId, id, data) {
    return yebaApi.request(api.editDartPrizeUrl(barId, id), {
      method: 'PUT',
      data
    })
  },

  /**
   *根据酒吧id获取开关列表
   *@param bar_id
   * @returns {*}
   */
  getModule (barId) {
    return yebaApi.request(api.getModuleUrl(barId))
  },
  /**
   * 根据id及酒吧id 更改模块配置
   */
  updateModule (id, data) {
    return yebaApi.request(api.updateModuleUrl(id), {
      data,
      method: 'PUT'
    })
  },
  /**
   * 用户使用霸屏赠送霸屏时间
   */
  occupyShare (barId, data) {
    return yebaApi.request(api.occupyShareUrl(barId), {
      method: 'POST',
      data
    })
  },
  /**
   * 用户使用霸屏赠送霸屏时间
   */
  getOccupyShareConfig (barId) {
    return yebaApi.request(api.occupyShareUrl(barId))
  },
  /**
   *获取营销人员列表
   * @param bar_id
   * @returns {*}
   */
  getMarketerList (barId) {
    return yebaApi.request(api.getMarketerListUrl(barId))
  },
  /**
   * 删除营销人员
   */
  deleteMarketer (id) {
    return yebaApi.request(api.deleteMarketerUrl(id), {
      method: 'DELETE'
    })
  },
  /**
   * 添加酒吧营销人员
   */
  addMarketer (data) {
    return yebaApi.request(api.addMarketerUrl(), {
      method: 'POST',
      data
    })
  },
  /**
   * 修改酒吧营销人员
   * @param bar_id
   * @param id
   */
  updateMarketer (barId, id, data) {
    return yebaApi.request(api.updateMarketerUrl(barId, id), {
      method: 'PUT',
      data
    })
  },
  /**
   * 获取套餐列表
   * @param bar_id
   * @returns {*}
   */
  getMenuList (barId) {
    return yebaApi.request(api.getMenuListUrl(barId))
  },
  /**
   * 删除指定套餐
   * @param id
   * @returns {*}
   */
  deleteMenu (id) {
    return yebaApi.request(api.deleteMenuUrl(id), {
      method: 'DELETE'
    })
  },
  /**
   * 添加套餐
   * @param data
   * @returns {*}
   */
  addMenu (data) {
    return yebaApi.request(api.addMenuUrl(), {
      method: 'POST',
      data
    })
  },
  /**
   * 获取酒吧订单列表
   * @param bar_id
   * @returns {*}
   */
  getBarTableList (barId) {
    return yebaApi.request(api.getBarTableListUrl(barId))
  },
  /**
   * 订单确认消费
   * @param data
   * @returns {*}
   */
  orderConsume (data) {
    return yebaApi.request(api.orderConsumeUrl(), {
      method: 'PUT',
      data
    })
  },
  /**
   * 获取女神活动列表
   * @param bar_id
   * @returns {*}
   */
  getGoddessActivity (barId) {
    return yebaApi.request(api.getGoddessActivityUrl(barId), {
      showLoading: false
    })
  },
  getLatestGoddessDetail (barId) {
    return yebaApi.request(api.getLatestGoddessDetail(barId))
      .then(data => {
        if (data.length === 1 && data[0].status !== 3) {
          return Promise.resolve(data[0])
        } else {
          return Promise.resolve(null)
        }
      })
  },
  /**
   * 添加酒吧女神活动
   * @param bar_id
   * @returns {*}
   */
  addGoddessActivity (barId, data) {
    return yebaApi.request(api.addGoddessActivityUrl(barId), {
      method: 'POST',
      data
    })
  },
  editGoddessActivity (barId, goddessId, data) {
    return yebaApi.request(api.editGoddessActivityUrl(barId, goddessId), {
      method: 'PUT',
      data
    })
  },
  /**
   * 获取女神列表
   * @param bar_id
   * @returns {*}
   */
  getGoddessList (barId) {
    return yebaApi.request(api.getGoddessListUrl(barId), {
      showLoading: false
    })
  },
  /**
   * 酒吧设置女神上墙状态
   * @param bar_id
   * @param goddess_id
   */
  setGoddessWall (barId, goddessId, data) {
    return yebaApi.request(api.setGoddessWallUrl(barId, goddessId), {
      method: 'PUT',
      data
    })
  },
  /**
   * 获取酒吧的夜聘联系人
   * @param bar_id
   * @returns {*}
   */
  getBarHr (barId) {
    return yebaApi.request(api.getBarHrUrl(barId))
  },
  /**
   * 更换酒吧夜聘联系人
   * @param data
   * @returns {*}
   */
  updateBarHr (data) {
    return yebaApi.request(api.updateBarHrUrl(), {
      method: 'PUT',
      data
    })
  },
  /**
   * 根据酒吧ID获取酒吧Wifi列表
   * @param bar_id
   * @returns {*}
   */
  getBarWifi (barId) {
    return yebaApi.request(api.barWifiUrl(barId), {
      showLoading: false
    })
  },
  /**
   * 添加Wifi
   * @param bar_id
   * @returns {*}
   */
  addBarWifi (barId, wifiName) {
    return yebaApi.request(api.barWifiUrl(barId), {
      method: 'POST',
      data: {
        name: wifiName
      }
    })
  },
  /**
   * 删除酒吧wifi
   * @param bar_id
   * @param wifi_id
   * @returns {*}
   */
  deleteBarWifi (barId, wifiId) {
    return yebaApi.request(api.deleteBarWifiUrl(barId, wifiId), {
      method: 'DELETE'
    })
  },
  /**
   * 在线抽奖获取酒吧设定的中奖用户列表
   * @param bar_id
   * @returns {*}
   */
  getGamesUsersList (barId) {
    return yebaApi.request(api.getGamesUsersListUrl(barId), {
      showLoading: false
    })
  },
  /**
   * 在线抽奖设定中奖用户
   * @param bar_id
   * @param data
   * @returns {*}
   */
  addGamesUsers (barId, data) {
    return yebaApi.request(api.addGamesUsersUrl(barId), {
      method: 'POST',
      data
    })
  },
  /** 在线抽奖删除设定中奖用户
   * @param bar_id
   * @param user_id
   * @returns {*}
   */
  deleteGamesUsers (barId, userId) {
    return yebaApi.request(api.deleteGamesUsersUrl(barId, userId), {
      method: 'DELETE'
    })
  },
  /**
   * 跑马场游戏押注设置
   * @param bar_id
   * @param data
   * @returns {*}
   */
  horseSetting (barId, data) {
    return yebaApi.request(api.horseSettingUrl(barId), {
      method: 'POST',
      data
    })
  },
  /**
   * 获取跑马场押注设置信息
   * @param bar_id
   * @returns {*}
   */
  getHorseSetting (barId) {
    return yebaApi.request(api.horseSettingUrl(barId))
  },
  /**
   *根据酒吧id游戏类型获取奖金池列表
   * @param bar_id
   * @param game_type
   * @returns {*}
   */
  getGamesPrizesList (barId, gameType) {
    return yebaApi.request(api.getGamesPrizesListUrl(barId, gameType), {
      showLoading: false
    })
  },
  /**
   * 删除奖金池奖品
   * @param bar_id
   * @param prize_settings_id
   */
  deleteGamesPrize (barId, prizeSettingsId, data) {
    return yebaApi.request(api.gamesPrizeUrl(barId, prizeSettingsId), {
      data,
      method: 'DELETE'
    })
  },
  /**
   * 根据酒吧id奖品id添加奖金池奖品
   * @param bar_id
   * @param data
   * @returns {*}
   */
  addGamesPrize (barId, data) {
    return yebaApi.request(api.addGamesPrizeUrl(barId), {
      method: 'POST',
      data
    })
  },
  /**
   * 根据酒吧id奖品id游戏类型修改奖金池奖品
   * @param bar_id
   * @param prize_settings_id
   * @param data
   * @returns {*}
   */
  updateGamePrize (barId, prizeSettingsId, data) {
    return yebaApi.request(api.gamesPrizeUrl(barId, prizeSettingsId), {
      method: 'PUT',
      data
    })
  },
  /**
   * 转动魔方押注设置
   * @param bar_id
   * @param data
   * @returns {*}
   */
  magicSetting (barId, data) {
    return yebaApi.request(api.magicSettingUrl(barId), {
      method: 'POST',
      data
    })
  },
  /**
   * 转动魔方获取设置的奖品列表
   * @param bar_id
   * @returns {*}
   */
  getMagicPrizeList (barId) {
    return yebaApi.request(api.getMagicPrizeListUrl(barId), {
      showLoading: false
    })
  },
  /**
   * 转动魔方删除设置的奖品
   * @param bar_id
   * @param set_id
   * @returns {*}
   */
  deleteMagicPrize (barId, setId) {
    return yebaApi.request(api.deleteMagicPrizeUrl(barId, setId), {
      method: 'DELETE'
    })
  },
  /**
   * 转动魔方获取押注设置信息
   * @param bar_id
   * @returns {*}
   */
  getMagicSetting (barId) {
    return yebaApi.request(api.magicSettingUrl(barId))
  },
  /**
   * 转动魔方奖品设置
   * @param bar_id
   * @param data
   * @returns {*}
   */
  settingMagicPrize (barId, data) {
    return yebaApi.request(api.magicPrizeUrl(barId), {
      method: 'POST',
      data
    })
  },
  /**
   * 设置摇摇赛跑设置信息
   * @param bar_id
   * @param data
   * @returns {*}
   */
  runningSetting (barId, data) {
    return yebaApi.request(api.runningSettingUrl(barId), {
      method: 'POST',
      data
    })
  },
  /**
   * 获取摇摇赛跑设置信息
   * @param bar_id
   * @returns {*}
   */
  getRunningSetting (barId) {
    return yebaApi.request(api.runningSettingUrl(barId))
  },
  /**
   * 获取酒吧霸屏分销订单列表
   * @param bar_id
   * @returns {*}
   */
  getOccupyDistribute (barId) {
    return yebaApi.request(api.getOccupyDistributeUrl(barId), {
      showLoading: false
    })
  },
  /**
   * 删除霸屏分销人员
   * @param bar_id
   * @param distribution_id
   * @returns {*}
   */
  deleteOccupyDistribute (barId, distributionId) {
    return yebaApi.request(api.occupyDistributeUrl(barId, distributionId), {
      method: 'DELETE'
    })
  },
  /**
   * 添加霸屏分销人员
   * @param bar_id
   * @param data
   * @returns {*}
   */
  addOccupyDistribute (barId, data) {
    return yebaApi.request(api.getOccupyDistributeUrl(barId), {
      data,
      method: 'POST'
    })
  },
  /**
   * 修改霸屏分销人员
   * @param bar_id
   * @param distribution_id
   * @param data
   * @returns {*}
   */
  updateOccupyDistribute (barId, distributionId, data) {
    return yebaApi.request(api.occupyDistributeUrl(barId, distributionId), {
      data,
      method: 'PUT'
    })
  },
  /**
   * 获取七牛token
   * @returns {*}
   */
  getQiniuToken () {
    return yebaApi.request(api.getQiniuTokenUrl(), {
      showLoading: false
    })
  },
  addChatroomBg (barId, bgimgUrl) {
    return yebaApi.request(api.addChatroomBgUrl(), {
      method: 'POST',
      data: {
        bar_id: barId,
        bgimg_url: bgimgUrl
      }
    })
  },
  tokenBase (showLoading = true) {
    let data = {
      [GRANTTYPE]: GRANTTYPE_CLIENT,
      [CLIENTID_KEY]: config.CLIENT_ID,
      [CLIENTSECRET_KEY]: config.CLIENT_SECRET,
      [SCOPE_KEY]: config.SCOPE
    }
    return yebaApi.request(api.getTokenUrl(), {
      showLoading,
      method: 'POST',
      data,
      changeMethod: 'LOGIN'
    })
  },
  tokenWx (openId, unionId) {
    let data = {
      [GRANTTYPE]: GRANTTYPE_PLATFORM,
      [CLIENTID_KEY]: config.CLIENT_ID,
      [CLIENTSECRET_KEY]: config.CLIENT_SECRET,
      [SCOPE_KEY]: config.SCOPE,
      [GRANTTYPE_PLATFORM]: unionId,
      [PLATFORM]: 1,
      [OPENID]: openId
    }
    return yebaApi.request(api.getTokenUrl(), {
      data,
      method: 'POST',
      changeMethod: 'LOGIN',
      individualization: false
    })
  },
  tokenId (id, pwd) {
    let data = {
      [GRANTTYPE]: GRANTTYPE_MOBILE,
      [CLIENTID_KEY]: config.CLIENT_ID,
      [CLIENTSECRET_KEY]: config.CLIENT_SECRET,
      [SCOPE_KEY]: config.SCOPE,
      username: id,
      password: pwd
    }
    return yebaApi.request(api.getTokenUrl(), {
      data,
      method: 'POST',
      changeMethod: 'LOGIN'
    })
  },
  /**
   * 刷新token
   * @param token
   * @returns {AxiosPromise}
   */
  refreshToken (token) {
    let data = {
      [GRANTTYPE]: GRANTTYPE_REFRESH_TOKEN,
      [CLIENTID_KEY]: config.CLIENT_ID,
      [CLIENTSECRET_KEY]: config.CLIENT_SECRET,
      [SCOPE_KEY]: config.SCOPE,
      refresh_token: token
    }
    return yebaApi.request(api.getTokenUrl(), {
      data,
      method: 'POST',
      changeMethod: 'LOGIN'
    })
  },
  /**
   * 注册
   * @param wxUserInfo
   * @returns {*}
   */
  register (wxUserInfo) {
    let data = {
      registered_method: GRANTTYPE_PLATFORM,
      platform: 1,
      gender: wxUserInfo.gender === 1 ? 1 : 2,
      [GRANTTYPE_PLATFORM]: wxUserInfo.unionid,
      nickname: wxUserInfo.nickname
    }
    /**
     * 注册
     */
    return yebaApi.request(api.userUrl(), {
      data,
      method: 'POST',
      changeMethod: 'LOGIN'
    })
  },
  /**
   * 上传头像
   * @param avatarUrl
   * @param showLoading
   * @returns {Promise.<TResult>|*}
   */
  uploadAvatar (avatarUrl, showLoading) {
    return yebaApi.request(api.uploadUrl(), {
      data: {
        avatar_url: avatarUrl
      },
      method: 'POST',
      changeMethod: 'LOGIN',
      showLoading
    }).then(data => {
      return yebaApi.request(api.updataAvatar(), {
        data: {
          avatar: data.qiniu_key
        },
        method: 'PUT',
        changeMethod: 'LOGIN',
        showLoading
      })
    })
  },
  getUserInfo () {
    return yebaApi.request(api.userInfo(), {
      changeMethod: 'LOGIN'
    })
  },
  /**
   * 生成带链接的二维码
   * @param data
   * @returns {*}
   */
  getQrcode (data) {
    return yebaApi.request(api.getQrcodeUrl(), {
      method: 'POST',
      changeMethod: 'GENERATE',
      data
    })
  },
  /**
   * 根据酒吧ID获取酒吧幻灯片列表
   * @param bar_id
   * @returns {*}
   */
  getBarBanners (barId) {
    return yebaApi.request(api.barBannersUrl(barId), {
      showLoading: false
    })
  },
  /**
   * 为酒吧添加幻灯片
   * @param bar_id
   * @param data
   * @returns {*}
   */
  addBarBannner (barId, data) {
    return yebaApi.request(api.barBannersUrl(barId), {
      method: 'POST',
      data
    })
  },
  deleteBarBannner (barId, id) {
    return yebaApi.request(api.deleteBannerUrl(barId, id), {
      method: 'DELETE'
    })
  },
  /**
   * 根据酒吧ID获取酒吧幻灯片列表
   * @param bar_id
   * @returns {*}
   */
  getADs () {
    return yebaApi.request(api.adUrl(), {
      showLoading: false
    })
  },
  getBarUsers (barId, roleId, page) {
    return yebaApi.request(api.barUsersUrl(barId, roleId, page), {
      showLoading: false
    })
  },
  changeUserGroup (barId, userId, data) {
    return yebaApi.request(api.changeUserGroup(barId, userId), {
      method: 'PUT',
      data
    })
  },
  getFinal (barId, userId) {
    return yebaApi.request(api.fenchen(barId, userId), {
      showLoading: false
    })
  },
  getComsumption (userId, barId, page) {
    return yebaApi.request(api.comsumption(userId, barId, page), {
      showLoading: false
    })
  },
  getBroadcastUsers (barId) {
    return yebaApi.request(api.getBroadcastUsers(barId), {
      showLoading: false
    })
  },
  deleteBroadcastUser (barId, id) {
    return yebaApi.request(api.broadcastUser(barId, id), {
      method: 'DELETE'
    })
  },
  passBroadcastUser (barId, id, limitType, userId) {
    return yebaApi.request(api.broadcastUser(barId, id), {
      method: 'PUT',
      data: {
        limit_type: limitType,
        user_id: userId,
        status: 1
      }
    })
  },
  batch (data, individualization) {
    return yebaApi.request('batch', {
      method: 'POST',
      changeMethod: 'PUT',
      individualization: individualization,
      data
    })
      .then(data => {
        let result = []
        data.forEach(item => {
          result.push(item.data.body.data)
        })
        return result
      })
  },
  getDrinkList (barId) {
    return yebaApi.request(`alcohol/bar/drink?bar_id=${barId}&_pagination=0`, {
      showLoading: false
    })
  },
  addDrink (data) {
    return yebaApi.request(`alcohol/drink/add`, {
      method: 'POST',
      data
    })
  },
  editDrink (id, data) {
    return yebaApi.request(`alcohol/drink/edit/${id}`, {
      method: 'PUT',
      data
    })
  },
  getDrinkManagers (barId) {
    return yebaApi.request(`alcohol/admin/list?bar_id=${barId}&_pagination=0&_include=user`, {
      showLoading: false
    })
  },
  deleteDrinkManager (id) {
    return yebaApi.request(`alcohol/admin/del/${id}`, {
      method: 'DELETE'
    })
  },
  passDrinkManager (id) {
    return yebaApi.request(`alcohol/admin/edit/${id}?_include=user`, {
      method: 'PUT',
      data: {
        bind_status: 2
      }
    })
  },
  getDrinkWaiters (barId) {
    return yebaApi.request(`alcohol/waiter/list?bar_id=${barId}&_pagination=0&_include=user`, {
      showLoading: false
    })
  },
  deleteDrinkWaiter (id) {
    return yebaApi.request(`alcohol/waiter/del/${id}`, {
      method: 'DELETE'
    })
  },
  passDrinkWaiter (id) {
    return yebaApi.request(`alcohol/waiter/edit/${id}?_include=user`, {
      method: 'PUT',
      data: {
        bind_status: 2
      }
    })
  },
  getDrinks (barId, status) {
    let url = `alcohol/apply/list?bar_id=${barId}&_pagination=0&_include=user,admin`
    if (status !== 0) {
      if (status < 4) {
        url += `&store_status=${status}`
      } else {
        status = status - 3
        url += `&take_status=${status}`
      }
    }
    return yebaApi.request(url, {
      showLoading: false
    })
  },
  getEggSetting (barId) {
    return yebaApi.request(`egg/info/${barId}`)
      .then(data => {
        return data[0]
      })
  },
  eggSetting (data) {
    return yebaApi.request(`egg/info`, {
      method: 'POST',
      data
    })
  },
  getEggList (barId) {
    return yebaApi.request(`egg/prize?bar_id=${barId}&_per_page=4`)
  },
  getTablePrizeUsers (barId) {
    return yebaApi.request(`table/number/${barId}/admin?_include=user`, {
      showLoading: false
    })
  },
  deleteTablePrizeUser (barId, id) {
    return yebaApi.request(`table/number/${barId}/delete/${id}/admin`, {
      method: 'DELETE'
    })
  },
  passTablePrizeUser (barId, id) {
    return yebaApi.request(`table/number/${barId}/admin/${id}/update?_include=user`, {
      method: 'PUT',
      data: {
        status: 1
      }
    })
  },
  getTables (barId, theDefault, searchValue) {
    let url = `table/number/${barId}/list?_pagination=0`
    return yebaApi.request(url, {
      showLoading: false
    })
      .then(data => {
        let result = data
        if (searchValue) {
          result = data.filter(item => {
            return item.table_name.indexOf(searchValue) >= 0
          })
        }
        if (theDefault.length > 0 && theDefault[0] != 0) {
          result = data.filter(item => {
            return item.the_default == theDefault[0]
          })
        }
        return Promise.resolve(result)
      })
  },
  changeTableDefault (barId, id, data) {
    return yebaApi.request(`table/number/${barId}/edit/${id}`, {
      method: 'PUT',
      data
    })
  },
  startEgg (barId) {
    return this.getEggSetting(barId)
      .then(data => {
        return yebaApi.request(`egg/info`, {
          method: 'POST',
          data: {
            'bar_id': barId,
            'egg_count': data.egg_count,
            'unit_price': data.unit_price,
            'game_len': data.game_len
          }
        })
      })
  },
  getSongConfig (barId) {
    return yebaApi.request(`song/${barId}/config`)
      .then(data => {
        if (data.length === 0) {
          return yebaApi.request(`song/config`, {
            method: 'POST',
            data: {
              'bar_id': barId,
              'is_me_sing': 1,
              'song_time_period': '["2000-2200"]',
              'song_count_limit': '1'
            }
          })
        } else {
          return Promise.resolve(data[0])
        }
      })
  },
  updateSongConfig (barId, id, data) {
    return yebaApi.request(`song/${barId}/config/${id}`, {
      method: 'PUT',
      data
    })
  },
  getAdminRole (barId, userId) {
    return yebaApi.request(`admin/${barId}/users/${userId}?_include=role`, {
      showLoading: false
    })
  }
}
