//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    date: '2000-01-01',
    abc:"",
    sx:"",
    xz: "",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindDateChange: function (e) {
    var newDate = new Date(e.detail.value)
    var sxlist = "猴鸡狗猪鼠牛虎兔龙蛇马羊"
    var xzdate = 31 * newDate.getMonth() + newDate.getDate()
    var a = 0
    var i=0
    var xzlist = [[1, 19, '摩羯座'], [2, 18, '水瓶座'], [3, 20, '双鱼座'], [4, 20, '白羊座'], [5, 20, '金牛座'], [6, 21, '双子座'], [7, 22, '巨蟹座'], [8, 22, '狮子座'], [9, 22, '处女座'], [10, 22, '天秤座'], [11, 21, '天蝎座'], [12, 21, '射手座'], [12, 31, '摩羯座']]
    for (i = 0; i < xzlist.length; i++) {
      if (xzdate <= (xzlist[i][0] - 1) * 31 + xzlist[i][1]) {
        console.log(a = xzlist[i][2])
        break
      }
    }
    this.setData({
      date: e.detail.value,
      abc: (newDate.getMonth() + 1) + '月' + newDate.getDate() + '日',
      sx: sxlist[newDate.getFullYear() % 12],
      xz: a
      })
  },
})