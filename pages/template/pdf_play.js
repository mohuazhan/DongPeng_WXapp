// pages/template/pdf_play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pdfUrl: '',
    //当前机型
    ios: true,
  },

  checkPhone(pdfUrl) {
    let _this = this;
    let _pdfUrl = pdfUrl;
    wx.getSystemInfo({
      success: function (res) {
        //判断当前机型
        if (res.system.indexOf('iOS') != -1) {
          _this.setData({
            pdfUrl: _pdfUrl
          })
        } else {
          _this.setData({
            ios: false
          })
          wx.downloadFile({
            url: _pdfUrl,
            success(res) {
              let path = res.tempFilePath;
              wx.openDocument({
                filePath: path,
                fileType: "pdf",
                success() {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            }
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取跳转时传入的参数
    // console.log(options.url);
    this.setData({
      pdfUrl: options.url
    })
    this.checkPhone(options.url);
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