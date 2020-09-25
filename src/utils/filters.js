/**
 * 文章超出省略
 * @param {内容}} value 
 * @param {最大字数} number 
 */
let ellipsis = (value, number) => {
  if (!value) return ''
  if (value.length > number) {
    return value.slice(0, number) + '...'
  }
  return value
}

// 日期格式化 - 去除时间返回日期
let dateFormat = value => {
  if (!value) return ''
  const arr = value.split(' ')
  return arr[0]
}

// 拼接域名
let jointUrl = value => {
  if (!value) return ''
  // return 'http://172.31.134.36:81/api' + value
  return process.env.VUE_APP_BASE_API + value
}

// 把null转成''
let formatNull = value => {
  if (value == null) return ''
  return value
}

// 判断字段是否存在, 如果存在返回值, 否则返回空
let fieldIsSet = (obj, key) => {
  // 根据key的类型是否批量判断
  if (key instanceof Array) {
    const res = {}
    for (let index = 0; index < key.length; index++) {
      const element = key[index]
      if(obj != null && typeof(obj) == 'object' && Object.prototype.hasOwnProperty.call(obj, element)){
        res[element] = obj[element]
      } else {
        return ''
      }
    }
  } else {
    if(obj != null && typeof(obj) == 'object' && Object.prototype.hasOwnProperty.call(obj, key)){
      return obj[key]
    } else {
      return ''
    }
  }
}

export { ellipsis, dateFormat, jointUrl, formatNull, fieldIsSet }
