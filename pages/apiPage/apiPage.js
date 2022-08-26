// pages/apiPage/apiPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '',
    sendMsg: [],
    socketOpen: false,
    resData: []
  },
  a1() {
    var requestTask = wx.request({
      url: 'https://api.mofun365.com:8888/api/address/getAddressList',
      data: {
        provinceId: '3'
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
      }
    });
    //监听 HTTP Response Header 事件
    requestTask.onHeadersReceived(function (res) {
      console.log("-----------监听 HTTP Response Header 事件-------------");
      console.log(res);
    });
    //取消监听 HTTP Response Header 事件
    requestTask.offHeadersReceived(function () {
      console.log("-----------取消监听 HTTP Response Header--------------");
    });
    //中断请求任务
    //requestTask.abort();
  }, a2() {
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        //创建uploadTask对象
        const uploadTask = wx.uploadFile({
          url: 'https://api.mofun365.com:8888/api/banner/wxUploadFile',
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'Application/json'
          },
          formData: {
            imgName: '我是图片名称',
            imgSize: '122kb',
            position: 'wx' //自定义文件存放的文件夹
          },
          success: function (res) {
            console.log(res);
          }
        });
        //监听 HTTP Response Header 事件
        uploadTask.onHeadersReceived(function (res) {
          console.log("-----------监听 HTTP Response Header 事件-------------");
          console.log(res);
        });
        //取消监听 HTTP Response Header 事件
        uploadTask.offHeadersReceived(function () {
          console.log("-----------取消监听 HTTP Response Header--------------");
        });
        //监听上传进度变化事件
        uploadTask.onProgressUpdate(function (res) {
          console.log("-----------监听上传进度变化事件-------------");
          console.log(res);
        });
        //取消监听上传进度变化事件
        uploadTask.offProgressUpdate(function () {
          console.log("-----------取消监听上传进度变化事件--------------");
        });
        //中断请求任务
        //uploadTask.abort();
      }
    })
  },
  authorize() {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            }
          })
        }
      }
    })
  },
  capture() {
    wx.onUserCaptureScreen(function (res) {
      console.log('用户截屏了')
    })
  },
  chooseImage() {

    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        //返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        //打印文件路径
        console.log(tempFilePaths);
      }
    })
  },

  downloadFile() {

    var page = this;
    const downloadTask = wx.downloadFile({
      url: "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png",
      type: 'image', // 下载资源的类型，用于客户端识别处理，有效值：image/audio/video
      success: function (res) {
        console.log(res);
        var tempPath = res.tempFilePath;
        page.setData({ src: tempPath });
      }
    })

    //监听 HTTP Response Header 事件
    downloadTask.onHeadersReceived(function (res) {
      console.log("-----------监听 HTTP Response Header 事件-------------");
      console.log(res);
    });
    //取消监听 HTTP Response Header 事件
    downloadTask.offHeadersReceived(function () {
      console.log("-----------取消监听 HTTP Response Header--------------");
    });
    //监听下载进度变化事件
    downloadTask.onProgressUpdate(function (res) {
      console.log("-----------监听下载进度变化事件-------------");
      console.log(res);
    });
    //取消监听下载进度变化事件
    downloadTask.offProgressUpdate(function () {
      console.log("-----------取消监听下载进度变化事件--------------");
    });
  },
  createConn: function () {
    var page = this;
    wx.connectSocket({
      url: 'wss://api.mofun365.com:8888/api/socketServer',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'Application/json'
      },
      method: "GET"
    });
    wx.onSocketOpen(function (res) {
      console.log(res);
      page.setData({ socketOpen: true });
      console.log('WebSocket连接已打开！')
    });
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
  },
  send: function (e) {
    if (this.data.socketOpen) {
      console.log(this.data.socketOpen);
      wx.sendSocketMessage({
        data: this.data.msg
      });
      var sendMsg = this.data.sendMsg;
      sendMsg.push(this.data.msg);
      this.setData({ sendMsg: sendMsg });
      var page = this;
      wx.onSocketMessage(function (res) {
        var resData = page.data.resData;
        resData.push(res.data);
        page.setData({ resData: resData });
        console.log(resData);
        console.log('收到服务器内容：' + res.data)
      })
    } else {
      console.log('WebSocket连接打开失败，请检查！');
    }
  },
  closeConn: function (e) {
    wx.closeSocket();
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    });
  },
  getMsg: function (e) {
    var page = this;
    page.setData({ msg: e.detail.value });
  },
  // WebSocket() { },
  previewImage() {
    wx.previewImage({
      current: 'https://api.mofun365.com:8888/images/goods/1555850845474.jpg', // 当前显示图片的http链接
      urls: [
        "https://api.mofun365.com:8888/images/goods/1555850845474.jpg",
        "https://api.mofun365.com:8888/images/goods/1555851154057.jpg",
        "https://api.mofun365.com:8888/images/goods/1555851345937.jpg"
      ] // 需要预览的图片http链接列表
    })
  },
  getImageInfo() {
    wx.getImageInfo({
      src: 'https://api.mofun365.com:8888/images/goods/1555850845474.jpg',
      success: function (res) {
        console.log("图片宽度=" + res.width);
        console.log("图片高度=" + res.height);
        console.log("图片返回路径=" + res.path);
        console.log("图片格式=" + res.type);
        console.log("拍照时设备方向=" + res.orientation);
      }
    })
  },
  saveImageToPhotosAlbum() {
    var page = this;
    wx.downloadFile({
      url: "https://api.mofun365.com:8888/images/goods/1555850845474.jpg",
      type: 'image',
      success: function (res) {
        console.log(res);
        var tempPath = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: tempPath,
          success: function (res) {
            console.log(res);
          }
        })
      }
    })
  },
  compressImage() {
    wx.compressImage({
      src: '/images/goods/1555850845474.jpg', // 图片路径
      quality: 80, // 压缩质量
      complete: function (res) {
        console.log(res);
        var tempPath = res.tempFilePath;
        console.log(tempPath);
      }
    })
  },
  chooseMessageFile() {
    wx.chooseMessageFile({
      count: 10,
      type: 'image',
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles;
        console.log(tempFilePaths);
      }
    })
  },
  saveFile() {
    wx.getImageInfo({
      src: 'https://api.mofun365.com:8888/images/goods/1555850845474.jpg ',
      success: function (res) {
        var path = res.path;
        console.log("临时文件路径=" + path);
        wx.saveFile({
          tempFilePath: path,
          success: function (res) {
            var savedFilePath = res.savedFilePath;
            console.log("本地文件路径=" + savedFilePath);
          }
        })
      }
    })
  },
  getSavedFileList() {
    wx.getSavedFileList({
      success: function (res) {
        var fileList = res.fileList;
        console.log(fileList)
        var file = fileList[0];
        wx.getSavedFileInfo({
          filePath: file.filePath,
          success: function (res) {
            console.log("文件创建时间=" + res.createTime);
            console.log("文件大小=" + res.size);
            console.log("文件本地路径=" + res.errMsg);
          }
        })
      }
    })
  }, getSavedFileInfo() {
    wx.getSavedFileList({
      success: function (res) {
        var fileList = res.fileList;
        console.log(fileList)
        for (var i = 0; i < fileList.length; i++) {
          var file = fileList[i];
          console.log("第" + (i + 1) + "个文件:");
          console.log("文件创建时间=" + file.createTime);
          console.log("文件大小=" + file.size);
          console.log("文件本地路径=" + file.filePath);
        }
      }
    })
  },
  removeSavedFile() {
    wx.getSavedFileList({
      success: function (res) {
        var fileList = res.fileList;
        console.log(fileList)
        var file = fileList[0];
        wx.removeSavedFile({
          filePath: file.filePath,
          complete: function (res) {
            console.log(res)
          }
        })
      }
    })
  },
  openDocument() {
    wx.downloadFile({
      url: 'http://www.crcc.cn/portals/0/word/应聘材料样本.doc',
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
  getFileInfo() {
    wx.getFileInfo({
      filePath: '/images/goods/1555850845474.jpg',//本地文件路径 (本地路径)
      complete: function (res) {
        console.log("文件大小size=" + res.size);
        console.log("文件摘要digest=" + res.digest)
      }
    })
  },
  setStorage() { wx.setStorageSync('userSync', userSync) },
  getStorage() {
    var storage = wx.getStorageInfoSync();
    console.log(storage);
  },
  clearStorage() {
    try {
      //异步清理缓存数据
      wx.clearStorage();
      //同步清理缓存数据
      wx.clearStorageSync();
    } catch (e) {

    }
  },
  getLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude;
        console.log("纬度=" + latitude);
        var longitude = res.longitude;
        console.log("经度=" + longitude);
        var speed = res.speed;
        console.log("速度=" + speed);
        var accuracy = res.accuracy;
        console.log("精确度=" + accuracy);
        var altitude = res.altitude;
        console.log("高度=" + altitude);
        var verticalAccuracy = res.verticalAccuracy;
        console.log("垂直精度=" + verticalAccuracy);
        var horizontalAccuracy = res.horizontalAccuracy;
        console.log("水平精度=" + horizontalAccuracy);
      }
    })
  },
  chooseLocation() {
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
      }
    })
  },
  openLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude;
        console.log("纬度=" + latitude);
        var longitude = res.longitude;
        console.log("经度=" + longitude);
        var speed = res.speed;
        console.log("速度=" + speed);
        var accuracy = res.accuracy;
        console.log("精确度=" + accuracy);
        var altitude = res.altitude;
        console.log("高度=" + altitude);
        var verticalAccuracy = res.verticalAccuracy;
        console.log("垂直精度=" + verticalAccuracy);
        var horizontalAccuracy = res.horizontalAccuracy;
        console.log("水平精度=" + horizontalAccuracy);
      }
    })
  },
  getSystemInfo() {
    try {
      var res = wx.getSystemInfoSync()
      console.log("手机型号=" + res.model)
      console.log("设备像素比=" + res.pixelRatio)
      console.log("窗口宽度=" + res.windowWidth)
      console.log("窗口高度=" + res.windowHeight)
      console.log("微信设置的语言=" + res.language)
      console.log("微信版本号=" + res.version)
      console.log("操作系统版本=" + res.system)
      console.log("客户端平台=" + res.platform)
    } catch (e) {
      // Do something when catch error
    }
  },
  getNetworkType() {
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型wifi 网络、3g 网络、4g 网络、5g 网络、unknown、none
        var networkType = res.networkType;
        console.log("网络类型=" + networkType);
      }
    })
  },
  onAccelerometerChange() { },
  compass() {
    wx.startCompass();

    //监听罗盘数据变化
    wx.onCompassChange(function (res) {
      console.log("面对的方向度数=" + res.direction)
    })

    //取消监听罗盘数据变化
    wx.offCompassChange(function (res) {
      console.log(res);
    });

    //停止监听罗盘数据
    wx.stopCompass()
  },
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: '13811112222'
    })
  },
  scanCode() {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  capture() {
    wx.onUserCaptureScreen(function (res) {
      console.log('用户截屏了')
    })
  },
  login() {
    wx.login({
      success: function (res) {
        var code = res.code; //用户登录凭证
        if (code) {
          console.log('获取用户登录凭证:' + code);
        } else {
          console.log('获取用户登录凭证失败');
        }
      }
    })
  },
  getUserInfo() {
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      }
    })
  },
  requestPayment() { },
  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})