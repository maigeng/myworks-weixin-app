// pages/advantage/advantage.js
var app = getApp(); 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    placeholder: '我的优势是...',
    mytext:''
  },
  Readyy: function () {//初始化编辑器
    var that = this;
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context;
    }).exec()
  },
  Changee: function (e) {//监控编辑器内容变化,赋值
    console.log(e.detail);
    this.setData({
      mytext:e.detail.text
    })
  },
  clickBtn: function (e) {//操作
    app.globalData.mytxt = this.data.mytext;
    //清空编辑器内容
    this.editorCtx.clear();
    wx.showToast({//消息提示框
      title: '提交成功',
      icon: 'success',
      duration: 10000
    })
    setTimeout(function () {
      wx.hideToast()
    }, 2000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})