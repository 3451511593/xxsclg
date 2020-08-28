// pages/goods/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchid:'',
    url:'/pages/goods/index/index?merchid=99',
    // 商店详情页面访问的链接
    url1:'https://shops.leju315.com/app/ewei_shopv2_api.php?i=3&r=goods.get_list&merchid=99&page=1&comefrom=wxapp&openid=sns_wa_odQqC4genlTps6EPy58cg72bAegk&mid=&authkey=&timestamp=1597670066962'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var merchid = options.merchid
      this.setData({
        merchid:merchid
      })
      
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