// pages/information/information.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    aa:"../../image/me/touxiang.png",
    date: '2000-01-01',
    region: ['广东省', '广州市', '番禺区'],
    customItem: '全部',
    weizhi:'',
  },
  tx:function(){
    var page = this;
    var list =['拍照','上传图片','获取图片信息'];
    wx.showActionSheet({
      itemList:list,
      success: function (res) {
        if (!res.cancel) {//拍照
          console.log(res.tapIndex);
          if(res.tapIndex==0){
            wx.navigateTo({
              url: '../camera/camera',
            })
          }
          else if(res.tapIndex==1){//上传图片
            wx.chooseMedia({
              count: 9, // 默认9
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              success: function (res) {
                //返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFiles[0].tempFilePath;
                //打印文件路径              
                page.setData({
                  aa: tempFilePaths
                });
                app.globalData.mytx= page.data.aa;
                console.log(page.data.aa);
              }
            })
          }
          else if(res.tapIndex==2){
            wx.getImageInfo({
              src:page.data.aa,
              success: function (res) {
                 wx.showModal({//提示框
                  title: '图片信息',
                  content:"图片宽度=" + res.width + "；图片高度=" + res.height  + "；图片格式=" + res.type+ "；拍照时设备方向=" + res.orientation+ "；图片的路径=" + res.path ,
                    })
              }
            })
          }
          
        }
      }
    })
  },
  radioChange: function (e) {
    console.log('性别为：', e.detail.value)
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  wz: function (e) {
    var page = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        page.setData({
          weizhi:res.address+res.name
        })
       
      }
    })
  },
  dz: function (e) {
    wx.showModal({//提示框
      title: '提示',
      content:"可查看当前位置",
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success: function (res) {
              var latitude = res.latitude
              var longitude = res.longitude
              wx.openLocation({
                latitude: latitude,
                longitude: longitude,
                scale: 18
              })
            }
          })
        } 
      }
        })
  },
  userNameInputAction: function (options) {
    //获取输入框输入的内容
    let value = options.detail.value;
    console.log("输入框输入的内容是 " + value)
    app.globalData.myname= value;
    console.log(app.globalData.myname);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      aa: app.globalData.mytx
  });
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