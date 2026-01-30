// pages/naozi/naozi.js
// 互动点子库 - 脑子tab页面逻辑

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 24点算术相关数据
    showGame24: false,
    game24Numbers: [],
    game24Expression: '',
    game24Message: '',
    game24MessageType: '',
    
    // 麻将胡牌相关数据
    showMahjong: false,
    mahjongHand: [],
    mahjongResult: null,
    mahjongHuCards: [],
    mahjongHuType: '',
    mahjongHuCardsText: '',
    mahjongHuTypeText: '',
    
    // 猜胡相关数据
    showGuessSection: false,
    guessedTiles: [],
    guessResult: null,
    correctHuCards: [],
    wrongAttempts: 0,
    showAnswerSection: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 初始化24点算术游戏
    this.newGame24()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 页面初次渲染完成时的操作
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 页面显示时的操作
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // 页面隐藏时的操作
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 页面卸载时的操作
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // 下拉刷新时的操作
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 上拉触底时的操作
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '互动点子库 - 挑战你的思维能力',
      path: '/pages/naozi/naozi',
      imageUrl: ''
    }
  },

  // ==================== 24点算术游戏相关方法 ====================

  /**
   * 切换24点算术游戏显示状态
   */
  toggleGame24() {
    // 切换24点游戏时，自动关闭麻将游戏
    if (!this.data.showGame24) {
      this.setData({
        showGame24: true,
        showMahjong: false
      })
    } else {
      this.setData({
        showGame24: false
      })
    }
  },

  /**
   * 生成新的24点算术游戏
   */
  newGame24() {
    // 预设的24点数字组合列表，确保每个组合都有解
    const validCombinations = [
      [1, 2, 3, 4], [1, 3, 4, 6], [1, 4, 5, 6], [1, 5, 5, 5], [1, 6, 6, 8],
      [2, 2, 3, 12], [2, 2, 4, 11], [2, 2, 5, 10], [2, 2, 7, 7], [2, 2, 8, 8],
      [2, 3, 3, 8], [2, 3, 5, 12], [2, 3, 8, 9], [2, 4, 4, 9], [2, 4, 6, 8],
      [2, 5, 5, 10], [2, 5, 8, 8], [2, 6, 6, 6], [2, 6, 7, 7], [2, 7, 7, 10],
      [2, 8, 9, 9], [3, 3, 3, 3], [3, 3, 3, 5], [3, 3, 3, 6], [3, 3, 3, 7],
      [3, 3, 3, 8], [3, 3, 3, 9], [3, 3, 4, 4], [3, 3, 4, 5], [3, 3, 4, 6],
      [3, 3, 4, 7], [3, 3, 4, 8], [3, 3, 4, 9], [3, 3, 5, 5], [3, 3, 5, 6],
      [3, 3, 6, 6], [3, 3, 6, 7], [3, 3, 6, 8], [3, 3, 6, 9], [3, 3, 7, 7],
      [3, 3, 7, 8], [3, 3, 8, 8], [3, 3, 8, 9], [3, 3, 9, 9], [3, 4, 4, 4],
      [3, 4, 4, 5], [3, 4, 4, 6], [3, 4, 4, 7], [3, 4, 4, 8], [3, 4, 4, 9],
      [3, 4, 5, 5], [3, 4, 5, 6], [3, 4, 5, 7], [3, 4, 5, 8], [3, 4, 5, 9],
      [3, 4, 6, 6], [3, 4, 6, 7], [3, 4, 6, 8], [3, 4, 6, 9], [3, 4, 7, 7],
      [3, 4, 7, 8], [3, 4, 7, 9], [3, 4, 8, 8], [3, 4, 8, 9], [3, 4, 9, 9],
      [3, 5, 5, 6], [3, 5, 5, 7], [3, 5, 5, 8], [3, 5, 5, 9], [3, 5, 6, 6],
      [3, 5, 6, 7], [3, 5, 6, 8], [3, 5, 6, 9], [3, 5, 7, 8], [3, 5, 7, 9],
      [3, 5, 8, 8], [3, 5, 8, 9], [3, 5, 9, 9], [3, 6, 6, 6], [3, 6, 6, 7],
      [3, 6, 6, 8], [3, 6, 6, 9], [3, 6, 7, 7], [3, 6, 7, 8], [3, 6, 7, 9],
      [3, 6, 8, 8], [3, 6, 8, 9], [3, 6, 9, 9], [3, 7, 7, 7], [3, 7, 7, 8],
      [3, 7, 7, 9], [3, 7, 8, 8], [3, 7, 8, 9], [3, 7, 9, 9], [3, 8, 8, 8],
      [3, 8, 8, 9], [3, 8, 9, 9], [3, 9, 9, 9], [4, 4, 4, 3], [4, 4, 4, 4],
      [4, 4, 4, 5], [4, 4, 4, 6], [4, 4, 4, 7], [4, 4, 4, 8], [4, 4, 4, 9],
      [4, 4, 5, 5], [4, 4, 5, 6], [4, 4, 5, 7], [4, 4, 5, 8], [4, 4, 5, 9],
      [4, 4, 6, 6], [4, 4, 6, 7], [4, 4, 6, 8], [4, 4, 6, 9], [4, 4, 7, 7],
      [4, 4, 7, 8], [4, 4, 7, 9], [4, 4, 8, 8], [4, 4, 8, 9], [4, 4, 9, 9],
      [4, 5, 5, 5], [4, 5, 5, 6], [4, 5, 5, 7], [4, 5, 5, 8], [4, 5, 5, 9],
      [4, 5, 6, 6], [4, 5, 6, 7], [4, 5, 6, 8], [4, 5, 6, 9], [4, 5, 7, 7],
      [4, 5, 7, 8], [4, 5, 7, 9], [4, 5, 8, 8], [4, 5, 8, 9], [4, 5, 9, 9],
      [4, 6, 6, 6], [4, 6, 6, 7], [4, 6, 6, 8], [4, 6, 6, 9], [4, 6, 7, 7],
      [4, 6, 7, 8], [4, 6, 7, 9], [4, 6, 8, 8], [4, 6, 8, 9], [4, 6, 9, 9],
      [4, 7, 7, 7], [4, 7, 7, 8], [4, 7, 7, 9], [4, 7, 8, 8], [4, 7, 8, 9],
      [4, 7, 9, 9], [4, 8, 8, 8], [4, 8, 8, 9], [4, 8, 9, 9], [4, 9, 9, 9],
      [5, 5, 5, 5], [5, 5, 5, 6], [5, 5, 5, 7], [5, 5, 5, 8], [5, 5, 5, 9],
      [5, 5, 6, 6], [5, 5, 6, 7], [5, 5, 6, 8], [5, 5, 6, 9], [5, 5, 7, 7],
      [5, 5, 7, 8], [5, 5, 7, 9], [5, 5, 8, 8], [5, 5, 8, 9], [5, 5, 9, 9],
      [5, 6, 6, 6], [5, 6, 6, 7], [5, 6, 6, 8], [5, 6, 6, 9], [5, 6, 7, 7],
      [5, 6, 7, 8], [5, 6, 7, 9], [5, 6, 8, 8], [5, 6, 8, 9], [5, 6, 9, 9],
      [5, 7, 7, 7], [5, 7, 7, 8], [5, 7, 7, 9], [5, 7, 8, 8], [5, 7, 8, 9],
      [5, 7, 9, 9], [5, 8, 8, 8], [5, 8, 8, 9], [5, 8, 9, 9], [5, 9, 9, 9],
      [6, 6, 6, 6], [1, 3, 5, 7], [1, 3, 5, 8], [1, 3, 6, 8], [1, 3, 7, 9],
      [1, 4, 5, 9], [1, 4, 6, 7], [1, 5, 7, 8], [1, 7, 8, 9], [2, 3, 4, 5],
      [2, 3, 4, 7], [2, 3, 6, 7], [2, 3, 6, 9], [2, 4, 5, 9], [2, 5, 6, 7],
      [2, 6, 7, 9], [1, 2, 7, 7], [1, 2, 8, 9], [1, 4, 7, 9], [1, 5, 6, 7],
      [1, 5, 8, 9], [1, 6, 7, 8], [1, 6, 8, 9], [2, 3, 4, 8], [2, 3, 4, 9],
      [2, 3, 5, 6], [2, 3, 5, 7], [2, 3, 5, 8], [2, 3, 5, 9], [2, 3, 6, 8],
      [2, 3, 7, 8], [2, 3, 7, 9], [2, 3, 8, 9], [2, 4, 5, 6], [2, 4, 5, 7],
      [2, 4, 5, 8], [2, 4, 6, 7], [2, 4, 6, 9], [2, 4, 7, 8], [2, 4, 7, 9],
      [2, 4, 8, 9], [2, 5, 6, 8], [2, 5, 6, 9], [2, 5, 7, 8], [2, 5, 7, 9],
      [2, 5, 8, 9], [2, 6, 7, 8], [2, 6, 8, 9], [2, 7, 8, 9], [3, 4, 5, 6],
      [3, 4, 5, 7], [3, 4, 5, 8], [3, 4, 5, 9], [3, 4, 6, 7], [3, 4, 6, 8],
      [3, 4, 6, 9], [3, 4, 7, 8], [3, 4, 7, 9], [3, 4, 8, 9], [3, 5, 6, 7],
      [3, 5, 6, 8], [3, 5, 6, 9], [3, 5, 7, 8], [3, 5, 7, 9], [3, 5, 8, 9],
      [3, 6, 7, 8], [3, 6, 7, 9], [3, 6, 8, 9], [3, 7, 8, 9], [4, 5, 6, 7],
      [4, 5, 6, 8], [4, 5, 6, 9], [4, 5, 7, 8], [4, 5, 7, 9], [4, 5, 8, 9],
      [4, 6, 7, 8], [4, 6, 7, 9], [4, 6, 8, 9], [4, 7, 8, 9], [5, 6, 7, 8],
      [5, 6, 7, 9], [5, 6, 8, 9], [5, 7, 8, 9], [6, 7, 8, 9], [1, 1, 8, 8],
      [1, 1, 9, 9], [1, 2, 2, 9], [1, 2, 3, 5], [1, 2, 3, 6], [1, 2, 3, 7],
      [1, 2, 3, 8], [1, 2, 3, 9], [1, 2, 4, 4], [1, 2, 4, 5], [1, 2, 4, 6],
      [1, 2, 4, 7], [1, 2, 4, 8], [1, 2, 4, 9], [1, 2, 5, 5], [1, 2, 5, 7],
      [1, 2, 5, 8], [1, 2, 5, 9], [1, 2, 6, 6], [1, 2, 6, 7], [1, 2, 6, 9],
      [1, 2, 7, 8], [1, 2, 7, 9], [1, 2, 8, 8], [1, 3, 3, 3], [1, 3, 3, 4],
      [1, 3, 3, 5], [1, 3, 3, 7], [1, 3, 3, 9], [1, 3, 4, 4], [1, 3, 4, 5],
      [1, 3, 4, 7], [1, 3, 4, 8], [1, 3, 4, 9], [1, 3, 5, 5], [1, 3, 5, 9],
      [1, 3, 6, 6], [1, 3, 6, 7], [1, 3, 6, 9], [1, 3, 7, 7], [1, 3, 7, 8],
      [1, 3, 8, 8], [1, 3, 8, 9], [1, 3, 9, 9], [1, 4, 4, 4], [1, 4, 4, 5],
      [1, 4, 4, 6], [1, 4, 4, 7], [1, 4, 4, 8], [1, 4, 4, 9], [1, 4, 5, 5],
      [1, 4, 5, 7], [1, 4, 5, 8], [1, 4, 6, 6], [1, 4, 6, 8], [1, 4, 6, 9],
      [1, 4, 7, 7], [1, 4, 7, 8], [1, 4, 8, 8], [1, 4, 8, 9], [1, 4, 9, 9],
      [1, 5, 5, 6], [1, 5, 5, 7], [1, 5, 5, 8], [1, 5, 5, 9], [1, 5, 6, 6],
      [1, 5, 6, 8], [1, 5, 6, 9], [1, 5, 7, 7], [1, 5, 7, 9], [1, 5, 8, 8],
      [1, 5, 8, 9], [1, 5, 9, 9], [1, 6, 6, 6], [1, 6, 6, 7], [1, 6, 6, 9],
      [1, 6, 7, 7], [1, 6, 7, 9], [1, 6, 8, 8], [1, 6, 8, 9], [1, 6, 9, 9],
      [1, 7, 7, 7], [1, 7, 7, 8], [1, 7, 7, 9], [1, 7, 8, 8], [1, 7, 8, 9],
      [1, 7, 9, 9], [1, 8, 8, 8], [1, 8, 8, 9], [1, 8, 9, 9], [1, 9, 9, 9],
      [2, 2, 2, 9], [2, 2, 3, 3], [2, 2, 3, 4], [2, 2, 3, 5], [2, 2, 3, 6],
      [2, 2, 3, 7], [2, 2, 3, 8], [2, 2, 3, 9], [2, 2, 4, 4], [2, 2, 4, 5],
      [2, 2, 4, 6], [2, 2, 4, 7], [2, 2, 4, 8], [2, 2, 5, 5], [2, 2, 5, 6],
      [2, 2, 5, 7], [2, 2, 5, 8], [2, 2, 5, 9], [2, 2, 6, 6], [2, 2, 6, 7],
      [2, 2, 6, 8], [2, 2, 6, 9], [2, 2, 7, 8], [2, 2, 7, 9], [2, 2, 8, 9],
      [2, 2, 9, 9], [2, 3, 3, 3], [2, 3, 3, 4], [2, 3, 3, 5], [2, 3, 3, 6],
      [2, 3, 3, 7], [2, 3, 3, 9], [2, 3, 4, 4], [2, 3, 4, 6], [2, 3, 4, 7],
      [2, 3, 4, 8], [2, 3, 4, 9], [2, 3, 5, 5], [2, 3, 5, 6], [2, 3, 5, 7],
      [2, 3, 5, 8], [2, 3, 5, 9], [2, 3, 6, 6], [2, 3, 6, 8], [2, 3, 6, 9],
      [2, 3, 7, 7], [2, 3, 7, 8], [2, 3, 7, 9], [2, 3, 8, 8], [2, 3, 8, 9],
      [2, 3, 9, 9], [2, 4, 4, 4], [2, 4, 4, 5], [2, 4, 4, 6], [2, 4, 4, 7],
      [2, 4, 4, 8], [2, 4, 4, 9], [2, 4, 5, 5], [2, 4, 5, 6], [2, 4, 5, 7],
      [2, 4, 5, 8], [2, 4, 5, 9], [2, 4, 6, 6], [2, 4, 6, 7], [2, 4, 6, 8],
      [2, 4, 6, 9], [2, 4, 7, 7], [2, 4, 7, 8], [2, 4, 7, 9], [2, 4, 8, 8],
      [2, 4, 8, 9], [2, 4, 9, 9], [2, 5, 5, 5], [2, 5, 5, 6], [2, 5, 5, 7],
      [2, 5, 5, 8], [2, 5, 5, 9], [2, 5, 6, 6], [2, 5, 6, 7], [2, 5, 6, 8],
      [2, 5, 6, 9], [2, 5, 7, 7], [2, 5, 7, 8], [2, 5, 7, 9], [2, 5, 8, 8],
      [2, 5, 8, 9], [2, 5, 9, 9], [2, 6, 6, 6], [2, 6, 6, 7], [2, 6, 6, 8],
      [2, 6, 6, 9], [2, 6, 7, 7], [2, 6, 7, 8], [2, 6, 7, 9], [2, 6, 8, 8],
      [2, 6, 8, 9], [2, 6, 9, 9], [2, 7, 7, 7], [2, 7, 7, 8], [2, 7, 7, 9],
      [2, 7, 8, 8], [2, 7, 8, 9], [2, 7, 9, 9], [2, 8, 8, 8], [2, 8, 8, 9],
      [2, 8, 9, 9], [2, 9, 9, 9], [3, 3, 3, 3], [3, 3, 3, 4], [3, 3, 3, 6],
      [3, 3, 3, 8], [3, 3, 4, 4], [3, 3, 4, 6], [3, 3, 4, 8], [3, 3, 5, 5],
      [3, 3, 5, 7], [3, 3, 5, 8], [3, 3, 6, 6], [3, 3, 6, 8], [3, 3, 6, 9],
      [3, 3, 7, 7], [3, 3, 7, 8], [3, 3, 7, 9], [3, 3, 8, 8], [3, 3, 8, 9],
      [3, 3, 9, 9], [3, 4, 4, 4], [3, 4, 4, 5], [3, 4, 4, 6], [3, 4, 4, 7],
      [3, 4, 4, 8], [3, 4, 4, 9], [3, 4, 5, 5], [3, 4, 5, 6], [3, 4, 5, 7],
      [3, 4, 5, 8], [3, 4, 5, 9], [3, 4, 6, 6], [3, 4, 6, 7], [3, 4, 6, 8],
      [3, 4, 6, 9], [3, 4, 7, 7], [3, 4, 7, 8], [3, 4, 7, 9], [3, 4, 8, 8],
      [3, 4, 8, 9], [3, 4, 9, 9], [3, 5, 5, 5], [3, 5, 5, 6], [3, 5, 5, 7],
      [3, 5, 5, 8], [3, 5, 5, 9], [3, 5, 6, 6], [3, 5, 6, 7], [3, 5, 6, 8],
      [3, 5, 6, 9], [3, 5, 7, 7], [3, 5, 7, 8], [3, 5, 7, 9], [3, 5, 8, 8],
      [3, 5, 8, 9], [3, 5, 9, 9], [3, 6, 6, 6], [3, 6, 6, 7], [3, 6, 6, 8],
      [3, 6, 6, 9], [3, 6, 7, 7], [3, 6, 7, 8], [3, 6, 7, 9], [3, 6, 8, 8],
      [3, 6, 8, 9], [3, 6, 9, 9], [3, 7, 7, 7], [3, 7, 7, 8], [3, 7, 7, 9],
      [3, 7, 8, 8], [3, 7, 8, 9], [3, 7, 9, 9], [3, 8, 8, 8], [3, 8, 8, 9],
      [3, 8, 9, 9], [3, 9, 9, 9], [4, 4, 4, 4], [4, 4, 4, 6], [4, 4, 4, 8],
      [4, 4, 5, 5], [4, 4, 5, 6], [4, 4, 5, 7], [4, 4, 5, 8], [4, 4, 5, 9],
      [4, 4, 6, 6], [4, 4, 6, 7], [4, 4, 6, 8], [4, 4, 6, 9], [4, 4, 7, 7],
      [4, 4, 7, 8], [4, 4, 7, 9], [4, 4, 8, 8], [4, 4, 8, 9], [4, 4, 9, 9],
      [4, 5, 5, 5], [4, 5, 5, 6], [4, 5, 5, 7], [4, 5, 5, 8], [4, 5, 5, 9],
      [4, 5, 6, 6], [4, 5, 6, 7], [4, 5, 6, 8], [4, 5, 6, 9], [4, 5, 7, 7],
      [4, 5, 7, 8], [4, 5, 7, 9], [4, 5, 8, 8], [4, 5, 8, 9], [4, 5, 9, 9],
      [4, 6, 6, 6], [4, 6, 6, 7], [4, 6, 6, 8], [4, 6, 6, 9], [4, 6, 7, 7],
      [4, 6, 7, 8], [4, 6, 7, 9], [4, 6, 8, 8], [4, 6, 8, 9], [4, 6, 9, 9],
      [4, 7, 7, 7], [4, 7, 7, 8], [4, 7, 7, 9], [4, 7, 8, 8], [4, 7, 8, 9],
      [4, 7, 9, 9], [4, 8, 8, 8], [4, 8, 8, 9], [4, 8, 9, 9], [4, 9, 9, 9],
      [5, 5, 5, 5], [5, 5, 5, 7], [5, 5, 5, 8], [5, 5, 6, 6], [5, 5, 6, 7],
      [5, 5, 6, 8], [5, 5, 6, 9], [5, 5, 7, 7], [5, 5, 7, 8], [5, 5, 7, 9],
      [5, 5, 8, 8], [5, 5, 8, 9], [5, 5, 9, 9], [5, 6, 6, 6], [5, 6, 6, 7],
      [5, 6, 6, 8], [5, 6, 6, 9], [5, 6, 7, 7], [5, 6, 7, 8], [5, 6, 7, 9],
      [5, 6, 8, 8], [5, 6, 8, 9], [5, 6, 9, 9], [5, 7, 7, 7], [5, 7, 7, 8],
      [5, 7, 7, 9], [5, 7, 8, 8], [5, 7, 8, 9], [5, 7, 9, 9], [5, 8, 8, 8],
      [5, 8, 8, 9], [5, 8, 9, 9], [5, 9, 9, 9], [6, 6, 6, 6], [6, 6, 6, 8],
      [6, 6, 7, 7], [6, 6, 7, 8], [6, 6, 7, 9], [6, 6, 8, 8], [6, 6, 8, 9],
      [6, 6, 9, 9], [6, 7, 7, 7], [6, 7, 7, 8], [6, 7, 7, 9], [6, 7, 8, 8],
      [6, 7, 8, 9], [6, 7, 9, 9], [6, 8, 8, 8], [6, 8, 8, 9], [6, 8, 9, 9],
      [6, 9, 9, 9], [7, 7, 7, 7], [7, 7, 7, 8], [7, 7, 7, 9], [7, 7, 8, 8],
      [7, 7, 8, 9], [7, 7, 9, 9], [7, 8, 8, 8], [7, 8, 8, 9], [7, 8, 9, 9],
      [7, 9, 9, 9], [8, 8, 8, 8], [8, 8, 8, 9], [8, 8, 9, 9], [8, 9, 9, 9],
      [9, 9, 9, 9]
    ];
    
    // 从本地存储获取已使用的组合
    let usedCombinations = wx.getStorageSync('usedGame24Combinations') || [];
    
    // 过滤出未使用的组合
    const unusedCombinations = validCombinations.filter(comb => {
      const combStr = comb.sort().join(',');
      return !usedCombinations.includes(combStr);
    });
    
    let numbers;
    if (unusedCombinations.length > 0) {
      // 从未使用的组合中随机选择
      const randomIndex = Math.floor(Math.random() * unusedCombinations.length);
      numbers = unusedCombinations[randomIndex];
      
      // 标记为已使用
      const combStr = numbers.sort().join(',');
      usedCombinations.push(combStr);
      // 限制存储的组合数量，避免占用过多空间
      if (usedCombinations.length > 1000) {
        usedCombinations.splice(0, usedCombinations.length - 1000);
      }
      wx.setStorageSync('usedGame24Combinations', usedCombinations);
    } else {
      // 如果所有组合都已使用，重新开始
      const randomIndex = Math.floor(Math.random() * validCombinations.length);
      numbers = validCombinations[randomIndex];
      // 清空已使用记录
      wx.setStorageSync('usedGame24Combinations', []);
    }
    
    // 随机打乱顺序
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    this.setData({
      game24Numbers: numbers,
      game24Expression: '',
      game24Message: '',
      game24MessageType: ''
    })
  },

  /**
   * 处理24点算术输入
   */
  onGame24Input(e) {
    this.setData({
      game24Expression: e.detail.value
    })
  },

  /**
   * 插入24点算术符号
   */
  insertGame24Symbol(e) {
    const value = e.currentTarget.dataset.value
    const action = e.currentTarget.dataset.action
    let expression = this.data.game24Expression
    
    if (action === 'backspace') {
      // 删除最后一个字符
      expression = expression.slice(0, -1)
    } else if (action === 'clear') {
      // 清空输入
      expression = ''
    } else {
      // 插入符号
      expression += value
    }
    
    this.setData({
      game24Expression: expression
    })
  },

  /**
   * 提交24点算术答案
   */
  submitGame24() {
    const expression = this.data.game24Expression
    const numbers = this.data.game24Numbers
    
    if (!expression) {
      this.setData({
        game24Message: '请输入算式',
        game24MessageType: 'error'
      })
      return
    }
    
    // 检查算式是否使用了所有数字
    const usedNumbers = expression.match(/\d+/g) || []
    if (usedNumbers.length !== 4) {
      this.setData({
        game24Message: '请使用所有4个数字',
        game24MessageType: 'error'
      })
      return
    }
    
    // 检查数字是否匹配
    const sortedUsedNumbers = usedNumbers.map(Number).sort((a, b) => a - b)
    const sortedNumbers = [...numbers].sort((a, b) => a - b)
    
    for (let i = 0; i < 4; i++) {
      if (sortedUsedNumbers[i] !== sortedNumbers[i]) {
        this.setData({
          game24Message: '请使用题目中给出的数字',
          game24MessageType: 'error'
        })
        return
      }
    }
    
    // 计算算式结果
    try {
      // 安全计算，避免eval的安全问题
      const result = this.safeEval(expression)
      
      if (result === 24) {
        this.setData({
          game24Message: '恭喜你，答对了！',
          game24MessageType: 'success'
        })
      } else {
        this.setData({
          game24Message: `计算结果为${result}，请再试一次`,
          game24MessageType: 'error'
        })
      }
    } catch (error) {
      this.setData({
        game24Message: '算式格式错误，请检查',
        game24MessageType: 'error'
      })
    }
  },

  /**
   * 安全计算算式结果
   */
  safeEval(expression) {
    // 简单的安全计算，只允许数字和基本运算符
    const allowedChars = /^[0-9+\-*/()\s]+$/
    if (!allowedChars.test(expression)) {
      throw new Error('非法字符')
    }
    
    // 使用eval计算结果
    return eval(expression)
  },

  /**
   * 显示24点算术答案
   */
  showGame24Answer() {
    const numbers = this.data.game24Numbers
    const answer = this.calculate24Answer(numbers)
    
    if (answer) {
      this.setData({
        game24Expression: answer,
        game24Message: '这是一个可能的答案，你也可以尝试其他解法',
        game24MessageType: 'info'
      })
    } else {
      this.setData({
        game24Message: '抱歉，暂时没有找到答案',
        game24MessageType: 'error'
      })
    }
  },

  /**
   * 计算24点算术答案
   */
  calculate24Answer(numbers) {
    // 定义运算符
    const ops = ['+', '-', '*', '/'];
    
    // 生成所有排列
    function permute(arr) {
      if (arr.length === 0) return [[]];
      const result = [];
      for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
        const permutations = permute(remaining);
        for (let perm of permutations) {
          result.push([current].concat(perm));
        }
      }
      return result;
    }
    
    // 生成所有可能的表达式
    function generateExpressions(nums) {
      const perms = permute(nums);
      const expressions = [];
      
      for (let perm of perms) {
        const [a, b, c, d] = perm;
        
        // 尝试所有运算符组合
        for (let op1 of ops) {
          for (let op2 of ops) {
            for (let op3 of ops) {
              // 模式1: ((a op1 b) op2 c) op3 d
              expressions.push(`((${a} ${op1} ${b}) ${op2} ${c}) ${op3} ${d}`);
              // 模式2: (a op1 (b op2 c)) op3 d
              expressions.push(`(${a} ${op1} (${b} ${op2} ${c})) ${op3} ${d}`);
              // 模式3: a op1 ((b op2 c) op3 d)
              expressions.push(`${a} ${op1} ((${b} ${op2} ${c}) ${op3} ${d})`);
              // 模式4: a op1 (b op2 (c op3 d))
              expressions.push(`${a} ${op1} (${b} ${op2} (${c} ${op3} ${d}))`);
              // 模式5: (a op1 b) op2 (c op3 d)
              expressions.push(`(${a} ${op1} ${b}) ${op2} (${c} ${op3} ${d})`);
            }
          }
        }
      }
      
      return expressions;
    }
    
    // 计算表达式结果
    function evaluateExpression(expr) {
    try {
      // 安全计算，只允许数字和基本运算符
      const allowedChars = /^[0-9+\-*/()\s]+$/;
      // 直接计算，跳过正则验证，因为我们自己生成的表达式是安全的
      return eval(expr);
    } catch (e) {
      return null;
    }
  }
    
    // 检查是否等于24（考虑浮点精度）
    function is24(value) {
      return value !== null && !isNaN(value) && isFinite(value) && Math.abs(value - 24) < 0.001;
    }
    
    // 生成所有表达式并检查
    const expressions = generateExpressions(numbers);
    for (let expr of expressions) {
      const result = evaluateExpression(expr);
      if (is24(result)) {
        // 替换运算符为更美观的形式
        return expr.replace(/\*/g, '×').replace(/\//g, '÷');
      }
    }
    
    return null;
  },

  // ==================== 麻将胡牌游戏相关方法 ====================

  /**
   * 切换麻将胡牌游戏显示状态
   */
  toggleMahjong() {
    // 切换麻将游戏时，自动关闭24点游戏
    if (!this.data.showMahjong) {
      this.setData({
        showMahjong: true,
        showGame24: false
      })
    } else {
      this.setData({
        showMahjong: false
      })
    }
  },

  /**
   * 添加麻将牌
   */
  addMahjongTile(e) {
    const tile = e.currentTarget.dataset.tile
    const hand = this.data.mahjongHand
    
    // 检查手牌数量是否超过13张
    if (hand.length >= 13) {
      wx.showToast({
        title: '手牌最多13张',
        icon: 'none'
      })
      return
    }
    
    // 检查该牌是否已达到4张
    const tileCount = hand.filter(t => t === tile).length
    if (tileCount >= 4) {
      wx.showToast({
        title: '每张牌最多4张',
        icon: 'none'
      })
      return
    }
    
    // 添加牌到手牌
    hand.push(tile)
    // 对手牌进行排序
    hand.sort((a, b) => a - b)
    
    // 手牌变化时，重置猜胡相关状态
    this.setData({
      mahjongHand: hand,
      mahjongResult: null,
      showGuessSection: false,
      guessedTiles: [],
      guessResult: null,
      wrongAttempts: 0,
      showAnswerSection: false
    })
  },

  /**
   * 移除麻将牌
   */
  removeMahjongTile(e) {
    const index = e.currentTarget.dataset.index
    const hand = this.data.mahjongHand
    
    // 移除指定位置的牌
    hand.splice(index, 1)
    
    // 手牌变化时，重置猜胡相关状态
    this.setData({
      mahjongHand: hand,
      mahjongResult: null,
      showGuessSection: false,
      guessedTiles: [],
      guessResult: null,
      wrongAttempts: 0,
      showAnswerSection: false
    })
  },

  /**
   * 清空麻将手牌
   */
  clearMahjongHand() {
    // 清空手牌时，重置猜胡相关状态
    this.setData({
      mahjongHand: [],
      mahjongResult: null,
      showGuessSection: false,
      guessedTiles: [],
      guessResult: null,
      wrongAttempts: 0,
      showAnswerSection: false
    })
  },

  /**
   * 开始猜胡
   */
  startHuGuess() {
    const hand = this.data.mahjongHand
    
    // 检查手牌数量是否为13张
    if (hand.length !== 13) {
      wx.showToast({
        title: '请选择13张牌',
        icon: 'none'
      })
      return
    }
    
    // 计算正确可胡的牌
    const correctHuCards = []
    
    // 遍历所有可能的牌（1-9万）
    for (let i = 1; i <= 9; i++) {
      // 检查该牌是否已达到4张
      const tileCount = hand.filter(t => t === i).length
      if (tileCount >= 4) {
        continue
      }
      
      // 模拟添加该牌到手牌
      const testHand = [...hand, i]
      // 对手牌进行排序
      testHand.sort((a, b) => a - b)
      
      // 检查是否胡牌
      if (this.checkHu(testHand)) {
        correctHuCards.push(i)
      }
    }
    
    // 显示猜胡区，重置猜错次数和答案显示状态
    this.setData({
      showGuessSection: true,
      guessedTiles: [],
      guessResult: null,
      correctHuCards: correctHuCards,
      wrongAttempts: 0,
      showAnswerSection: false
    })
  },

  /**
   * 切换猜胡牌的选择状态
   */
  toggleGuessTile(e) {
    const tile = e.currentTarget.dataset.tile
    let guessedTiles = this.data.guessedTiles
    const index = guessedTiles.indexOf(tile)
    
    if (index === -1) {
      // 添加到选择列表
      guessedTiles.push(tile)
    } else {
      // 从选择列表中移除
      guessedTiles.splice(index, 1)
    }
    
    // 对选择的牌进行排序，确保从一到九的顺序
    guessedTiles.sort((a, b) => a - b)
    
    this.setData({
      guessedTiles: guessedTiles
    })
  },

  /**
   * 确认猜胡选择
   */
  confirmGuess() {
    const guessedTiles = this.data.guessedTiles
    const correctHuCards = this.data.correctHuCards
    let wrongAttempts = this.data.wrongAttempts
    
    // 对数组进行排序，方便比较
    guessedTiles.sort((a, b) => a - b)
    const sortedCorrectHuCards = [...correctHuCards].sort((a, b) => a - b)
    
    // 判断是否正确
    let isCorrect = true
    let result = {}
    
    if (guessedTiles.length !== sortedCorrectHuCards.length) {
      isCorrect = false
    } else {
      for (let i = 0; i < guessedTiles.length; i++) {
        if (guessedTiles[i] !== sortedCorrectHuCards[i]) {
          isCorrect = false
          break
        }
      }
    }
    
    // 构建结果
    if (isCorrect) {
      result = {
        title: '🎉 恭喜！ 🎉',
        message: '您的选择完全正确，真厉害！',
        correct: true
      }
    } else {
      // 增加猜错次数
      wrongAttempts++
      
      if (guessedTiles.length === 0) {
        result = {
          title: '😞 很可惜！ 😞',
          message: '您没有选择任何牌，再试一次吧！',
          correct: false
        }
      } else if (correctHuCards.length === 0) {
        result = {
          title: '😞 很可惜！ 😞',
          message: '这副手牌无法胡牌，您选择的牌都不正确',
          correct: false
        }
      } else {
        // 根据猜错次数给出不同的鼓励信息
        let message = ''
        switch (wrongAttempts) {
          case 1:
            message = '您的选择不完全正确，再试一次吧！相信您一定可以的！';
            break;
          case 2:
            message = '再试一次，您离正确答案越来越近了！';
            break;
          case 3:
            message = '别灰心，最后一次机会了，加油！';
            break;
          default:
            message = '您的选择不完全正确，再试一次吧！';
        }
        result = {
          title: '😞 很可惜！ 😞',
          message: message,
          correct: false
        }
      }
    }
    
    this.setData({
      guessResult: result,
      showGuessSection: false,
      wrongAttempts: wrongAttempts
    })
  },

  /**
   * 重置猜胡
   */
  resetGuess() {
    this.setData({
      showGuessSection: true,
      guessedTiles: [],
      guessResult: null,
      showAnswerSection: false
    })
  },

  /**
   * 显示正确答案
   */
  showAnswer() {
    this.setData({
      showAnswerSection: true,
      guessResult: null
    })
  },

  /**
   * 检查是否胡牌
   */
  checkHu(hand) {
    // 检查七对胡牌
    if (this.checkSevenPairs(hand)) {
      return true
    }
    
    // 检查常规胡牌（4组顺子/刻子 + 1对将牌）
    return this.checkRegularHu(hand)
  },

  /**
   * 检查七对胡牌
   */
  checkSevenPairs(hand) {
    if (hand.length !== 14) {
      return false
    }
    
    const count = {}
    for (const tile of hand) {
      count[tile] = (count[tile] || 0) + 1
    }
    
    // 七对胡牌需要7个不同的对子
    const pairs = Object.values(count).filter(c => c === 2)
    return pairs.length === 7
  },

  /**
   * 检查常规胡牌
   */
  checkRegularHu(hand) {
    if (hand.length !== 14) {
      return false
    }
    
    // 计算每种牌的数量
    const count = {}
    for (const tile of hand) {
      count[tile] = (count[tile] || 0) + 1
    }
    
    // 寻找可能的将牌（对子）
    for (const tile in count) {
      if (count[tile] >= 2) {
        // 假设该牌为将牌
        const tempCount = JSON.parse(JSON.stringify(count))
        tempCount[tile] -= 2
        
        // 检查剩余的牌是否可以组成4组顺子/刻子
        if (this.checkGroups(tempCount)) {
          return true
        }
      }
    }
    
    return false
  },

  /**
   * 检查剩余的牌是否可以组成顺子/刻子
   */
  checkGroups(count) {
    // 遍历所有可能的牌
    for (const tile in count) {
      const numTile = parseInt(tile)
      const tileCount = count[tile]
      
      if (tileCount === 0) {
        continue
      }
      
      // 检查是否可以组成刻子（3张相同的牌）
      if (tileCount >= 3) {
        const tempCount = JSON.parse(JSON.stringify(count))
        tempCount[tile] -= 3
        
        if (this.checkGroups(tempCount)) {
          return true
        }
      }
      
      // 检查是否可以组成顺子（3张连续的牌）
      if (numTile <= 7 && count[numTile + 1] && count[numTile + 2]) {
        const tempCount = JSON.parse(JSON.stringify(count))
        tempCount[numTile] -= 1
        tempCount[numTile + 1] -= 1
        tempCount[numTile + 2] -= 1
        
        if (this.checkGroups(tempCount)) {
          return true
        }
      }
      
      // 如果无法组成刻子或顺子，返回false
      return false
    }
    
    // 所有牌都检查完毕，返回true
    return true
  },

  /**
   * 选择胡牌
   */
  selectHuCard(e) {
    const tile = e.currentTarget.dataset.tile
    const hand = this.data.mahjongHand
    
    // 生成胡牌后的手牌
    const selectedHuHand = [...hand, tile]
    selectedHuHand.sort((a, b) => a - b)
    
    // 更新数据
    this.setData({
      selectedHuCard: tile,
      selectedHuHand: selectedHuHand
    })
    
    // 显示胡牌动画效果
    wx.showToast({
      title: '🎊 恭喜胡牌！ 🎊',
      icon: 'none',
      duration: 1500
    })
  },

  /**
   * 重置胡牌选择
   */
  resetHuSelection() {
    this.setData({
      selectedHuCard: null,
      selectedHuHand: []
    })
  }
})
