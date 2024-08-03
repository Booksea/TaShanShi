// pages/hole/index.js
import { Hole } from '../../models/hole'

Page({
  data: {
    holes: [],
    holePaging: null  // 热点资讯分页器
  },

  onLoad() {
    this.initHoles()
  },

  /**
   * 初始化热点资讯
   */
  async initHoles() {
    const holePaging = await Hole.getHolePaging()
    this.setData({
      holePaging: holePaging
    })
    await this.getMoreHoles(holePaging)
  },

  /**
   * 获取更多热点资讯
   */
  async getMoreHoles(holePaging) {
    const data = await holePaging.getMore()
    if (!data) {
      return
    }
    this.setData({
      holes: data.accumulator
    })
  },

  /**
   * 触底加载
   */
  async onReachBottom() {
    await this.getMoreHoles(this.data.holePaging)
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    this.initHoles()
    wx.stopPullDownRefresh()
    wx.vibrateShort()
  },

  onShareAppMessage() {
    return {
      title: '热点资讯',
      path: '/pages/hole/index'
    }
  }
})
