import api from '../config/api'
import wxutil from '../miniprogram_npm/@yyjeffrey/wxutil/index'
import { Paging } from '../utils/paging'

class Hole {
  /**
   * 获取热点资讯分页器
   */
  static async getHolePaging() {
    return new Paging(api.holeAPI)
  }

  /**
   * 获取热点资讯详情
   */
  static async getHoleDetail(holeId) {
    const res = await wxutil.request.get(`${api.holeAPI}/${holeId}`)
    if (res.code === 0) {
      return res.data
    }
    return null
  }

  /**
   * 预约热点资讯
   */
  static async orderHole(holeId) {
    return await wxutil.request.post(`${api.holeAPI}/reserve/`, { hole_id: holeId })
  }
}

export {
  Hole
}
