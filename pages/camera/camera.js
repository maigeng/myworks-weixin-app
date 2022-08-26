var app = getApp();
Page({
  data:{
      src:' '
  },
  takePhoto:function() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
        console.log(res.tempImagePath);
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },
  savePhoto:function() {
    app.globalData.mytx= this.data.src;
    console.log(app.globalData.mytx);
  }
})
