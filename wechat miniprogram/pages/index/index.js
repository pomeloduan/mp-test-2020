//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    date: '2000-01-01',
    abc: "",
    sx: "",
    xz: "",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
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
    } else if (this.data.canIUse) {
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
  getUserInfo: function (e) {
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
    var i = 0
    var xzlist = [{ 月: 1, 日: 19, 名: '摩羯座' }, { 月: 2, 日: 18, 名: '水瓶座' }, { 月: 3, 日: 20, 名: '双鱼座' }, { 月: 4, 日: 20, 名: '白羊座' }, { 月: 5, 日: 20, 名: '金牛座' }, { 月: 6, 日: 21, 名: '双子座' }, { 月: 7, 日: 22, 名: '巨蟹座' }, { 月: 8, 日: 22, 名: '狮子座' }, { 月: 9, 日: 22, 名: '处女座' }, { 月: 10, 日: 22, 名: '天秤座' }, { 月: 11, 日: 21, 名: '天蝎座' }, { 月: 12, 日: 21, 名: '射手座' }, { 月: 12, 日: 31, 名: '摩羯座' }]
    for (i = 0; i < xzlist.length; i++) {
      if (xzdate <= (xzlist[i].月 - 1) * 31 + xzlist[i].日) {
        console.log(a = xzlist[i].名)
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
