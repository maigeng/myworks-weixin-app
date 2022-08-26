// pages/me/me.js
var app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aa:'离校-随时到岗',
    myname:'',
    mytx:'',
    mytxt:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
        myname: app.globalData.myname,
        mytx: app.globalData.mytx,
        mytxt:app.globalData.mytxt
    });
    console.log(app.globalData.myname);

  },
  qzzt:function(){
    var page = this;
    var list =['离校-随时到岗','在校-月内到岗','在校-考虑机会','在校-暂不考虑'];
    wx.showActionSheet({
      itemList:list,
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex);
          page.setData({aa: list[res.tapIndex]});
        }
      }
    })
  },
  grys:function(){
  wx.showModal({//提示框
    title: '个人优势',
    content: this.data.mytxt,
  })
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