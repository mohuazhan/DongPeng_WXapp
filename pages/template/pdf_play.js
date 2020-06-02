// pages/template/pdf_play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pdfUrl: '',
    //当前机型，当checkPhone采用做法一时设为true，做法二是设为false
    ios: false,
    showProcess: false,
  },

// 做法一：以下做法是先判断机型，如果是ios则直接打开pdf，如果是安卓则下载后打开
// 但是对于小程序中打开PDF时出现"不支持打开非业务域名 https://www.dpjy.site "，需要在微信公众平台配置web-view业务域名，
// 然而个人小程序不支持配置业务域名，所以还是会弹出这个提示
// 不过PDF已经在后台下载，只需要等PDF下载完便会自动打开
  // checkPhone(pdfUrl) {
  //   let _this = this;
  //   let _pdfUrl = pdfUrl;
  //   wx.getSystemInfo({
  //     success: function (res) {
  //       //判断当前机型
  //       if (res.system.indexOf('iOS') != -1) {
  //         _this.setData({
  //           pdfUrl: _pdfUrl
  //         })
  //       } else {
  //         _this.setData({
  //           ios: false
  //         })
  //         wx.downloadFile({
  //           url: _pdfUrl,
  //           success(res) {
  //             let path = res.tempFilePath;
  //             wx.openDocument({
  //               filePath: path,
  //               fileType: "pdf",
  //               success() {
  //                 wx.navigateBack({
  //                   delta: 1
  //                 })
  //               }
  //             })
  //           }
  //         })
  //       }
  //     },
  //   })
  // },

// 做法二：现在无论是ios还是安卓，都统一下载后打开
  checkPhone(pdfUrl) {
    let _this = this;
    let _pdfUrl = pdfUrl;
    const downloadTask = wx.downloadFile({
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
    downloadTask.onProgressUpdate((res) => {
      this.setData({
        progress: res.progress
      })
      // console.log('下载进度', res.progress)
    //   console.log('已经下载的数据长度', res.totalBytesWritten)
    //   console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
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