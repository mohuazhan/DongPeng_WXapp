const md = require('./delta.md.js');

// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    md: md,
    // 轮播图配置
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    bg: "#40E0D0",  // swiper小圆点样式
    // 轮播图图片列表
    imgUrls: ["../images/haibao/dp-hb1.jpg", "../images/haibao/dp-hb2.jpg", "../images/haibao/dp-hb3.jpg"],
    height: 0,  // 这是swiper要动态设置的高度属性
    currentTab: 0,  // 发起post请求时字段id为字符串，故currentTab不设为数字
    currentList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    flag: 0,
    event: '',
  },

  // 添加页签菜单单击绑定事件switchNav，动态地给currentTab和flag变量赋值
  switchNav: function (e) {
    // console.log(e);
    var page = this;
    var id = e.target.id;
    if (this.data.currentTab == id) {
      return false;
    } else {
      page.setData({ currentTab: id });
    }
    this.loadPDFs();
  },
  // 请求PDF列表
  loadPDFs: function (e) {
    var page = this;
    var currentTab = this.data.currentTab;
    wx.request({
      url: 'https://www.dpjy.site:8088/v1/wxdevelop/media/list',
      data: {
        "id": String(currentTab),
        "type": 1
      },
      method: 'POST',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        // console.log(res);
        var array = res.data;
        page.setData({ array: array });
      }
    })
  },

  // 向模板传入参数并触发事件
  templateInteraction: function () {
    var event = this;
    event.clickAction = "loadDetail";
    this.setData({ event: event })
  },
  loadDetail: function (e) {
    // 打印data-url绑定的数据
    // console.log(e.currentTarget.dataset.url);
    var pdfUrl = e.currentTarget.dataset.url;
    wx.navigateTo({
      // 跳转的页面记得先在app.json注册
      url: '/pages/template/pdf_play?url=' + pdfUrl,
    })
  },

  //计算 scroll-view 的高度
  computeScrollViewHeight: function (e) {
    var that = this;
    var query = wx.createSelectorQuery().in(this);
    //获取屏幕可用高度
    var screenHeight = wx.getSystemInfoSync().windowHeight;
    //计算 scroll-view 的高度
    var scrollHeight = screenHeight - 76;
    // console.log(haibaoHeight);
    that.setData({
      scrollHeight: scrollHeight
    })
  },

  // 滑动时动态改变currentTab
  switchTab: function (e) {
    // console.log(e);
    this.setData({
      currentTab: e.detail.current,
    });
    this.loadPDFs();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.loadPDFs();
    this.templateInteraction();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.computeScrollViewHeight();
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