// pages/naozi/naozi.js
// 互动点子库 - 脑子tab页面逻辑

// 获取全局应用实例
const app = getApp();

// 24点算术预设组合（如果全局数据中没有，则使用本地备份）
let GAME24_COMBINATIONS = [];

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
    game24Answer: '',
    
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
    console.log('脑子页面加载');
    
    // 从全局数据中获取24点算术组合
    if (app.globalData.game24Combinations && app.globalData.game24Combinations.length > 0) {
      GAME24_COMBINATIONS = app.globalData.game24Combinations;
      console.log('使用预加载的24点算术组合，共', GAME24_COMBINATIONS.length, '组');
    } else {
      // 如果全局数据中没有，则使用本地备份（简化版，确保基本功能）
      GAME24_COMBINATIONS = [
        [1,1,1,8], [1,1,2,6], [1,1,2,7], [1,1,2,8], [1,1,3,4], [1,1,3,5], [1,1,3,6], [1,1,3,7],
        [1,1,3,8], [1,1,4,4], [1,1,4,5], [1,1,4,6], [1,1,4,7], [1,1,4,8], [1,1,5,5], [1,1,5,6],
        [1,1,5,7], [1,1,5,8], [1,1,6,6], [1,1,6,8], [1,1,6,9], [1,1,7,10], [1,1,8,8], [1,2,2,4],
        [1,2,2,5], [1,2,2,6], [1,2,2,7], [1,2,2,8], [1,2,3,3], [1,2,3,4], [1,2,3,5], [1,2,3,6],
        [1,2,3,7], [1,2,3,8], [1,2,4,4], [1,2,4,5], [1,2,4,6], [1,2,4,7], [1,2,4,8], [1,2,5,5],
        [1,2,5,6], [1,2,5,7], [1,2,5,8], [1,2,6,6], [1,2,6,7], [1,2,6,8], [1,2,7,7], [1,2,7,8],
        [1,2,8,8], [1,3,3,3], [1,3,3,4], [1,3,3,5], [1,3,3,6], [1,3,3,7], [1,3,3,8], [1,3,4,4],
        [1,3,4,5], [1,3,4,6], [1,3,4,7], [1,3,4,8], [1,3,5,6], [1,3,5,7], [1,3,5,8], [1,3,6,6],
        [1,3,6,7], [1,3,6,8], [1,3,7,7], [1,3,7,8], [1,3,8,8], [1,4,4,4], [1,4,4,5], [1,4,4,6],
        [1,4,4,7], [1,4,4,8], [1,4,5,5], [1,4,5,6], [1,4,5,7], [1,4,5,8], [1,4,6,6], [1,4,6,7],
        [1,4,6,8], [1,4,7,7], [1,4,7,8], [1,4,8,8], [1,5,5,5], [1,5,5,6], [1,5,5,9], [1,5,6,6],
        [1,5,6,7], [1,5,6,8], [1,5,7,8], [1,5,8,8], [1,6,6,6], [1,6,6,8], [1,6,6,9], [1,6,7,9],
        [1,6,8,8], [1,6,8,9], [1,7,7,9], [1,7,8,8], [1,8,8,8], [2,2,2,3], [2,2,2,4], [2,2,2,5],
        [2,2,2,7], [2,2,2,8], [2,2,3,3], [2,2,3,4], [2,2,3,5], [2,2,3,6], [2,2,3,7], [2,2,3,8],
        [2,2,4,4], [2,2,4,5], [2,2,4,6], [2,2,4,7], [2,2,4,8], [2,2,5,5], [2,2,5,6], [2,2,5,7],
        [2,2,5,8], [2,2,6,6], [2,2,6,7], [2,2,6,8], [2,2,7,7], [2,2,7,8], [2,2,8,8], [2,3,3,3],
        [2,3,3,5], [2,3,3,6], [2,3,3,7], [2,3,3,8], [2,3,4,4], [2,3,4,5], [2,3,4,6], [2,3,4,7],
        [2,3,4,8], [2,3,5,5], [2,3,5,6], [2,3,5,7], [2,3,5,8], [2,3,6,6], [2,3,6,7], [2,3,6,8],
        [2,3,7,7], [2,3,7,8], [2,3,8,8], [2,4,4,4], [2,4,4,5], [2,4,4,6], [2,4,4,7], [2,4,4,8],
        [2,4,5,5], [2,4,5,6], [2,4,5,7], [2,4,5,8], [2,4,6,6], [2,4,6,7], [2,4,6,8], [2,4,7,7],
        [2,4,7,8], [2,4,8,8], [2,5,5,7], [2,5,5,8], [2,5,6,6], [2,5,6,7], [2,5,6,8], [2,5,7,7],
        [2,5,7,8], [2,5,8,8], [2,6,6,6], [2,6,6,7], [2,6,6,8], [2,6,7,8], [2,6,8,8], [2,7,7,8],
        [2,7,8,8], [3,3,3,3], [3,3,3,6], [3,3,3,7], [3,3,3,8], [3,3,4,4], [3,3,4,5], [3,3,4,6],
        [3,3,4,7], [3,3,4,8], [3,3,5,5], [3,3,5,6], [3,3,5,7], [3,3,5,8], [3,3,6,6], [3,3,6,7],
        [3,3,6,8], [3,3,7,7], [3,3,7,8], [3,3,8,8], [3,4,4,4], [3,4,4,5], [3,4,4,6], [3,4,4,7],
        [3,4,4,8], [3,4,5,5], [3,4,5,6], [3,4,5,7], [3,4,5,8], [3,4,6,6], [3,4,6,7], [3,4,6,8],
        [3,4,7,7], [3,4,7,8], [3,4,8,8], [3,5,5,5], [3,5,5,6], [3,5,5,7], [3,5,5,8], [3,5,6,6],
        [3,5,6,7], [3,5,6,8], [3,5,7,7], [3,5,7,8], [3,5,8,8], [3,6,6,6], [3,6,6,7], [3,6,6,8],
        [3,6,7,7], [3,6,7,8], [3,6,8,8], [3,7,7,7], [3,7,7,8], [3,7,8,8], [3,8,8,8], [4,4,4,4],
        [4,4,4,5], [4,4,4,6], [4,4,4,7], [4,4,4,8], [4,4,5,5], [4,4,5,6], [4,4,5,7], [4,4,5,8],
        [4,4,6,6], [4,4,6,7], [4,4,6,8], [4,4,7,7], [4,4,7,8], [4,4,8,8], [4,5,5,5], [4,5,5,6],
        [4,5,5,7], [4,5,5,8], [4,5,6,6], [4,5,6,7], [4,5,6,8], [4,5,7,7], [4,5,7,8], [4,5,8,8],
        [4,6,6,6], [4,6,6,7], [4,6,6,8], [4,6,7,7], [4,6,7,8], [4,6,8,8], [4,7,7,7], [4,7,7,8],
        [4,7,8,8], [4,8,8,8], [5,5,5,5], [5,5,5,6], [5,5,5,7], [5,5,5,8], [5,5,6,6], [5,5,6,7],
        [5,5,6,8], [5,5,7,7], [5,5,7,8], [5,5,8,8], [5,6,6,6], [5,6,6,7], [5,6,6,8], [5,6,7,7],
        [5,6,7,8], [5,6,8,8], [5,7,7,7], [5,7,7,8], [5,7,8,8], [5,8,8,8], [6,6,6,6], [6,6,6,7],
        [6,6,6,8], [6,6,7,7], [6,6,7,8], [6,6,8,8], [6,7,7,7], [6,7,7,8], [6,7,8,8], [6,8,8,8],
        [7,7,7,7], [7,7,7,8], [7,7,8,8], [7,8,8,8], [8,8,8,8]
      ];
      console.log('使用本地备份的24点算术组合，共', GAME24_COMBINATIONS.length, '组');
    }
    
    // 初始化24点算术游戏
    this.newGame24();
    console.log('脑子页面加载完成，准备就绪');
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
    const showGame24 = !this.data.showGame24
    this.setData({ 
      showGame24,
      showMahjong: false
    })
    if (showGame24) {
      this.newGame24()
    } else {
      this.setData({
        game24Expression: '',
        game24Message: '',
        game24MessageType: ''
      })
    }
  },

  /**
   * 生成新的24点算术游戏
   */
  newGame24() {
    // 获取已使用的组合索引（从本地存储）
    let usedIndices = wx.getStorageSync('game24_used_indices') || [];
    
    // 如果所有组合都用完了，重置记录
    if (usedIndices.length >= GAME24_COMBINATIONS.length) {
      usedIndices = [];
      wx.setStorageSync('game24_used_indices', []);
    }
    
    // 获取未使用的组合索引
    const availableIndices = [];
    for (let i = 0; i < GAME24_COMBINATIONS.length; i++) {
      if (usedIndices.indexOf(i) === -1) {
        availableIndices.push(i);
      }
    }
    
    // 从未使用的组合中随机选择一个
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    const numbers = [...GAME24_COMBINATIONS[randomIndex]];
    
    // 记录已使用的索引
    usedIndices.push(randomIndex);
    wx.setStorageSync('game24_used_indices', usedIndices);
    
    this.setData({
      game24Numbers: numbers,
      game24Expression: '',
      game24Message: '',
      game24MessageType: '',
      game24Answer: ''
    })

    // 立即在后台计算答案（不显示加载提示）
    setTimeout(() => {
      try {
        const answer = this._solve24(numbers);
        if (answer) {
          this.setData({
            game24Answer: answer
          });
          console.log('24点答案计算成功:', numbers, '->', answer);
        } else {
          console.error('24点答案计算失败:', numbers);
          // 如果找不到答案，可能是算法问题，需要优化
        }
      } catch (e) {
        console.error('24点答案计算异常:', numbers, e);
      }
    }, 50);
  },

  /**
   * 处理24点算术输入
   */
  onGame24Input(e) {
    this.setData({
      game24Expression: e.detail.value,
      game24Message: '',
      game24MessageType: ''
    })
  },

  /**
   * 插入24点算术符号
   */
  insertGame24Symbol(e) {
    const value = e.currentTarget.dataset.value
    const action = e.currentTarget.dataset.action

    let expr = this.data.game24Expression || ''

    if (action === 'backspace') {
      // 删除最后一个字符
      expr = expr.slice(0, -1)
    } else if (action === 'clear') {
      // 清空输入
      expr = ''
    } else if (value) {
      // 追加一个符号
      expr += value
    }

    this.setData({
      game24Expression: expr,
      game24Message: '',
      game24MessageType: ''
    })
  },

  /**
   * 提交24点算术答案
   */
  submitGame24() {
    const expression = this.data.game24Expression.trim()
    const numbers = this.data.game24Numbers

    if (!expression) {
      this.setData({
        game24Message: '请输入算式',
        game24MessageType: 'error'
      })
      return
    }

    // 验证是否使用了所有4个数字
    const usedNumbers = this._extractNumbers(expression)
    if (!this._validateNumbers(usedNumbers, numbers)) {
      this.setData({
        game24Message: '❌ 必须使用全部4个数字，且每个数字只能使用一次',
        game24MessageType: 'error'
      })
      return
    }

    // 计算表达式结果
    try {
      const result = this._safeEval(expression)
      if (Math.abs(result - 24) < 0.0001) {
        this.setData({
          game24Message: '🎉 恭喜！答案正确！点击"换一组数字"继续挑战',
          game24MessageType: 'success'
        })
        // 不再自动生成新题目，让用户手动点击"换一组数字"
      } else {
        this.setData({
          game24Message: `❌ 计算结果为 ${result}，不等于24，请再试试`,
          game24MessageType: 'error'
        })
      }
    } catch (e) {
      this.setData({
        game24Message: '❌ 算式格式错误，请检查',
        game24MessageType: 'error'
      })
    }
  },

  /**
   * 显示24点算术答案
   */
  showGame24Answer() {
    const numbers = this.data.game24Numbers
    if (numbers.length !== 4) {
      wx.showToast({
        title: '请先生成题目',
        icon: 'none'
      })
      return
    }

    // 如果已经有答案，直接显示
    if (this.data.game24Answer) {
      this.setData({
        game24Message: `💡 答案：${this.data.game24Answer}\n（24 点的解法可不止这一种哦，这只是其中一个思路，快试试能不能想出更多创意解法吧～）`,
        game24MessageType: 'success'
      })
      return
    }

    // 计算答案
    wx.showLoading({
      title: '计算中...',
      mask: true
    })

    setTimeout(() => {
      const answer = this._solve24(numbers)
      if (answer) {
        this.setData({
          game24Answer: answer,
          game24Message: `💡 答案：${answer}\n（可能有多个答案，这里只给一个）`,
          game24MessageType: 'success'
        })
      } else {
        this.setData({
          game24Message: '❌ 这组数字无法计算出24，点击"换一组数字"试试',
          game24MessageType: 'error'
        })
      }
      wx.hideLoading()
    }, 100)
  },

  /**
   * 从表达式中提取数字
   */
  _extractNumbers(expression) {
    // 移除所有运算符和括号，提取数字
    const numbers = []
    const regex = /\d+/g
    let match
    while ((match = regex.exec(expression)) !== null) {
      numbers.push(parseInt(match[0]))
    }
    return numbers
  },

  /**
   * 验证使用的数字是否与给定的4个数字匹配
   */
  _validateNumbers(usedNumbers, targetNumbers) {
    if (usedNumbers.length !== 4) {
      return false
    }
    const sortedUsed = [...usedNumbers].sort((a, b) => a - b)
    const sortedTarget = [...targetNumbers].sort((a, b) => a - b)
    for (let i = 0; i < 4; i++) {
      if (sortedUsed[i] !== sortedTarget[i]) {
        return false
      }
    }
    return true
  },

  /**
   * 求解24点问题
   */
  _solve24(numbers) {
    if (numbers.length !== 4) {
      console.error('_solve24: 数字数量不正确', numbers)
      return null
    }
    
    try {
      // 尝试所有可能的运算组合
      const ops = ['+', '-', '*', '/']
      const nums = numbers.map(n => Number(n)) // 确保是数字类型
      
      // 生成所有可能的数字排列
      const permutations = this._permute(nums)
      if (!permutations || permutations.length === 0) {
        console.error('_solve24: 排列生成失败', numbers)
        return null
      }
      
      // 尝试所有排列和运算符组合
      let totalAttempts = 0
      let errorCount = 0
      for (const perm of permutations) {
        for (const op1 of ops) {
          for (const op2 of ops) {
            for (const op3 of ops) {
              // 尝试不同的括号组合（增加更多组合以确保覆盖所有情况）
              const expressions = [
                `(${perm[0]}${op1}${perm[1]})${op2}(${perm[2]}${op3}${perm[3]})`,
                `((${perm[0]}${op1}${perm[1]})${op2}${perm[2]})${op3}${perm[3]}`,
                `(${perm[0]}${op1}(${perm[1]}${op2}${perm[2]}))${op3}${perm[3]}`,
                `${perm[0]}${op1}((${perm[1]}${op2}${perm[2]})${op3}${perm[3]})`,
                `${perm[0]}${op1}(${perm[1]}${op2}(${perm[2]}${op3}${perm[3]}))`,
                `(${perm[0]}${op1}${perm[1]})${op2}${perm[2]}${op3}${perm[3]}`,
                `${perm[0]}${op1}(${perm[1]}${op2}${perm[2]})${op3}${perm[3]}`,
                `${perm[0]}${op1}${perm[1]}${op2}(${perm[2]}${op3}${perm[3]})`,
                `(${perm[0]}${op1}${perm[1]}${op2}${perm[2]})${op3}${perm[3]}`,
                `${perm[0]}${op1}${perm[1]}${op2}${perm[2]}${op3}${perm[3]}`
              ]
              
              for (const expr of expressions) {
                totalAttempts++
                try {
                  const result = this._safeEval(expr)
                  // 检查结果是否有效（与 _safeEval 中的检查保持一致）
                  if (result !== null && result !== undefined && !isNaN(result) && isFinite(result)) {
                    const diff = Math.abs(result - 24)
                    if (diff < 0.0001) {
                      // 转换为中文运算符显示
                      const answer = expr
                        .replace(/\*/g, '×')
                        .replace(/\//g, '÷')
                      console.log('_solve24: 找到答案', numbers, '->', answer, '结果:', result, '尝试次数:', totalAttempts)
                      return answer
                    }
                  }
                } catch (e) {
                  errorCount++
                  // 忽略计算错误，继续尝试
                  // 只在调试时输出错误（避免控制台刷屏）
                  // console.log('_solve24: 表达式计算失败', expr, e.message)
                }
              }
            }
          }
        }
      }
      
      console.error('_solve24: 未找到答案', numbers, '总尝试次数:', totalAttempts, '错误次数:', errorCount)
      return null
    } catch (e) {
      console.error('_solve24: 异常', numbers, e)
      return null
    }
  },

  /**
   * 生成数组的所有排列
   */
  _permute(arr) {
    if (arr.length <= 1) return [arr]
    const result = []
    for (let i = 0; i < arr.length; i++) {
      const rest = [...arr.slice(0, i), ...arr.slice(i + 1)]
      const perms = this._permute(rest)
      for (const perm of perms) {
        result.push([arr[i], ...perm])
      }
    }
    return result
  },

  /**
   * 安全计算表达式（不依赖 eval 和 new Function，使用栈计算）
   */
  _safeEval(expression) {
    try {
      // 替换中文运算符为英文
      let expr = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/（/g, '(')
        .replace(/）/g, ')')
        .replace(/\s+/g, '')
      
      // 验证表达式只包含数字、运算符和括号
      if (!/^[\d\+\-\*\/\(\)\.\s]+$/.test(expr)) {
        throw new Error('Invalid expression: ' + expr)
      }

      // 使用栈计算表达式（不依赖 eval 和 new Function）
      return this._calculateExpression(expr)
    } catch (e) {
      throw e
    }
  },

  /**
   * 使用栈计算表达式（支持 +、-、*、/ 和括号）
   */
  _calculateExpression(expr) {
    // 处理负数：将 (- 替换为 (0-
    expr = expr.replace(/\(-/g, '(0-')
    // 处理开头的负数
    if (expr.startsWith('-')) {
      expr = '0' + expr
    }

    // 使用两个栈：一个存数字，一个存运算符
    const numStack = []
    const opStack = []
    
    let i = 0
    while (i < expr.length) {
      const char = expr[i]
      
      // 跳过空格
      if (char === ' ') {
        i++
        continue
      }
      
      // 如果是数字，读取完整的数字
      if (this._isDigit(char)) {
        let num = ''
        while (i < expr.length && (this._isDigit(expr[i]) || expr[i] === '.')) {
          num += expr[i]
          i++
        }
        numStack.push(parseFloat(num))
        continue
      }
      
      // 如果是左括号，入栈
      if (char === '(') {
        opStack.push(char)
        i++
        continue
      }
      
      // 如果是右括号，计算到左括号
      if (char === ')') {
        while (opStack.length > 0 && opStack[opStack.length - 1] !== '(') {
          this._applyOperator(numStack, opStack)
        }
        opStack.pop() // 移除左括号
        i++
        continue
      }
      
      // 如果是运算符
      if (this._isOperator(char)) {
        // 处理运算符优先级
        while (opStack.length > 0 && 
               opStack[opStack.length - 1] !== '(' &&
               this._getPrecedence(opStack[opStack.length - 1]) >= this._getPrecedence(char)) {
          this._applyOperator(numStack, opStack)
        }
        opStack.push(char)
        i++
        continue
      }
      
      i++
    }
    
    // 处理剩余的运算符
    while (opStack.length > 0) {
      this._applyOperator(numStack, opStack)
    }
    
    if (numStack.length !== 1) {
      throw new Error('Invalid expression')
    }
    
    const result = numStack[0]
    if (result === null || result === undefined || isNaN(result) || !isFinite(result)) {
      throw new Error('Invalid result: ' + result)
    }
    
    return result
  },

  /**
   * 判断是否是数字
   */
  _isDigit(char) {
    return char >= '0' && char <= '9'
  },

  /**
   * 判断是否是运算符
   */
  _isOperator(char) {
    return char === '+' || char === '-' || char === '*' || char === '/'
  },

  /**
   * 获取运算符优先级
   */
  _getPrecedence(op) {
    if (op === '+' || op === '-') {
      return 1
    }
    if (op === '*' || op === '/') {
      return 2
    }
    return 0
  },

  /**
   * 应用运算符
   */
  _applyOperator(numStack, opStack) {
    if (numStack.length < 2 || opStack.length < 1) {
      throw new Error('Invalid expression')
    }
    
    const b = numStack.pop()
    const a = numStack.pop()
    const op = opStack.pop()
    
    let result
    switch (op) {
      case '+':
        result = a + b
        break
      case '-':
        result = a - b
        break
      case '*':
        result = a * b
        break
      case '/':
        if (b === 0) {
          throw new Error('Division by zero')
        }
        result = a / b
        break
      default:
        throw new Error('Unknown operator: ' + op)
    }
    
    numStack.push(result)
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
