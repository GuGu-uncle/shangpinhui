// 处理传入内容，使传入的内容只能为正整数
// 第一个参数为要转换的内容，第二个参数为当内容不为正整数时变成的值
export default (num,defaultValue) => {
    // 将输入的非数字变成NaN,空串变成0
    num = num * 1
    // 将0变成1
    if (num === 0) num = defaultValue
    // 将NaN变成1
    if (isNaN(num)) num = defaultValue
    // 数量向下取整
    num = Math.floor(num)
    return num
}