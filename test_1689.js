const calculate24Answer = function(numbers) {
  const ops = ['+', '-', '*', '/'];
  
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
  
  function generateExpressions(nums) {
    const perms = permute(nums);
    const expressions = [];
    
    for (let perm of perms) {
      const [a, b, c, d] = perm;
      
      for (let op1 of ops) {
        for (let op2 of ops) {
          for (let op3 of ops) {
            expressions.push(`((${a} ${op1} ${b}) ${op2} ${c}) ${op3} ${d}`);
            expressions.push(`(${a} ${op1} (${b} ${op2} ${c})) ${op3} ${d}`);
            expressions.push(`${a} ${op1} ((${b} ${op2} ${c}) ${op3} ${d})`);
            expressions.push(`${a} ${op1} (${b} ${op2} (${c} ${op3} ${d}))`);
            expressions.push(`(${a} ${op1} ${b}) ${op2} (${c} ${op3} ${d})`);
          }
        }
      }
    }
    
    return expressions;
  }
  
  function evaluateExpression(expr) {
    try {
      const allowedChars = /^[0-9+\-*/()\s]+$/;
      if (!allowedChars.test(expr)) {
        throw new Error('非法字符');
      }
      return eval(expr);
    } catch (e) {
      return null;
    }
  }
  
  function is24(value) {
    return value !== null && !isNaN(value) && isFinite(value) && Math.abs(value - 24) < 0.001;
  }
  
  const expressions = generateExpressions(numbers);
  for (let expr of expressions) {
    const result = evaluateExpression(expr);
    if (is24(result)) {
      return expr.replace(/\*/g, '×').replace(/\//g, '÷');
    }
  }
  
  return null;
};

// 测试数字组合 [1, 6, 8, 9]
console.log('数字组合:', [1, 6, 8, 9]);
console.log('算法结果:', calculate24Answer([1, 6, 8, 9]));
console.log('手动计算: 1 + 6 + 8 + 9 = 24');

// 测试表达式
const testExpr = '(1 + 6) + (8 + 9)';
try {
  console.log('测试表达式:', testExpr);
  console.log('计算结果:', eval(testExpr));
} catch (e) {
  console.log('表达式错误:', e.message);
}