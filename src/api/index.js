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
    },
    getPublishers(params){
        return request({
            url:'/other/getPublishers',
            method:'get',
            data:params
        })
    },
    getProducers(params){
        return request({
            url:'/other/getProducers',
            method:'get',
            data:params
        })
    },
    addPublisher(params){
        return request({
            url:'/other/addPublisher',
            method:'post',
            data:params
        })
    },
    addProducer(params){
        return request({
            url:'/other/addProducer',
            method:'post',
            data:params
        })
    },
    addBook(params){
        return request({
            url:'/book/addBook',
            method:'post',
            data:params
        })
    },
    deleteBook(params){
        return request({
            url:'/book/deleteBook',
            method:'post',
            data:params
        })
    },
    addSeries(params){
        return request({
            url:'/other/addSeries',
            method:'post',
            data:params
        })
    }
}