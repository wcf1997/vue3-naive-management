export function mobile(value: any) {
  if (!value) return new Error('请输入手机号')
  const reg = /^1[3456789]\d{9}$/

  return reg.test(value) || new Error('请输入正确的手机号')
}

export function cardNo(value: any) {
  const reg =
    /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/
  return reg.test(value) || new Error('请输入正确的身份证号码')
}
