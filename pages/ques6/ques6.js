// pages/ques1/ques1.js
import ques from '../../utils/question.js';
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        question: ques[5],
        active: ''
    },

    getAnswer(val) {
        this.setData({
            active: val.currentTarget.dataset.index
        }, () => {
            app.globalData.answerArr[5] = this.data.active
            var resArr = [0, 0, 0, 0, 0]; //领导者9 时间控制者7 总结者6 协调者5 观点者2
            if (app.globalData.answerArr[0] == 'A') {
                resArr[1] += 7
            } else {
                resArr[4] += 2
            }
            if (app.globalData.answerArr[1] == 'A') {
                resArr[3] += 5
            } else if (app.globalData.answerArr[1] == 'B') {
                resArr[4] += 2
            } else if (app.globalData.answerArr[0] == 'A' && app.globalData.answerArr[1] == 'C') {
                resArr[0] = 0
            } else {
                resArr[0] += 9
            }
            if (app.globalData.answerArr[2] == 'B') {
                resArr[3] += 5
            } else {
                resArr[4] += 2
            }

            if (app.globalData.answerArr[3] == 'B') {
                resArr[2] += 6
            } else {
                resArr[4] += 2
            }
            if (app.globalData.answerArr[4] == 'A') {
                resArr[2] += 6
            } else {
                resArr[4] += 2
            }
            if (app.globalData.answerArr[5] == 'A' || app.globalData.answerArr[5] == 'B' || app.globalData.answerArr[5] == 'C') {
                resArr[4] += 2
            }
            var minNum = Math.max(...resArr)
            var a = resArr.findIndex((value) => {
                return value == minNum
            })

            wx.navigateTo({
                url: `../result/result?res=${a}`
            })



        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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