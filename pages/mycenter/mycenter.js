var app = getApp()
Page({
  data: {
    aa:'离校-随时到岗',
    myname:'',
    mytx:''
  },
  onLoad(options) {
    var app = getApp(); 
    this.setData({
        myname: app.globalData.myname,
        mytx:app.globalData.mytx
    });
    console.log(app.globalData.myname);
  }
})