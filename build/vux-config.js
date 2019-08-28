'use strict'

module.exports = {
  plugins: [
    'vux-ui',
    {
      name: 'duplicate-style',
      envs: ['production'],
      events: {
        done: function () {
          console.log('duplicate style clear done!')
        }
      }
    },
    {
      name: 'less-theme',
      path: 'src/style/theme.less'
    }
  ]
}
