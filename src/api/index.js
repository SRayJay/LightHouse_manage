import request from './../utils/request'

export default{
    login(params){
        return request({
            url:'/admin/login',
            method:'post',
            data:params,
            // mock:false
        })
    },
    checkUserList(params){
        return request({
            url:'/user/checkUserList',
            method:'get',
            data:params
        })
    },
    checkBookList(params){
        return request({
            url:'/book/checkBookList',
            method:'get',
            data:params
        }) 
    }
}