// 最终环境变量配置
const env = TEST
console.log('defind',TEST)
let config = TEST? require('./developConfig.js') : require('./productionConfig.js')
let mutaionTypes = {
  OPEN_ID: 'gl-openid',
  USER_TOKEN: 'gl-usertoken',
  USER_INFO: 'gl-userinfo',
  BAR_INFO: 'gl-barinfo',
  QINIU_TOKEN: 'gl-qiniutoken',
  IS_REFRESHTOKEN: 'gl-is-refreshtoken',
  EVENT_BUS: 'gl-eventbus'
}
if (!config.DEV) {
  mutaionTypes.OPEN_ID += '-pro'
  mutaionTypes.USER_TOKEN += '-pro'
  mutaionTypes.QINIU_TOKEN += '-pro'
  mutaionTypes.BAR_INFO += '-pro'
  mutaionTypes.USER_INFO += '-pro'
}
Object.assign(config, {
  WECHAT_ID: 'wx56dd49c983d00077',
  CLIENT_ID: 'yeba-bar-admin',
  SCOPE: 'yeba_bar_admin',
  NETWORK_TIMEOUT: 10000,
  VERSION: '0.8.0'
})
config.STORAGE = mutaionTypes
export default config
