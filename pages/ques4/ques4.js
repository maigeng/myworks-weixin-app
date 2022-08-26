// pages/ques1/ques1.js
import ques from '../../utils/question.js';
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        question: ques[3],
        active: ''
    },

    getAnswer(val) {
        this.setData({
            active: val.currentTarget.dataset.index
        }, () => {
            app.globalData.answerArr[3] = this.data.active
            wx.navigateTo({
                url: '../ques5/ques5'
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