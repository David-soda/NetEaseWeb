import {SETBREAD} from "../constant";

const initState = ['关于'] //初始化状态
export default function breadReducer(preState=initState,action){
    //从action对象中获取：type、data
    const {type,data} = action
    //根据type决定如何加工数据
    switch (type) {
        case SETBREAD:
            return data
        default:
            return preState
    }
}
