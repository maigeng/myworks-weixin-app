// pages/mytext/mytext.js
var page = this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mytxt:'',
    mytxtname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  addtext:function(){
    var page = this;
    wx.chooseMessageFile({
      count: 2,
      type: 'all',
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片res.tempFiles;
        const tempFilePaths = res.tempFiles[0].path;
        const name = res.tempFiles[0].name;
        console.log(tempFilePaths);
        console.log(name);
        page.setData({
          mytxt: tempFilePaths,
          mytxtname: name,
        });
        console.log(res);
      }
    })
  },
  oppentext:function(){
    var page = this;
    wx.downloadFile({
      url: this.data.mytxt,
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          fileType: 'doc',
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
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