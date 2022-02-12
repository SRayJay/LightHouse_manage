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
    },
    getAuthors(params){
        return request({
            url:'/author/getAuthors',
            method:'get',
            data:params
        })
    },
    addAuthor(params){
        return request({
            url:'/author/addAuthor',
            method:'post',
            data:params
        })
    },
    deleteAuthor(params){
        return request({
            url:'/author/deleteAuthor',
            method:'post',
            data:params
        })
    }
}