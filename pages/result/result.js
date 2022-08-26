// pages/result/result.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        resText: '',
        imgUrl: '',
        arr: []
    },
    toGZH() {
        wx.navigateTo({
            url: '../uploadpage/uploadpage'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // var resText = '',
        //     imgUrl = '',
        //     arr = [];
        switch (options.res) {
            case '0':
                this.setData({
                    resText: '超神的领导者',
                    imgUrl: '../../assets/img1.png',
                    arr: ['领导讨论', '灵活控场', '1. 对面试题不熟悉时谨慎充当领导者哦', '2.多多引导组员作贡献更能得到认可'],

                })

                break;
            case '1':
                this.setData({
                    resText: '严谨的时间管理者',
                    imgUrl: '../../assets/img2.png',
                    arr: ['规划流程', '把控进度', '1. 群面初始便完成时间分配会有奇效哦~', '2. 提醒进度时适当唱黑脸很有必要'],
                })


                break;
            case '2':
                this.setData({
                    resText: '周密的总结者',
                    imgUrl: '../../assets/img3.png',
                    arr: ['梳理信息', '高度概括', '1. 概括时遗漏信息乃大忌', '2. 逻辑尚未梳理清晰时切忌充当总结者哦'],
                })

                break;
            case '3':
                this.setData({
                    resText: '灵活的协调者',
                    imgUrl: '../../assets/img4.png',
                    arr: ['化解分歧', '推进讨论', '1. 协调时发生争执乃大忌哦', '2. 遇强则强遇弱则弱的协调方式更有效'],
                })

                break;
            case '4':
                this.setData({
                    resText: '机智的观点者',
                    imgUrl: '../../assets/img5.png',
                    arr: ['思考题目', '提出idea', '1. 输出观点时最好能够结构性输出哦', '2. 有建设性的idea更能得到认可'],
                })

                break;
            default:
                this.setData({
                    resText: '',
                    imgUrl: '',
                    arr: []
                })

                break


        }
        this.setData({
            resText: '超神的领导者',
            imgUrl: '../../assets/img1.png',
            arr: ['领导讨论', '灵活控场', '1. 对面试题不熟悉时谨慎充当领导者哦', '2.多多引导组员作贡献更能得到认可'],

        })

        // console.log(options.res)
        // console.log(resText,
        //     imgUrl,
        //     arr)
        // setTimeout(() => {

        //     this.setData({
        //         resText: resText,
        //         imgUrl: imgUrl,
        //         arr: arr
        //     }, () => {
        //         console.log(this.data.arr)
        //     })
        // })


        // this.setData({
        //     arr: arr || ['领导讨论', '灵活控场', '1. 对面试题不熟悉时谨慎充当领导者哦', '2.多多引导组员作贡献更能得到认可']
        // })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})