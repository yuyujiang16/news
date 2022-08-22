// pages/my/my.js
var common = require('../../utils/common.js')
Page({
  goToDetail:function(e){
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url:'../detail/detail?id='+id
    })
  },
  getMyFavorites:function(){
    let info=wx.getStorageInfoSync();
    let keys=info.keys;
    let num=keys.length;
    let myList=[];
    for(var i=0;i<num;i++){
      let obj=wx.getStorageSync(keys[i]);
      myList.push(obj);
    }
    this.setData({
      newsList:myList,
      num:num
    });
  },
  getMyInfo:function(e){
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          isLogin:true,
          src: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
      }
    })
    this.getMyFavorites();
    // let info=e.detail.userInfo;
    // this.setData({
    //   isLogin:true,
    //   src:info.avatarUrl,
    //   nickName:info.nickName
    // })
  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function() {
    if(this.data.isLogin){
      this.getMyFavorites()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})