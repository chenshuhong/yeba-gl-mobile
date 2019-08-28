//
let api = {
  getTokenUrl: () => {
    return `token`
  },
  userUrl () {
    return `users`
  },
  userInfo () {
    return `users/me`
  },
  getWechatSignatureUrl: () => {
    return `wechat/signature`
  },

  getAdminUserBarUrl: () => {
    return `admin/user/bar?_include=bar&_pagination=0`
  },

  getWechatUserInfoUrl: (code) => {
    return `wechat/userinfo/${code}`
  },
  // 根据barId获取酒吧资料······
  getBarInfoUrl: (barId) => {
    return `bars/${barId}`
  },
  // 根据barId获取走马灯列表
  getMarQueeUrl: (barId) => {
    return `bars/${barId}/activity_marquees?_pagination=0`
  },
  // 外网删除酒吧走马灯
  marQueeUrl: (id) => {
    return `bars/activity_marquees/${id}`
  },
  // 外网新增走马灯
  addMarQueeUrl: (barId) => {
    return `bars/${barId}/activity_marquees`
  },
  // 根据barId获取敏感词列表
  getSensitiveUrl: (barId) => {
    return `dirties/${barId}`
  },
  // 更新敏感词
  updateSensitiveUrl: () => {
    return `dirties`
  },

  // 获取图片霸屏列表
  getOccupyImgUrl: (barId) => {
    return `bars/${barId}/occupyscreen/packages?_include=theme&type=1&_pagination=0&_sort=sort_number&auto_fill=1`
  },
  // 添加自定义霸屏套餐
  addOccupyImgUrl: () => {
    return `occupyscreen/packages?_include=theme`
  },
  // 获取主题霸屏框列表
  getOccupyThemeUrl: () => {
    return `occupyscreen/theme?status=1`
  },
  // 删除或修改霸屏套餐
  occupyScreenUrl: (occupyscreenPackageId) => {
    return `occupyscreen/packages/${occupyscreenPackageId}?_include=theme`
  },
  // 获取视频霸屏列表
  getOccupyVideoUrl: (barId) => {
    return `bars/${barId}/occupyscreen/packages?_include=theme&type=2&_pagination=0&_sort=sort_number&auto_fill=1`
  },
  // 获取礼物列表
  giftsListUrl: (barId) => {
    return `gifts?bar_id=${barId}&_pagination=false`
  },
  // 修改礼物
  updateGiftUrl: (giftId) => {
    return `gifts/${giftId}`
  },

  // 根据barId获取聊天室背景图列表
  getChatroomUrl: (barId) => {
    return `chatroom/theme?bar_id=${barId}&_pagination=0`
  },
  // 修改聊天室背景图
  editChatroomUrl: (id) => {
    return `chatroom/theme/${id}`
  },
  // 删除聊天室背景图
  deleteChatroomUrl: (id, barId) => {
    return `chatroom/theme/${id}/${barId}`
  },
  // 根据barId获取开关列表
  getBarConfigsUrl: (barId, keyword) => {
    return `modules/configs?bar_id=${barId}&keyword=${keyword}&cfg_type=1`
  },
  // 根据barId获取榜单开关列表
  getBarRankUrl: (barId) => {
    return `modules/configs?bar_id=${barId}&cfg_type=3`
  },
  // 根据id及酒吧id 更改模块配置
  updateModuleUrl: (id) => {
    return `modules/configs/${id}`
  },
  // 酒水牌·······分类列表········
  // 根据barId获取酒水分类列表
  getGoodsCategoryUrl: (barId, page, sort) => {
    return `bars/${barId}/goods/category?_sort=${sort}&_pagination=0`
  },
  // 根据barId新增酒水分类
  addGoodsCategoryUrl: (barId) => {
    return `bars/${barId}/goods/category`
  },
  // 根据barId,id删除酒水分类
  deleteGoodsCategoryUrl: (id, barId) => {
    return `bars/${barId}/goods/category/${id}`
  },
  // 根据barId,id编辑酒水分类
  editGoodsCategoryUrl: (id) => {
    return `bars/goods/category/${id}`
  },
  // 酒水牌·······酒水········
  // 根据barId获取酒水列表
  getGoodsUrl: (barId) => {
    return `bars/${barId}/goods?_pagination=0&_include=bar_goods_cat`
  },
  // 根据barId添加酒水
  addGoodsUrl: (barId) => {
    return `bars/${barId}/goods?_include=bar_goods_cat`
  },
  // 根据barId修改酒水
  editGoodsUrl: (id) => {
    return `bars/goods/${id}?_include=bar_goods_cat`
  },
  // 根据酒水ID获取酒水分类详情
  getGoodsdetailUrl: (id, barId) => {
    return `bars/goods/category/${id}/detail?bar_id=${barId}`
  },
  // 根据barId,id删除酒水
  deleteGoodsUrl: (id, barId) => {
    return `bars/${barId}/goods/${id}`
  },
  // ·········活动············
  // 根据barId获取酒吧活动列表

  getActivityUrl: (barId, sort) => {
    return `bars/${barId}/activities?_sort=${sort}&_pagination=0`
  },
  // 根据barId添加酒吧活动
  addActivityUrl: (barId) => {
    return `bars/${barId}/activities`
  },
  // 根据barId和活动id删除酒吧活动
  activityUrl: (id, barId) => {
    return `bars/${barId}/activities/${id}`
  },
  // 获取酒吧全局开关
  getModuleUrl: (barId) => {
    return `modules/configs?bar_id=${barId}&cfg_type=3`
  },
  // 用户使用霸屏赠送霸屏时间
  occupyShareUrl: (barId) => {
    return `occupyscreen/${barId}/share/config`
  },
  // 获取营销人员列表
  getMarketerListUrl: (barId) => {
    return `table/marketer?bar_id=${barId}&_pagination=0`
  },
  // 删除营销人员列表
  deleteMarketerUrl: (id) => {
    return `table/marketer/${id}`
  },
  // 添加营销人员
  addMarketerUrl: () => {
    return `table/marketer`
  },
  // 更新营销人员
  updateMarketerUrl: (barId, id) => {
    return `table/${barId}/marketer/${id}`
  },
  // 获取套餐列表
  getMenuListUrl: (barId) => {
    return `table/menu/${barId}?_sort=-id`
  },
  // 删除套餐
  deleteMenuUrl: (id) => {
    return `table/menu/${id}`
  },
  // 添加套餐
  addMenuUrl: () => {
    return `table/menu`
  },
  // 获取酒吧订单列表
  getBarTableListUrl: (barId) => {
    return `table/${barId}/order?_pagination=0`
  },
  // 订单确认消费
  orderConsumeUrl: () => {
    return `table/order/consume`
  },
  // 获取酒吧女神活动列表
  getGoddessActivityUrl: (barId) => {
    return `goddess2/${barId}/activity?_pagination=0&_sort=-begin_time`
  },
  getLatestGoddessDetail (barId) {
    return `goddess2/${barId}/activity?_per_page=1&_sort=-begin_time`
  },
  // 添加酒吧女神活动
  addGoddessActivityUrl: (barId) => {
    return `goddess2/${barId}/activity`
  },
  editGoddessActivityUrl (barId, goddessId) {
    return `goddess2/${barId}/activity/${goddessId}`
  },
  // 获取女神列表
  getGoddessListUrl: (barId, page) => {
    return `goddess2/user?bar_id=${barId}&_pagination=0&sort=activity_id`
  },
  // 酒吧设置女神上墙状态
  setGoddessWallUrl: (barId, goddessId) => {
    return `goddess2/${barId}/wall/${goddessId}`
  },
  // 获取酒吧的夜聘联系人
  getBarHrUrl: (barId) => {
    return `job/bar/hr/${barId}?_include=user`
  },
  // 更换酒吧夜聘联系人
  updateBarHrUrl: () => {
    return `job/bar/bind/hr?_include=user`
  },
  // 根据酒吧ID获取酒吧Wifi列表
  barWifiUrl: (barId) => {
    return `bars/${barId}/wifis`
  },
  // 删除酒吧Wifi
  deleteBarWifiUrl: (barId, wifiId) => {
    return `bars/${barId}/wifis/${wifiId}`
  },
  // 在线抽奖获取酒吧设定的中奖用户列表
  getGamesUsersListUrl: (barId) => {
    return `games/online/user/${barId}?_include=user,prize&_pagination=0`
  },
  // 在线抽奖设定中奖用户
  addGamesUsersUrl: (barId) => {
    return `games/online/user/${barId}?_include=user,prize`
  },
  // 在线抽奖删除设定中奖用户
  deleteGamesUsersUrl: (barId, userId) => {
    return `games/online/user/${barId}/${userId}`
  },
  // 获取奖品列表
  getGamesPrizesUrl: (barId) => {
    return `games/prizes/${barId}?status=1&_pagination=0`
  },
  // 跑马场游戏押注设置
  horseSettingUrl: (barId) => {
    return `games/${barId}/horse/stakesetting`
  },
  // 根据酒吧id游戏类型获取奖金池列表
  getGamesPrizesListUrl: (barId, gameType) => {
    return `games/prizes/settings/${barId}/${gameType}`
  },
  // 删除奖金池奖品
  gamesPrizeUrl: (barId, prizeSettingsId) => {
    return `games/prizes/settings/${barId}/${prizeSettingsId}`
  },
  // 根据酒吧id奖品id添加奖金池奖品
  addGamesPrizeUrl: (barId) => {
    return `games/prizes/settings/${barId}`
  },
  // 转动魔方押注设置
  magicSettingUrl: (barId) => {
    return `games/magic/stake/setting/${barId}`
  },
  // 转动魔方获取设置的奖品列表
  getMagicPrizeListUrl: (barId) => {
    return `games/magic/prizes/${barId}`
  },
  // 转动魔方获取设置的奖品列表
  magicPrizeUrl: (barId) => {
    return `games/magic/prize/setting/${barId}`
  },
  // 转动魔方删除设置的奖品
  deleteMagicPrizeUrl: (barId, setId) => {
    return `games/magic/prize/${barId}/${setId}`
  },
  // 摇摇赛跑设置信息
  runningSettingUrl: (barId) => {
    return `games/rockrunning/${barId}/setting`
  },
  // 获取酒吧霸屏分销订单列表
  getOccupyDistributeUrl: (barId) => {
    return `occupyscreen/${barId}/distribution?_include=user`
  },
  // 删除霸屏分销人员
  occupyDistributeUrl: (barId, distributionId) => {
    return `occupyscreen/${barId}/distribution/${distributionId}?_include=user`
  },
  // ·············消息············
  // 根据barId获取酒吧推送记录列表
  getMsgUrl: (barId) => {
    return `bars/${barId}/pushes?msg_type=1`
  },
  // 根据barId发送推送
  addMsgUrl: () => {
    return `pushes`
  },
  // 根据Id修改推送消息
  editMsgUrl: (id) => {
    return `pushes/${id}`
  },
  // 根据Id删除推送消息
  deleteMsgUrl: (id) => {
    return `pushes/${id}`
  },
  // 投票···············
  // 根据barId获取酒吧投票场次列表
  getVoteUrl: (barId) => {
    return `vote/${barId}/setting?_include=vote_crops&_pagination=0`
  },
  // 根据barId酒吧新增投票设置信息
  addVoteUrl: (barId) => {
    return `vote/setting/${barId}?_include=vote_crops`
  },
  // 根据barId酒吧修改投票设置信息
  editVoteUrl: (barId, id) => {
    return `vote/${barId}/setting/${id}?_include=vote_crops`
  },

  // 奖品库···············
  // 根据barId获取奖品列表
  getPrizesListUrl: (barId, status) => {
    let url = `games/prizes/${barId}?_pagination=0`
    if (status) {
      url += `&status=${status}`
    }
    return url
  },
  // 根据barId修改奖品
  editPrizesUrl: (barId) => {
    return `games/prizes/${barId}`
  },
  // 根据barId删除奖品
  deletePrizesUrl: (barId, id) => {
    return `games/prizes/${barId}/${id}`
  },

  // ··········飞镖····················
  // 根据酒吧ID获取大话骰规则设置
  getDartRuleUrl: (barId) => {
    return `dice/rule/${barId}`
  },
  // 根据酒吧ID设置大话骰规则
  setDartRuleUrl: (data) => {
    return `dice/rule`
  },
  // ··········大话骰····················
  // 根据酒吧ID获取大话骰规则设置
  getDiceRuleUrl: (barId) => {
    return `dice/rule/${barId}`
  },
  // 根据酒吧ID设置大话骰规则
  setDiceRuleUrl: (data) => {
    return `dice/rule`
  },
  // 根据酒吧ID获取大话骰奖品列表
  getDicePrizeUrl: (barId) => {
    return `dice/prize/${barId}?_sort=condition`
  },
  // 根据酒吧ID大话骰添加奖品设置
  addDicePrizeUrl: (barId) => {
    return `dice/prize/setting/${barId}`
  },
  // 根据酒吧ID大话骰修改奖品设置
  editDicePrizeUrl: (barId, id) => {
    return `dice/prize/setting/${barId}/${id}`
  },
  // 根据酒吧id大话骰删除奖品设置
  deleteDicePrizeUrl: (barId, id) => {
    return `dice/prize/${barId}/${id}`
  },
  // 根据酒吧ID获取大话骰奖品列表
  deleteDartPrizeUrl: (barId, id, data) => {
    return `games/prizes/settings/${barId}/${id}`
  },
  // 根据酒吧id奖品id添加奖金池奖品飞镖
  addDartPrizeUrl: (barId, data) => {
    return `games/prizes/settings/${barId}`
  },
  // 根据酒吧id奖品id修改奖金池奖品飞镖
  editDartPrizeUrl: (barId, id) => {
    return `games/prizes/settings/${barId}/${id}`
  },
  /**
   * 获取七牛上传token
   * @returns {string}
   */
  getQiniuTokenUrl: () => {
    return `storages/qiniu/upload_token`
  },
  /**
   * 增加酒吧背景
   * @returns {string}
   */
  addChatroomBgUrl () {
    return `chatroom/theme`
  },
  uploadUrl () {
    return `users/avatar`
  },
  updataAvatar () {
    return `users/me/avatar`
  },
  // 生成带链接的二维码
  getQrcodeUrl: () => {
    return `link/qrcode`
  },
  // 根据酒吧ID获取酒吧幻灯片列表
  barBannersUrl: (barId) => {
    return `bars/${barId}/banners`
  },
  deleteBannerUrl (barId, id) {
    return `bars/${barId}/banners/${id}`
  },
  // 根据酒吧ID获取酒吧幻灯片列表
  adUrl: () => {
    return `slide/list?status=1&_per_page=8`
  },
  barUsersUrl: (barId, groleId, page) => {
    let url = `bars/${barId}/userslist?page=${page}&_include=user`
    if (groleId && groleId !== '-1') {
      url += `&group_id=${groleId}`
    }
    return url
  },
  changeUserGroup (barId, userId) {
    return `bars/${barId}/users/${userId}?_include=user`
  },
  fenchen (barId, userId) {
    return `commission/proportions?user_id=${userId}&bar_id=${barId}`
  },
  comsumption (userId, barId, page) {
    return `bars/${barId}/wallet/bills?user_id=${userId}&page=${page}`
  },
  getBroadcastUsers (barId) {
    return `broadcast/${barId}/admin?_include=user&_pagination=0`
  },
  broadcastUser (barId, id) {
    return `broadcast/${barId}/admin/${id}?_include=user`
  }
}

export default api
