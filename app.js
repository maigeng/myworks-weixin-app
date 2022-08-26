// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
  },
  globalData: {
    answerArr: [],
    myname:'name',
    mytx:'../../image/mycenter/touxiang.jpg',//头像
    mytxt:'熟练掌握JAVA语言，具备良好的编程习惯,具有大厂实习经验，擅长自学,能够高效地进行团队沟通、协作'//我的优势
  }
})
