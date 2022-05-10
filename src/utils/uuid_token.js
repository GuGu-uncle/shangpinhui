import { v4 as uuidv4 } from 'uuid'
// 获取唯一的uuid并存储于浏览器中，用作token
export const getUUID = () => {
    // 获取浏览器中的UUID
    let uuid_token = localStorage.getItem("UUIDTOKEN")
    // 如果浏览器中没有UUID,则创建一个新的uuid并存储于浏览器中
    if(!uuid_token){
        uuid_token = uuidv4()
        localStorage.setItem("UUIDTOKEN",uuid_token)
    } 
    return uuid_token
}