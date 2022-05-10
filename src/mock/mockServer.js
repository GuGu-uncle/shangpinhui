// 引入mock
import { mock } from 'mockjs'
// 引入模拟数据
import banners from './banners'
import floors from './floors'
mock('/mock/banners', {
    code: 200,
    data: banners
})
mock('/mock/floors', {
    code: 200,
    data: floors
})