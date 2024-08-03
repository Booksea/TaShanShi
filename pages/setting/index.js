// pages/setting/index.js
const app = getApp()

Page({
  data: {
    githubURI: app.globalData.githubURI,
    showPopup: false
  },

  onLoad() { },

  /**
   * 打开权限页面
   */
  openSetting() {
    wx.openSetting({})
  },

  /**
   * 清除缓存
   */
  clearStorage() {
    const dialog = this.selectComponent('#dialog')

    dialog.linShow({
      type: 'confirm',
      title: '提示',
      content: '确定要清除所有缓存？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorage()
          app.globalData.userDetail = null
        }
      }
    })
  },

  /**
   * 展开或收起弹出层
   */
  togglePopup() {
    this.setData({
      showPopup: !this.data.showPopup
    })
  },

  /**
   * 图片预览
   */

  onShareAppMessage() {
    return {
      title: '主页',
      path: '/pages/topic/index'
    }
  }
})
