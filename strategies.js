const strategies = {
  // 非空
  noEmpty: function(value, errMsg){
    if(value === ''){
      return errMsg
    }
  },
  // 最小长度
  minLength: function(value, length, errMsg){
    if(!value || value.length < length){
      return errMsg
    }
  },
  // 最大长度
  maxLength: function(value, length, errMsg){
    if(value.length > length){
      return errMsg
    }
  }
}

var Validator = function(strategies){
  this.strategies = strategies
  this.cache = [] // 存储校验规则
}

Validator.prototype.add = function(dom, rules) {
  rules.forEach(item => {
    let ruleInfo = item.rule.split(":");
    const name = ruleInfo.shift();
    const value = dom.value;
    const params = [value, ...ruleInfo, item.errMsg];
    this.cache.push(() => this.strategies[name].apply(dom, params))
  })
}

Validator.prototype.validate = function() {
  const validateFns = this.cache;
  console.log(validateFns);
  for(let fn of validateFns) {
    console.log(fn)
    const message = fn()
    // 返回报错信息，终止验证并抛出异常
    if(message) return message
  }
}

var form = document.querySelector("form");

form.onsubmit = function(event){
  event.preventDefault()
  // 判断验证结果
  const message = validate()
  const tip = document.getElementById('tip')
  if(message){
    tip.innerHTML = message
    tip.style.color = 'red'
  }else{
    tip.innerHTML = '验证通过！'
    tip.style.color = 'green'
  }
}

function validate() {
  const validator = new Validator(strategies);
  validator.add(form.username, [
    {
      rule: 'noEmpty',
      errMsg: '用户名不能为空!'
    },
    {
      rule: 'minLength:3',
      errMsg: '用户名长度大于3!'
    }
  ]);
  validator.add(form.password, [
    {
      rule: 'minLength:6',
      errMsg: '密码长度大于6!'
    },
    {
      rule: 'maxLength:10',
      errMsg: '密码最大长度为10!'
    }
  ]);
  return validator.validate()
}
